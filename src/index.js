/*
title: Server file.
description: Server & Database running in this file.
author: MD Abdullah
date: 04/09/2023
*/




//Dependencies:
const app = require('./app');
const connectionDB = require('./config/db');
const {serverPort} = require('./secret')




//Running Server:
app.listen(serverPort, async() => {
    console.log(`server is running on http://localhost:${serverPort}`);
    await connectionDB();
})