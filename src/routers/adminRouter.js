/*
 * Title: Admin Router 
 * Description: Manage all admin router related things.
 * Author: Md Abdullah
 * Date: 09/14/23
 */


//Dependencies:
const express = require('express');
const adminRouter = express.Router();


//POST: Create new admin:
adminRouter.post('/create', (req, res) => {
    res.send('I am admin registration');
});

//PUT: Banned account:
adminRouter.put('/:id', (req,res) => {
    res.send("Acoount banned");
})

//GET: show all cng:
adminRouter.get('/users', (req, res) => {
    res.send("Total CNG with some info.")
});

//GET: CNG info by ID:
adminRouter.get('/:id', (req, res) => {
    res.send("CNG details with serial history");
})




module.exports = adminRouter;