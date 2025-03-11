import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    buyerId:{type:String},
    sizeOrColor:{type:String},
    quantity:{type:Number},
    shipped:{type:Boolean},
    product:{type:Object}
}) 

export default mongoose.model.Orders || mongoose.model("Order",orderSchema);