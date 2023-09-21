/*
 * Title: User Controller. 
 * Description: Controlling user router's middlewares.
 * Author: Md Abdullah
 * Date: 09/04/23
 */

//Dependencies:
const { createJSONWebToken } = require("../../helper/createJSONWebToken");
const User = require("../models/userSchema");
const { jwtActivationKey } = require("../secret");
const { successResponse, errorResponse } = require("./responseController");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

//Create New User:
const createUser = async(req, res, next) => {
    const { name, email, phone, reg_number, license_number, password, address} = req.body;
    const image = req.file;
    if (!image) {
        throw createError(400, 'image file is required');
    }
         
    if (image.size > 1024 * 1024 * 2) {
        throw createError(400, 'File is too large')
    }
         
    const imageBufferString = image.buffer.toString('base64');

    const user = {
        name, email, phone, reg_number, license_number, password, address, image: imageBufferString
    }

    const hasEmail = await User.exists({ email: email })
    const hasReg = await User.exists({ reg_number: reg_number });
    const hasPhone = await User.exists({ phone: phone });
    
    if (hasEmail || hasReg || hasPhone) {
        errorResponse(res, {
            statusCode: 401,
            message: "User already exist, please login"
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
        console.log(hasUser);
        if (hasUser) {
            if (hasUser.accountType === 'pending' || hasUser.accountType === 'banned') {
                errorResponse(res, {
                    statusCode: 400,
                    message: "User not valid. Please, contact to admin"
                })
            } else {
                const isMatch = await bcrypt.compare( password.trim(), hasUser.password );
                if(!isMatch){
                    errorResponse(res, {
                        statusCode: 400,
                        message: 'Invalid Credentials'
                })
         } else {
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
        
    }
    } catch (error) {
        next(error)
    }
}

//GET: get own profile:
const getUserProfile = async(req, res, next) => {
    const { token } = req.headers;
    const decoded = jwt.verify(token, jwtActivationKey);
    
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
                    driver: user.name,
                    reg_number: user.reg_number,
                    license_number: user.license_number,
                    serial_time: Date.now(),
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
                    driver: user.name,
                    reg_number: user.reg_number,
                    license_number: user.license_number,
                    serial_time: Date.now(),
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
                    driver: user.name,
                    reg_number: user.reg_number,
                    license_number: user.license_number,
                    serial_time: Date.now(),
                    origin,
                    destination,
                    start: '',
                    serial_status: 'pending',
                    end: ''
                }
            }
        }

        serial[0] = newSerial;

        await User.updateOne({ _id: user._id },
            { $set: { serial: serial } });

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
const getAllSerialHistory = async(req, res, next) => {
    const allUser = await User.find({});

    const allSerial = [];

    //get all user's serial history array:
    for (let i = 0; i < Object.keys(allUser).length; i++){
        allSerial.push({...allUser[i].serial});
    }

    //get current date array:
    const currentDate = new Date().toLocaleDateString();

    let currentUserArray = [];

    //get today's serial:
    allSerial.forEach(item => {
        let dateKeys = [];
       
        for (let j = 0; j < Object.keys(item).length; j++){
            dateKeys.push(Object.keys(item[j])[0]);
        }
        
        if (Object.values(item).filter(lastSearch => lastSearch[currentDate]).length > 0) {
            currentUserArray.push(Object.values(item).filter(lastSearch => lastSearch[currentDate])[0][currentDate])
        }
    })

    //findout the pending users:
    const pendingUser = [];
    currentUserArray.forEach(item => {
        const serialValues = Object.values(item);
        const pendingSerial = serialValues.filter(value => value.serial_status === 'pending');

        pendingUser.push(...pendingSerial);
    });
    //sort serial array based on time:
    pendingUser.sort((a, b) => parseInt(a.serial_time) - parseInt(b.serial_time));
    successResponse(res, {
        statusCode: 200,
        message: 'All users serial gathered successfully',
        payload: pendingUser,
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
        next(error);
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