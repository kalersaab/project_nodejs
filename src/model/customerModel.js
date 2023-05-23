const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ["Mr", "Mrs", "Miss"],
    },

    fistName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },

    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },

    skills: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", customerSchema);
