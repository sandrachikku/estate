import loginSchema from './models/login.model.js'
import userSchema from './models/user.model.js';  // Adjust path as needed
import addressSchema from './models/address.model.js';
import companySchema from './models/Company.model.js';
import productSchema from './models/product.model.js'
import categorySchema from './models/category.model.js';
import cartSchema from './models/cart.model.js'
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import nodemailer from "nodemailer";
const {sign}=pkg;
const transporter = nodemailer.createTransport({
    service:"gmail",
     auth: {
         user: "ad1821225@gmail.com", 
         pass: "dpzc musd zcap rlyl",
     },
   });
   export async function home(req,res) {
    try {
        const _id=req.user.userId;
        const user=await loginSchema.findOne({_id});
       const products=await productSchema.find({
        sellerId: { $not: { $eq: _id} }
         })
       const categories=await categorySchema.find();
          
        return res.status(200).send({username:user.username,role:user.role,products,categories});
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}
export async function profile(req,res) {
    try {
        const _id=req.user.userId;
        const user=await loginSchema.findOne({_id});
        if(!user)
            return res.status(403).send({msg:"Unauthorized acces"});
        const profile=await userSchema.findOne({userId:_id});
        const address=await addressSchema.findOne({userId:_id},{addresses:1});
        const cart=await cartSchema.countDocuments({buyerId:_id})
       const wishlist=await wishlistSchema.countDocuments({buyerId:_id})
       const orders=await orderSchema.countDocuments({buyerId:_id})
        return res.status(200).send({username:user.username,role:user.role,profile,address,cart})
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}
export async function editUser(req,res) {
    try {
    const {...user}=req.body;
    const id=req.user.userId
    const check=await userSchema.findOne({userId:id})
    if(check){
        const data=await userSchema.updateOne({userId:id},{$set:{...user}});
    }else{
        const data=await userSchema.create({userId:id,...user});
    }
    return res.status(201).send({msg:"updated"});
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}

export async function editAddress(req,res) {
    try {
    const address=req.body;
    const id=req.user.userId
    const check=await addressSchema.findOne({userId:id})
    if(check){
        const data=await addressSchema.updateOne({userId:id},{$set: { addresses: address }  });
    }else{
        const data=await addressSchema.create({userId:id,addresses:address});
    }
    return res.status(201).send({msg:"updated"});
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}
export async function company(req,res) {
    try {
        const _id=req.user.userId;
        const user=await loginSchema.findOne({_id});
        if(!user)
            return res.status(403).send({msg:"Unauthorized acces"});
        const company=await companySchema.findOne({sellerId:_id});
        const categories=await categorySchema.find();
        return res.status(200).send({username:user.username,role:user.role,company,categories})
        
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}

export async function editCompany(req,res) {
    try {
    const {...company}=req.body;
    const id=req.user.userId
    const check=await companySchema.findOne({sellerId:id})
    if(check){
        const data=await companySchema.updateOne({sellerId:id},{$set:{...company}});
    }else{
        const data=await companySchema.create({sellerId:id,...company});
    }
    return res.status(201).send({msg:"updated"});
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}
export async function editCategory(req,res) {
    try {
    const {newCategory}=req.body;
    const data=await categorySchema.create({category:newCategory});
    return res.status(201).send({msg:"updated"});
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}

export async function addProduct(req,res) {
    try {
        const product=req.body;
        const id=req.user.userId;
        const data=await productSchema.create({sellerId:id,...product});
        return res.status(201).send({msg:"Adding complete"});
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}
export async function products(req,res) {
    try {
        const {category}=req.params;
        const _id=req.user.userId;
        const user=await loginSchema.findOne({_id});
        if(!user)
            return res.status(403).send({msg:"Unauthorized acces"});
        const products=await productSchema.find({$and:[{sellerId:_id},{category}]});
        return res.status(200).send({username:user.username,role:user.role,products})
        
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}
export async function getProduct(req,res) {
    try {
        const {_id}=req.params;
        const id=req.user.userId;
        const user=await loginSchema.findOne({_id:id});
        if(!user)
            return res.status(403).send({msg:"Unauthorized acces"});
        const product=await productSchema.findOne({_id});
        
        const category=await categorySchema.find();
        return res.status(200).send({username:user.username,role:user.role,product,category})
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}

export async function editProduct(req,res) {
    try {
        const {...product}=req.body;
        const{_id}=req.params;
        const id=req.user.userId;
        const data=await productSchema.updateOne({_id},{...product});
        return res.status(201).send({msg:"Updated"});
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}

export async function product(req,res) {
    try {
        const {_id}=req.params;
        const id=req.user.userId;
        let isOnCart=false;
        let isOnWishlist=false;
        const user=await loginSchema.findOne({_id:id});
        if(!user)
            return res.status(403).send({msg:"Unauthorized acces"});
        const product=await productSchema.findOne({_id});
        const check1=await cartSchema.findOne({$and:[{"product._id":_id},{buyerId:id}]});
        const check2=await wishlistSchema.findOne({$and:[{productId:_id},{buyerId:id}] })
        if(check1)
            isOnCart=true;
        if(check2)
            isOnWishlist=true;
        return res.status(200).send({username:user.username,role:user.role,product,isOnCart,isOnWishlist})
        
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}
export async function addToCart(req,res) {
    try {
        const cart=req.body;
        const id=req.user.userId;
        const data=await cartSchema.create({buyerId:id,...cart});
        return res.status(201).send({msg:"Added to Cart"});
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}

export async function getCart(req,res) {
    try {
        const id=req.user.userId;
        const user=await loginSchema.findOne({_id:id});
        if(!user)
            return res.status(403).send({msg:"Unauthorized acces"});
        const cart=await cartSchema.find({buyerId:id});
        const addresses=await addressSchema.findOne({userId:id},{addresses:1})
        return res.status(200).send({username:user.username,role:user.role,cart,addresses})
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}
   export async function verifyEmail(req,res) {
    const {email}=req.body;
    
      try {
      // send mail with defined transport object
         const info = await transporter.sendMail({
             from: `"Hai 👻" <${email}>`, // sender address
             to: `${email}`, // list of receivers
             subject: "Verify Mail ID", // Subject line
             text: "Confirm your account", // plain text body
             html: `<!DOCTYPE html>
       <html lang="en">
       <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Account Verification</title>
         <style>
             body {
                 font-family: Arial, sans-serif;
                 margin: 0;
                 padding: 0;
                 background-color: #f4f4f4;
                 color: #333;
             }
             .email-container {
                 width: 100%;
                 max-width: 600px;
                 margin: 0 auto;
                 background-color: #fff;
                 border: 1px solid #ddd;
                 padding: 20px;
                 border-radius: 8px;
                 text-align: center;
             }
             .btn {
                 display: inline-block;
                 background-color: #4CAF50;
                 color: #fff;
                 text-decoration: none;
                 padding: 15px 30px;
                 margin-top: 20px;
                 border-radius: 4px;
                 font-size: 18px;
                 text-align: center;
             }
         </style>
       </head>
       <body
         <div class="email-container">
             <p>Hello,</p>
             <p>Please verify your email address by clicking the button below.</p>
             <a href="http://localhost:5173/signup" class="btn">Verify Your Account</a>
         </div
       </body>
       </html>`, // html body
         });
       console.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  
          return res.status(201).send({msg:"Confirmation mail succefully sent",email});
      } catch (error) {
          return res.status(404).send({msg:"error"});
      }
  }

   export async function signUp(req,res) {
    try {
        const {email,username,password,cpassword,role}=req.body;
        
        if(!(email&&username&&password&&cpassword&&role))
            return res.status(404).send({msg:"fields are empty"});
  
        if(password!==cpassword)
            return res.status(404).send({msg:"password not matched"})
  
        bcrypt.hash(password,10).then((hashedPassword)=>{
          loginSchema.create({email,username,password:hashedPassword,role}).then(()=>{
                return res.status(201).send({msg:"success"});
            }).catch((error)=>{
                return res.status(404).send({msg:"Not registered"})
            })
        }).catch((error)=>{
            return res.status(404).send({msg:"error"}); 
        })
    } catch (error) {
        return res.status(404).send({msg:"error"});
    }
  }
  
  export async function signIn(req,res) {
      try {
    const {email,password}=req.body;  
  
    if(!(email&&password))
        return res.status(404).send({msg:"feilds are empty"})
  
    const user=await loginSchema.findOne({email})
    if(user===null)
        return res.status(404).send({msg:"invalid email"})
  
    //convert to hash and compare using bcrypt
    const success=await bcrypt.compare(password,user.password);
    if(success!==true)
        return res.status(404).send({msg:"email or password is invalid"})
    //generate token using sign(JWT key)
    const token=await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"24h"});
    return res.status(200).send({msg:"Succefully logged in",token})
      } catch (error) {
          return res.status(404).send({msg:"error"});
      }
  }