const customerModel = require("../model/customerModel");
const {ObjectId} = require("mongoose").Types;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const CreateCustomer = async (req, res) => {
  try{
    const{title, firstName, lastName, address, email, password, phoneNumber, gender, skills} =req.body;
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt) 
    
    const CustomerData = await customerModel.create({
      title, firstName, lastName, gender, address, email, password:hashPassword, phoneNumber, skills});
    const {password:omit, ...responseData} = CustomerData._doc;

    res.status(201).send({message: "Customer create succesfully", data: responseData})
  }catch(err){
    console.log(err)
  }
}
const customerlogin = async (req, res) => {
  try{
    const { email, password} = req.body;

    if(!email){
      res.status(400).send({message:"please, provide email"})
    }
    if(!password){
      res.status(400).send({message:"Please, provide password"})
    }

    const Checkemail = await customerModel.findOne({ email:email})
      if(!Checkemail){
        res.status(404).send({message:"email is not exist "})
      }

      const checkPasword = await bcrypt.compare(password, Checkemail.password)
      if(!checkPasword){
        res.status(200).send({message:"wrong password and try again"})
      }

      const token = jwt.sign(
        {
          id: Checkemail._id
        },
        "secret_key",
        {expiresIn: "1h"}
      );
      res.status(200).send({message:"login successfully", data: token})
    } catch(err){
    console.log(err)
  }
}

const allCustomer = async (req, res) => {
  try{
    const{query} = req;
    const {keyword} = req.query;
    const totalCount = await customerModel.countDocuments()
    const fetchsize = req.query.fetchsize && parseInt(req.query.fetchsize) || 5
    const startindex = req.query.startindex && parseInt(req.query.startindex) || 0

    const searchCeriteria = {};
    if (req.query.gender){
      searchCeriteria.gender = req.query.gender
    }
    if(req.query.keyword){
      searchCeriteria["$or"] =[
        {firstName: {$regex: `^${keyword.trim()}`, $options: "i"}},
        {lastName: {$regex: `${keyword.trim()}`, $options: "i"}},
        {email: {$regex: `${keyword.trim()}`, $options: "i"}}
      ]
    }

    const getcustomer = await customerModel.aggregate([
      {$match:searchCeriteria},
      {
        $sort:{
          createAt:1
        }

      },
      {
      $facet: {
      data:[
        {$skip:startindex}, 
        {$limit:fetchsize},
        
      ],
      count: [{$count:"total"}]
      },
      
    }
    ])
    res.status(200).send({message:"all customer fetched successfully ", count:totalCount[0]?.count[0]?.total, data:getcustomer[0]?.data })
  } catch(err){
    console.log(err)
}
}

const singleCustomer = async (req,res) =>{
  try{
    const {id} = req.params;
    const customerData = await customerModel.findById({_id: new ObjectId(id)})
    res.status(200).send({message:"Customer fetched Successfully", data: customerData})
  }catch(err){
    console.log(err)
  }
}

const customerUpdate = async (req,res) => {
  try{
    const {id} = req.params
    const {title, firstName, lastName, address, email, password, phoneNumber, gender, skills} = req.body

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    
    const CustomerData = await customerModel.findByIdAndUpdate({_id: new ObjectId(id)},
      {title, firstName, lastName, address, email, password:hashPassword, phoneNumber, gender, skills
      },
      {new:true})
      const {omit, ...responceData} = CustomerData._doc
      res.status(200).send({message:"Customer is successfully updated", data: responceData})
  }catch(err){
    console.log(err)
  }

}

const deleteCustomer = async (req, res) =>{
  try{
    const {id} = req.params;
    const customerData = await customerModel.findOneAndDelete({_id: new ObjectId(id)})
    res.status(200).send({message:"Customer deleted successfully  ", data: customerData})
  }catch(err){
    console.log(err)
  }
}
module.exports = {CreateCustomer, customerlogin, allCustomer,customerUpdate, deleteCustomer, singleCustomer}