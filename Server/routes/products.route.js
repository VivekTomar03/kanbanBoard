const express = require("express");
const { ProdModel } = require("../model/products.model");
const { roleValidator } = require("../middleware/roleValidator");
const productRouter = express.Router();
 
 productRouter.get("/" , async(req, res) =>{
     const page = req.query.page
     const limit = req.query.limit

     if(page && limit){
      try {
        const Pagecount =await ProdModel.find().count()
        const data =await ProdModel.find()
        .skip((limit*page) -limit)
        .limit(limit)
        res.send({
          data,
          TotalPage: Math.ceil(Pagecount/limit)
        })
      } catch (error) {
        res.send({
            message: error.message
        })
      }
     }
     else {
      try {
        const data =await ProdModel.find()
        res.send(data)
      } catch (error) {
        res.send({
            message: error.message
        })
      }
     }

     
 })  

 productRouter.get("/:id" , async(req, res) =>{
    let { id } = req.params;
  try {
    let data = await ProdModel.find({ _id: id });
    // console.log(data);
    if (data.length > 0) {
      res.send({
        message: "data available",
        prod: data[0],
      });
    } else {
      res.send({
        message: "datar not found",
      });  
    }
  } catch (error) {
    res.send({
      message: "data not found",
    });
  } 
})  


 productRouter.post("/add" , async(req, res) => {
         try {
           let data =  new ProdModel(req.body)
            await data.save()
            res.send({
                message:"data added successfully"
            })
         } catch (error) {
            res.send({
                message: error.message
            })
         }
 })

 productRouter.patch("/update/:id", roleValidator, async (req, res) => {
    let { id } = req.params;
    try {
      await ProdModel.findByIdAndUpdate({ _id: id }, req.body);
      res.send({
        message: "Data updated succesfully",
      });
    } catch (error) {
      res.send(error);
    }
  });
  
productRouter.delete("/delete/:id", roleValidator, async (req, res) => {
    let { id } = req.params;
    try {
      await ProdModel.findByIdAndDelete({ _id: id });
      res.send({
        message: "Data has been deleted succesfully",
      });
    } catch (error) {
      res.send(error);
    }
  });
  

module.exports = {productRouter}