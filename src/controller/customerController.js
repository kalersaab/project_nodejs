const customerModel = require("../model/customerModel");
const { ObjectId } = require("mongoose").Types;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createCustomer = async (req, res) => {
  try {
    const data = req.body;
    const {
      title,
      fistName,
      lastName,
      email,
      password,
      phoneNumber,
      gender,
      skills,
    } = data;

    // random 10 digits create
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const customerData = await customerModel.create({
      title,
      fistName,
      lastName,
      email,
      password: hashPassword,
      phoneNumber,
      gender,
      skills,
    });
    const { password: omit, ...responseData } = customerData._doc;

    res.status(201).send({
      message: "customer created successfully",
      data: responseData,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginCustomer = async (req, res) => {
  try {
    const data = req.body;

    const { email, password } = data;

    if (!email) {
      res.status(400).send({ message: "please provide email" });
    }

    if (!password) {
      res.status(400).send({ message: "please provide a password" });
    }

    const checkEmail = await customerModel.findOne({ email: email });
    if (!checkEmail) {
      res
        .status(404)
        .send({ message: "email doesn't exist, please login again" });
    }

    console.log("checkEmail", checkEmail._id);

    const checkPassword = await bcrypt.compare(password, checkEmail.password);
    if (!checkPassword) {
      res.status(400).send({ message: "wrong password please try again" });
    }

    const token = jwt.sign(
      {
        customerId: checkEmail._id,
      },
      "Secrete_Key",
      { expiresIn: "1h" }
    );

    res.send({ message: "login successful", data: token });
  } catch (error) {
    console.log(error);
  }
};

const allCustomer = async (req, res) => {
  try {
    
    const {query} = req.query
    const Keyword = req.query
    const totalCount = await customerModel.countDocuments()
  const fetchsize = req.query.fetchsize &&  parseInt(req.query.fetchsize) || 5
  const startindex = req.query.startindex && parseInt(req.query.startindex) || 0

  const searchCeriteria = {}
  
  // if(req.query.gender){
  //   searchCeriteria.gender = req.query.gender;
  // }


  if(req.query.Keyword){

    
  }
  const customerData = await customerModel.aggregate([
    {
      $sort: {
        createAt: 1
      }
    },
    {$match: searchCeriteria},
    {$skip : startindex},
    {$limit: fetchsize}
  ])
  res.status(200).send({
    message: "All customers fetched successfully",
    count: totalCount,
    data: customerData,
  });
  } catch (error) {
    console.log(error);
  }
};

const singleCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customerData = await customerModel.findOne({ _id: new ObjectId(customerId) });
    res
      .status(200)
      .send({ message: "single customer details", data: customerData });
  } catch (error) {
    console.log(error);
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const data = req.body;
    const {
      title,
      fistName,
      lastName,
      email,
      password,
      phoneNumber,
      gender,
      skills,
    } = data;

    const customerData = await customerModel.findOneAndUpdate(
      { _id: new ObjectId(customerId) },
      {
        title,
        fistName,
        lastName,
        email,
        password,
        phoneNumber,
        gender,
        skills,
      },
      { new: true }
    );
    res.send({ message: "customer updated successfully ", data: customerData });
  } catch (error) {
    console.log(error);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const customerData = await customerModel.findOneAndDelete({
      _id: new ObjectId(customerId),
    });
    res.send({ message: "customer deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCustomer,
  allCustomer,
  singleCustomer,
  updateCustomer,
  deleteCustomer,
  loginCustomer,
};