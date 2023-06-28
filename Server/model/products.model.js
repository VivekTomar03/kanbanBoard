const mongoose = require("mongoose")

const  productsSchema = mongoose.Schema({
    title:{type:String,required:true},
   category:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    desc:{type:String,required:true},
    
},{
    versionKey:false
})

const ProdModel = mongoose.model("product",productsSchema)
module.exports = {ProdModel}