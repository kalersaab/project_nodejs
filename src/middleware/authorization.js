const customerModel = require("../model/customerModel");
const {ObjectId} = require("mongoose").Types;

const authorization = async (req, res, next) => {
    try {
      idFromToken = tokenCheck.id;

     // console.log("idFromToken", idFromToken);
      const logincustomer = req.params.id
      const checkCustomer = await customerModel.findById({_id: new ObjectId(logincustomer)})
      if(!checkCustomer){
        res.status(404).send({message: "customer not found"})
      }
      //console.log("check Customer", checkCustomer)
      const customerlogin = checkCustomer._id.toString();
      if(customerlogin !== idFromToken)
      {
        res.status(403).send({message:"Authorization failed"})
      } else{
        next();
      }
     // console.log(customerlogin,"Customer")

    }catch(err){
        res.status(400).send({ status: false, message: err.message });
    }
}
module.exports = {authorization}