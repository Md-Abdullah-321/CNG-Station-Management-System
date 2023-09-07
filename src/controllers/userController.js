/*
title: User Controller.
description: Controlling user router's middleware.
author: MD Abdullah
date: 04/09/2023
*/

//Dependencies:
const { createJSONWebToken } = require("../../helper/createJSONWebToken");
const User = require("../models/userSchema");
const { jwtActivationKey } = require("../secret");
const { successResponse, errorResponse } = require("./responseController");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Create New User:
const createUser = async(req, res, next) => {
    const { name, email, phone, reg_number, license_number, image, password, address} = req.body;
    const user = {
        name, email, phone, reg_number, license_number, image, password, address
    }

    const hasEmail = await User.exists({ email: email })
    const hasReg = await User.exists({ reg_number: reg_number });
    const hasPhone = await User.exists({ phone: phone });
    
    if (hasEmail || hasReg || hasPhone) {
        errorResponse(res, {
            statusCode: 401,
            message: "Invalid Credentials"
        })
    }

    //if any field is empty, return error:
    if (!name || !email || !phone || !reg_number || !license_number || !password || !address) {
        errorResponse(res, {
            statusCode: 400,
            message: 'Please, fill all the input filed'
        })
    }

    try {
        await User.create(user);
        successResponse(res, {
        statusCode: 200,
        message: 'user created successfully',
    })
    } catch (error) {
        next(error);
    }
}

//POST: login user:
const userLogin = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            errorResponse(res, {
                statusCode: 400,
                message: 'Please, fill the data'
            })
        }
        
        const hasUser = await User.findOne({ email: email });
        if (hasUser) {
            if (hasUser.accountType === 'pending' || hasUser.accountType === 'blocked') {
                errorResponse(res, {
                    statusCode: 400,
                    message: "User not valid. Please, contact to admin"
            })
        }
        const isMatch = await bcrypt.compare( password,hasUser.password );
         if(!isMatch){
            errorResponse(res, {
                statusCode: 400,
                message: 'Invalid Credentials'
            })
         } else {
             console.log(email, password);
            //create json web token:
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
    }
    } catch (error) {
        next(error)
    }
}

//GET: get own profile:
const getUserProfile = async(req, res, next) => {
    const { token } = req.headers;
    const decoded = jwt.verify(token, jwtActivationKey);
    
    console.log(decoded);
    //get user by email:
    const user = await User.findOne({ email: decoded.email });

    successResponse(res, {
        statusCode: 201,
        payload: user
    })
}


//POST: request for a serial
const requestForSerial = async (req, res, next) => {
    const { token } = req.headers;
    const { origin, destination } = req.body;
    const decoded = jwt.verify(token, jwtActivationKey);

    //get user by email:
    const user = await User.findOne({ email: decoded.email });

    //get toady's date:
    let date = new Date().toLocaleDateString();

    //separate serial from user:
    let serial = user.serial;

    // check if the serial array empty or not:
    if (serial.length > 0) {
        let lastSerial = serial[serial.length - 1];

        //check if the date is today's or not:
        if (lastSerial[date]) {
            let lastItem = Object.keys(Object.values(lastSerial)[0]);

            if (lastSerial[date][parseInt(lastItem[lastItem.length - 1])].serial_status === 'pending' || lastSerial[date][parseInt(lastItem[lastItem.length - 1])].serial_status === 'in-progress') {
                errorResponse(res, {
                    statusCode: 409,
                    message: 'Please, complete first your last destination'
                })
            } else {
                lastItem = parseInt(lastItem[lastItem.length - 1]) + 1;
    
                lastSerial[date][lastItem] = {
                    origin,
                    destination,
                    start: '',
                    serial_status: 'pending',
                    end: ''
            }
                await User.updateOne({ _id: user._id }, { $set: { serial: serial } });
                successResponse(res, {
                    statusCode: 201,
                    payload: user.serial
                })
            }
            
        } else {
            let newSerial = {
            [date]: {
                1: {
                    origin,
                    destination,
                    start: '',
                    serial_status: 'pending',
                    end: ''
                }
            }
        }

        serial[serial.length] = newSerial;

            await User.updateOne({ _id: user._id }, { $set: { serial: serial } });
            successResponse(res, {
                statusCode: 201,
                payload: user.serial
            })
        }
    } else {
        let newSerial = {
            [date]: {
                1: {
                    origin,
                    destination,
                    start: '',
                    serial_status: 'pending',
                    end: ''
                }
            }
        }

        serial[0] = newSerial;

        await User.updateOne({ _id: user._id }, { $set: { serial: serial } });

        successResponse(res, {
            statusCode: 201,
            payload: user.serial
        })
    }
   
}

//GET: User serial history:
const getSerialHistory = async(req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            errorResponse(res, {
                statusCode: 401,
                message: 'Token must be provided'
            })
        }
        const decoded = jwt.verify(token, jwtActivationKey);
        //get user using decode email:
        const user = await User.find({ email: decoded.email });
        //breakout the serial from user:
        const serial = user[0].serial;

        if (serial) {
            successResponse(res, {
                statusCode: 200,
                message: 'Serial history collected successfully',
                payload: serial
            })
        }

    } catch (error) {
        console.error(error);
    }
}
//GET: Serial History (All) :
const getAllSerialHistory = (req, res, next) => {
    const allUser = User.find({});

    console.log(allUser);
    successResponse(res, {
        statusCode: 200,
        message: 'All users serial gathered successfully',
        payload: allUser
    })
}


//GET:logout user:
const userLogout = (res, req, next) => {
    try {
        res.clearCookie('jwtoken', { path: '/' });
        successResponse(res, {
            statusCode: 200,
            message: 'Logout successfull'
        })
    } catch (error) {
        console.error(error);
    }
}
module.exports = {
    createUser,
    getUserProfile,
    requestForSerial,
    userLogin,
    userLogout,
    getSerialHistory,
    getAllSerialHistory
}