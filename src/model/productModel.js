const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productSize: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    id: {
      type: ObjectId,
      ref: "customer",
      required: true,
    },
    orderDate:{
      type:Date,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
