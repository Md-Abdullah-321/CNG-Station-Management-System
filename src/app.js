/*
title: app file.
description: Doing all app related works expect routing.
author: MD Abdullah
date: 04/09/2023
*/


//Dependencies:
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');
const { errorResponse } = require('./controllers/responseController');
const cookieParser = require('cookie-parser');
const adminRouter = require('./routers/adminRouter');
const cors = require("cors");
const path = require('path');



const app = express();
const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 Minute
    max: 5, //user can req to a route max 5 times 
    message: 'Too many requests from this IP, please try again later'
})

//App level Middleware:
//1. Morgan - use to see the requiest type:
app.use(morgan('dev'));
//2. BodyParser - use to parse body:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//3. express-rate-limit - limit request from an IP:
app.use(rateLimiter);
//4. Cookie-parser  - handle cookies:
app.use(cookieParser());
//5. cors:
app.use(cors());




//User router:
app.use('/api/users', userRouter);

//admin Router:
app.use('/api/admin', adminRouter);


//serve Client:
app.use(express.static(path.join(__dirname,"..", "/frontEnd/dist")));

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname,"..", '/frontEnd/dist/index.html'),
        function(err) {
            res.status(500).send(err)
        }
    )
})

//client error handling:
app.use((req, res, next) => {
    next(createError(404, 'route not found'));
});

//server error handling:
app.use((err, req, res, next) => {
    return errorResponse(res, {
        statusCode: err.status,
        message: err.message
    })
})

module.exports = app;