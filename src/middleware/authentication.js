const jwt = require("jsonwebtoken");


const authenticateToken = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    // authorization && token
    if (!token) {
      res.send({ message: "please login first && please try after sometime" });
    }

    console.log(token, "token");

    let decodedToken = jwt.verify(
      token,
      "Secrete_Key",
      function (error, decoded) {
        if (error) {
          res.send({ message: error.message });
        } else {
          tokenCheck = decoded;
        }
      }
    );

    req.token = tokenCheck;
    next();
  } catch (error) {
    console.log(error);
  }
};


module.exports = { authenticateToken};

//middleware runs between request & response
//next : its basically a callback function
//pass the control to next middleware or next controller
//server flow will hang and does not pass the control

//authentication: check credentials (login Id, password)
//authorization: valid user

// header: algorithms
//payload: data=> key value pairs
//signature: combination of algorithm and signature

//status code=> status code issued by a server in response to a (client) request made to the server

// Informational responses (100–199)
// Successful responses (200–299)
// Redirects (300–399)
// Client errors (400–499)
// Server errors (500–599)

// 200 OK.or success
// 201 Created. ...
// 202 Accepted
// 204 No Content. ...
// 302 redirecting
// 400 Bad Request. ...
// 401 Unauntheticated. ...
// 403  or unauthorised. ...
// 404 Not Found. ...
// 409 conflicts
// 500 Internal Server Error.