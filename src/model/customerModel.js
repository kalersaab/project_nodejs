const mongoose = require("mongoose");

const CustomerModel = new mongoose.Schema(
  {
    title:{
      type : String,
      required: true,
      enum: ['Mr', 'Mrs', 'Miss']
    },
  
  firstName:{
    type:String,
    required: true,
    trim:true
  },
  lastName: {
    type: String,
    required: true,
    trim: true

  },
  address: {
    type: String,
    required: true,
  },
  gender:{
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim : true,
    lowercase: true
  },
  password:{
    type: String,
    requird:true
  },
  phoneNumber: {
    type: Number,
    unique :true,

  },
  skills:[{
    type: String,
  }],

},
{timeStamp: true}
)
module.exports = mongoose.model("Customer",CustomerModel)

