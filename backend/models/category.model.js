import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    category:{type:String}
})

export default mongoose.model.Categories || mongoose.model("Category",categorySchema); 