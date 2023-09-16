/*
 * Title: Admin Controller. 
 * Description: Controlling admin router's middlewares.
 * Author: Md Abdullah
 * Date: 09/16/23
 */




//Dependencies:
const { createJSONWebToken } = require("../../helper/createJSONWebToken");
const Admin = require("../models/adminSchema");
const { jwtActivationKey } = require("../secret");
const { successResponse, errorResponse } = require("./responseController");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/userSchema");




//POST: Create new admin:
const createAdmin = async (req, res, next) => {
    const { name, email, phone, address, password } = req.body;

    const image = req.file;

    console.log(req.file);
     //if any input field is empty, return error:
    if (!name || !email || !phone || !password || !address) {
        errorResponse(res, {
            statusCode: 400,
            message: 'Please, fill all the input filed'
        })
    }
    if (!image) {
        errorResponse(res, {
            statusCode: 400,
            message: 'Image is required.'
        })
    }
         
    if (image.size > 1024 * 1024 * 2) {
        errorResponse(res, {
            statusCode: 400,
            message: 'Image size must be less than 2 MB'
        })
    }
         
    const imageBufferString = image.buffer.toString('base64');


    const admin = {
        name, email, phone, password, address, image: imageBufferString
    }

    //Check if admin already exist or not:
    const hasEmail = await Admin.exists({ email: email })
    const hasPhone = await Admin.exists({ phone: phone });
    
    //if exist, return error:
    if (hasEmail || hasPhone) {
        errorResponse(res, {
            statusCode: 401,
            message: "User already exist, please login"
        })
    }

    try {
        await Admin.create(admin);
        successResponse(res, {
        statusCode: 200,
        message: 'Admin created successfully',
    })
    } catch (error) {
        next(error);
    }
}



//POST: Admin login.
const adminLogin = async (req, res) => {

    const { email, password } = req.body;

    //if any field is empty, return error:
    if (!email || !password) {
        errorResponse(res, {
            statusCode: 400,
            message: 'Please, fill the data'
        })
    }

    //if not, check if the user is exist or not:
    const hasUser = await Admin.findOne({ email: email });

    //if not, return error:
    if (!hasUser) {
        errorResponse(res, {
            statusCode: 400,
            message: "Admin is not valid"
        })
    }

    //if exist, check if the password is correct or not:
    const isMatch = await bcrypt.compare(password, hasUser.password);

    //if not match, return error:
    if (!isMatch) {
        errorResponse(res, {
            statusCode: 400,
            message: 'Invalid Credentials'
        })
    }

    //if match, create token and give permission to login:
    const expire = 24 * 60 * 60 * 1000;
    const token = createJSONWebToken({ email, password }, jwtActivationKey, expire);
    res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true
    }); 
    successResponse(res, {
        statusCode: 200,
        message: 'Login successful',
        payload: {token}
    })
}


const approveUser = async (req, res,next) => {
    const {id} = req.params;

    console.log(id);
    try {
        //check if any user exist with this id or not:
        const user = await User.findById(id);

        //if exist:
       await User.updateOne({ _id: user._id },
            { $set: { accountType: "approved" } });
        successResponse(res, {
            statusCode: 200,
            message: 'User Approved successfully',
        })
    } catch (error) {
        next(error)
    }
    
}

const banUser = async (req, res,next) => {
    const {id} = req.params;

    console.log(id);
    try {
        //check if any user exist with this id or not:
        const user = await User.findById(id);

        //if exist:
       await User.updateOne({ _id: user._id },
            { $set: { accountType: "banned" } });
        successResponse(res, {
            statusCode: 200,
            message: 'User banned successfully',
        })
    } catch (error) {
        next(error)
    }
    
}

module.exports = {
    createAdmin,
    adminLogin,
    banUser,
    approveUser,
}