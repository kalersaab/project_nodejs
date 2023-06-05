const express = require ("express")
const router = express.Router()
const middleware = require ("../middleware/authentication")
const auth = require("../middleware/authorization")
const customerController = require("../controller/customerController")
const Productorder = require("../controller/productController")

router.post("/customers", customerController.CreateCustomer)
router.get("/customers", middleware.authentication, customerController.allCustomer)
router.get("/customer/:id", middleware.authentication,auth.authorization, customerController.singleCustomer)
router.post("/login", customerController.customerlogin)
router.put("/customer/:id", middleware.authentication, auth.authorization, customerController.customerUpdate)

router.post("/createorder", 
middleware.authentication, 
Productorder.createOrder)

router.get("/orders", 
//middleware.authentication, 
Productorder.getAllorder)

module.exports = router