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
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');
const { errorResponse } = require('./controllers/responseController');
const cookieParser = require('cookie-parser');


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
app.use(bodyParser.urlencoded({ extended: true }));
//3. xss-clean -  use to secure routes:
app.use(xssClean());
//4. express-rate-limit - limit request from an IP:
app.use(rateLimiter);
//5. Cookie-parser  - handle cookies:
// app.use(cookieParser);




//User router:
app.use('/api/users', userRouter);


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