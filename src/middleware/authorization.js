const customerModel = require("../model/customerModel");
const { ObjectId } = require("mongoose").Types;

const authorization = async function (req, res, next) {
    try {
      idFromToken = tokenCheck.customerId;
  
      console.log("idFromToken", idFromToken);
      
      const loginCustomer = req.params.customerId;
      //const loginCustomer = req.params.customerId;
      const checkCustomerId = await customerModel.findById({
        _id: new ObjectId(loginCustomer)
      });
  
      if (!checkCustomerId) {
        res.status(404).send({ status: false, message: "customer not found" });
      }
  
      console.log("checkCustomerId", checkCustomerId);
  
      let loggedInCustomer = checkCustomerId._id.toString();
  
      console.log("loggedInCustomer", loggedInCustomer);
  
      if (loggedInCustomer !== idFromToken) {
        res
          .status(403)
          .send({ status: false, message: "authorization failed // forbidden" });
      } else {
        next();
      }
    } catch (error) {
      res.status(400).send({ status: false, message: error.message });
    }
  };
  module.exports = { authorization }  