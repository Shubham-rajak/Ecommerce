
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import userModel from "../models/user.model";
import addressModel from '../models/address.model';

export const addUser = async (req,res) =>{
    try {
        console.log(req.body);
        const {name,email,password,contact,address} = req.body;
        const created = await userModel.create({
            name:name,
            email:email,
            password:password,
            contact:contact,
            address:address
        })
        return res.status(200).json({
            data: created,
            message: "User created successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({ message: "Failed to create user",success: false, error: error.message })
    }
}

export const getUsers = async (req,res) => {
    try {
        const userData = await userModel.find().populate('address');
        
        return res.status(200).json({
             data: userData, 
             message: "User is Fetched successfully",
             success: true 
        })
    } catch (error) {
        return res.status(500).json({ message: "Failed to get user", success: false, error: error.message })
    }
}

export const getUserById = async (req,res) => {
    try {
        console.log(req.user);
        const { user } = req.user;
        // console.log("User from token: ", users);

        const isUser = await userModel.findOne({user }).populate('address')
        if (!isUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        return res.status(200).json({
            user: isUser,
            message: "User fetched successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message,
        })
    }
     
}

export const updateUser = async (req,res) => {
    try {
        const userId = req.params.user_id;
        const {name,email,password,contact} = req.body;
        console.log('body',req.body);
        const updateUser = await userModel.updateOne({_id:userId},{$set:{
            name:name,
            email:email,
            password:password,
            contact:contact,
            address:address
        }})
        if(updateUser.modifiedCount>0){
            return res.status(200).json({
                message:"User is updated successfully",
                success:true
            })
        }
        return res.status(400).json({
            message:"Something went wrong",
            success:false
        })
    } catch (error) {
        return res.status(500).json({ message: "Failed to update user", success: false, error: error.message })
    }
}

export const deleteUser = async (req,res) => {
    try {
        const userId = req.params.user_id
        const deletedUser = await userModel.findOne({_id: userId});
        if(!deletedUser){
            return res.status(404).json({ message: "User not found", success: false })
        }
        return res.status(200).json({
             message: "User is deleted successfully",
             success: true 
        })
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete user", success: false, error: error.message })
    }
}

export const signUp = async (req,res)=>{
    try{
        const {name,email,password,contact} = req.body;
        const existUser = await userModel.findOne({email:email}); 
        if(existUser){
            return res.status(400).json({
                message:"User already exist!",
                success:false
            })
        }
        const hashPassword = bcrypt.hashSync(password, 12);

        const userdata = await userModel.create({
            name:name,
            email:email,
            password:hashPassword,
            contact:contact
        })
        console.log(hashPassword)

        // create a token
        const token = jwt.sign({
           userdata
          }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        return res.status(201).json({
            data:userdata,
            message:"Signup successful",
            success:true,
            token
        })
    }catch(err){
        return res.status(500).json({message:err.message,success:false});
    }
}


export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const existUser = await userModel.findOne({email:email});
        if(!existUser){
            return res.status(400).json({
                message:"User doesn't exist!",
                success:false
            })
        }

        const match = await bcrypt.compare(password, existUser.password);
        if(!match){
            return res.status(400).json({
                message:"Invalid credential",
                success:false
            })
        }

        const token = jwt.sign({
            data: {id:existUser._id}
          }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        const userdata = await userModel.findOne({email}).select('-password');

        return res.status(200).json({
            data:userdata,
            token,
            message:"Admin login Successful",
            success:true
        })
    }catch(err){
        return res.status(500).json({message:err.message,success:false});
    }
}


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if the admin user exists
    const existAdmin = await userModel.findOne({ email: email });
    if (!existAdmin) {
      return res.status(400).json({
        message: "Admin doesn't exist!",
        success: false,
      });
    }

    // Check if the user is an admin
    if (!existAdmin.isAdmin) {
      return res.status(403).json({
        message: "Unauthorized! You are not an admin.",
        success: false,
      });
    }

    // Compare password
    const match = await bcrypt.compare(password, existAdmin.password);
    if (!match) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { data: { id: existAdmin._id } },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Send the response
    const adminData = await userModel
      .findOne({ email })
      .select('-password');  // Remove password from the response

    return res.status(200).json({
      data: adminData,
      token,
      message: "Admin login successful",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};








