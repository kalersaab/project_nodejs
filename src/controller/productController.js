const productModel = require("../model/productModel");
const customerModel = require("../model/customerModel");

const createOrder = async function (req, res) {
  try {
    const data = req.body;

    const { productName, productSize, productPrice, id } = data;

    var customerData = await customerModel.findOne({ _id: id });
    console.log(customerData, "customerData");

    var orderData = await productModel.create({
      productName,
      productSize,
      productPrice,
      id,
    });
    res.send({ message: "order created successfully", data: orderData });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createOrder };
