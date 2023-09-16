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
const { createAdmin, adminLogin, banUser, approveUser } = require('../controllers/adminController');


//POST: Create new admin:
adminRouter.post('/create',upload.single('image') ,createAdmin);


//POST: login as admin:
adminRouter.post('/login', adminLogin);

//PUT: Approved account:
adminRouter.put('/approve/:id', approveUser)

//PUT: Banned account:
adminRouter.put('/restricted/:id', banUser)

//GET: Show all pending user:
adminRouter.get('/pending', (req, res) => {
    res.send("Show all pending User.")
});

//GET: show all cng:
adminRouter.get('/users', (req, res) => {
    res.send("Total CNG with some info.")
});

//GET: CNG info by ID:
adminRouter.get('/:id', (req, res) => {
    res.send("CNG details with serial history");
})




module.exports = adminRouter;