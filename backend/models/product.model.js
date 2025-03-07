import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    sellerId:{type:String},
    category:{type:String},
    pname:{type:String},
    brand:{type:String},
    price:{type:Number},
    sizeColorQuantities:{type:Array},
    pimages:{type:Array}
})

export default mongoose.model.Products || mongoose.model("Product",productSchema);