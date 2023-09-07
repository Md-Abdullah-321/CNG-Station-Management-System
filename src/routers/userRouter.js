/*
 * Title: App Router.
 * Description: handling all user routers.
 * Author: MD Abdullah
 * Date: 04/09/2023
 */



//Dependencies:
const express = require('express');
const { createUser, getUserProfile, requestForSerial, userLogin, userLogout, getSerialHistory, getAllSerialHistory } = require('../controllers/userController');
const upload = require('../middlewares/uploadFile');
const userRouter = express.Router();


//POST: Register an user: 
userRouter.post('/create', upload.single("image"), createUser);

//POST: login user:
userRouter.post('/login', userLogin);

//GET: Get own profile:
userRouter.get('/profile', getUserProfile);

//POST: request for a serial
userRouter.post('/serial', requestForSerial);

//GET: user logout:
userRouter.get('/logout', userLogout);

//GET: User serial history:
userRouter.get('/history', getSerialHistory);

//GET: All serial History: 
userRouter.get('/serialHistory', getAllSerialHistory);




module.exports = userRouter;