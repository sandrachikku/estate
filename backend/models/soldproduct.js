import mongoose from "mongoose";

const soldproductSchema=new mongoose.Schema({
    buyerId:{type:String},
    sellerId:{type:String},
    user:{type:Object},
    product:{type:Object}
}) 

export default mongoose.model.Soldproducts || mongoose.model("Soldproduct",soldproductSchema);