const express = require ("express")
const router = express.Router()
const middleware = require ("../middleware/authentication")
const auth = require("../middleware/authorization")
const customerController = require("../controller/customerController")

router.post("/customers", customerController.CreateCustomer)
router.get("/customers", middleware.authentication, auth.authorization, customerController.allCustomer)
router.get("/customer/:id", middleware.authentication,auth.authorization, customerController.singleCustomer)
router.post("/login", customerController.customerlogin)
router.put("/customer/:id", middleware.authentication, auth.authorization, customerController.customerUpdate)

module.exports = router