/*
title: User Schema.
description: User Schema for Creating new user.
author: MD Abdullah
date: 04/09/2023
*/


//Dependencies:
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { defaultImagePath } = require('../secret');


//Date: 
const date = new Date().toLocaleString();

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minlength: [3, 'The length of user name must be more than 2 character'],
        maxlength: [16, 'The length of user name can be max 16 characters.']
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email'
        }
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^(?:\+88|88)?01[3-9]\d{8}$/.test(v)
            },
            message: 'Please enter a valid phone number'
        }
    },
    reg_number: {
        type: String,
        required: [true, 'Registration number is require'],
        trim: true,
        unique: true,
    },
    license_number: {
        type: String,
        required: [true, 'License number is require'],
        trim: true,
        unique: true,
    },
    image: {
        type: String,
        default: defaultImagePath
    },
    password: {
        type: String,
        required: [true, 'User password is required.'],
        minlength: [6, 'The length of user password must be more than 5 character'],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    address: {
        type: String,
        required: [true, 'User address is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    accountType: {
        type: String,
        default: 'pending',
    },
    date: {
        type: Date,
        default: date
    },
    serial: []
}, { timestamps: true });

const User = model('Users', userSchema);
module.exports = User;