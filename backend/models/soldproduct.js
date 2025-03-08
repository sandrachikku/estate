import mongoose from "mongoose";

const soldproductSchema=new mongoose.Schema({
    buyerId:{type:String},
    sellerId:{type:String},
    sname:{type:String},
    email:{type:String},
    address:{type:String},
    product:{type:Object}
}) 

export default mongoose.model.Soldproducts || mongoose.model("Soldproduct",soldproductSchema);