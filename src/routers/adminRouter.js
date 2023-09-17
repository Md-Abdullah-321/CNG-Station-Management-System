/*
 * Title: Admin Router 
 * Description: Manage all admin router related things.
 * Author: Md Abdullah
 * Date: 09/14/23
 */


//Dependencies:
const express = require('express');
const adminRouter = express.Router();
const upload = require('../middlewares/uploadFile');
const { createAdmin, adminLogin, banUser, approveUser, getPendingUsers, getAllUsers } = require('../controllers/adminController');


//POST: Create new admin:
adminRouter.post('/create',upload.single('image') ,createAdmin);


//POST: login as admin:
adminRouter.post('/login', adminLogin);

//PUT: Approved account:
adminRouter.put('/approve/:id', approveUser)

//PUT: Banned account:
adminRouter.put('/restricted/:id', banUser)

//GET: Show all pending user:
adminRouter.get('/pending', getPendingUsers);

//GET: show all cng:
adminRouter.get('/users', getAllUsers);

// TODO: Add search Option. 




module.exports = adminRouter;