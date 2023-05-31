const jwt = require("jsonwebtoken")

const authentication = async (req, res, next) =>{
    try{
        let token = req.headers["x-api-key"]
        if(!token){
            res.send({Message:" please login first"})
        }
        let decodedToken = jwt.verify(
            token,
            "secret_key",
            (err, decoded) => {
                if(err){
                    res.send({message: err.message})
                } else{
                    tokenCheck = decoded
                }
            }
        );
        req.token = tokenCheck;
        next()
    } catch(err){
        console.log(err)
    }
}
module.exports = {authentication}
