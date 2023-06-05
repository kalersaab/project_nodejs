const productModel = require("../model/productModel");
const customerModel = require("../model/customerModel");

const createOrder = async function (req, res) {
  try {
    const data = req.body;

    const { productName, productSize, productPrice, id, orderDate } = data;

    var customerData = await customerModel.findOne({ _id: id });
    console.log(customerData, "customerData");

    const orderData = await productModel.create({
      productName,
      productSize,
      productPrice,
      id,
      orderDate,
    });
    res.send({ message: "order created successfully", data: orderData });
  } catch (error) {
    console.error(error);
  }
};

const getAllorder = async (req, res) => {
  try{
    const{query} = req;
    const totalCount = await productModel.countDocuments()
    const fetchsize = req.query.fetchsize && parseInt(req.query.fetchsize) || 10
    const startindex = req.query.startindex && parseInt(req.query.startindex) || 0
    
    const getcustomer = await productModel.aggregate([
      {
        $sort:{
          createAt: -1
        }

      },
      {
      $facet: {
      data:[
        {$skip:startindex}, 
        {$limit:fetchsize},
        {
          $lookup:{
            from: "customers",
            localField:"id",
            foreignField:"_id",
            // pipeline:[
            //   {
            //     $project:{
            //       firstName:1, //1=true 0=false
            //       phoneNumber:1,
            //       _id:0                }
            //   }

            // ],
            as:"Customer Details"
          },
        },
        {
          $unwind: {
            path: "$CustomerDetails",
            preserveNullAndEmptyArrays: true,
          },
        },
      ],
      count: [{$count:"total"}]
      },
      
      },
    ]);
res.status(200).send({message:"all customer fetched successfully ", count:totalCount[0]?.count[0]?.total, data:getcustomer[0]?.data })
} catch(err){
console.log(err)
  }
}

module.exports = { createOrder, getAllorder };
