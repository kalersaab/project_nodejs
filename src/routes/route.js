const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");
const productController = require("../controller/productController");
const middleware = require("../middleware/authentication");
const middle = require("../middleware/authorization");
//API

router.post("/customer", customerController.createCustomer);

//get all customers
router.get(
  "/customers",
  middleware.authenticateToken,
  customerController.allCustomer
);
//single customer
router.get(
  "/customer/:customerId",
  middleware.authenticateToken,
  middle.authorization,
  customerController.singleCustomer
);

router.put(
  "/customer/:customerId",
  middleware.authenticateToken,
  middle.authorization,
  customerController.updateCustomer
);
router.delete(
  "/customer/:customerId",
  middleware.authenticateToken,
  middle.authorization,
  customerController.deleteCustomer
);

router.post("/login", customerController.loginCustomer);

//oder routes
router.post(
  "/order",
  middleware.authenticateToken,
  middle.authorization,
  productController.createOrder
);

// get all orders
// single order
//update order
//delete order

module.exports = router;
