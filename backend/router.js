import { Router } from "express";
import * as user from "./requestHandler.js";
import Auth from "./middleware/Auth.js";

const router=Router();

router.route("/verifyemail").post(user.verifyEmail);
router.route("/signup").post(user.signUp); 
router.route("/signin").post(user.signIn);
router.route("/home").get(Auth,user.home);
router.route("/profile").get(Auth,user.profile);
router.route("/edituser").post(Auth,user.editUser);
router.route("/editaddress").post(Auth,user.editAddress);
router.route("/company").get(Auth,user.company); 
router.route("/editcompany").post(Auth,user.editCompany);
router.route("/editcategory").post(Auth,user.editCategory);
router.route("/addproduct").post(Auth,user.addProduct);

export default router;