/*
 * Title: Admin Schema. 
 * Description: Admin Schema to create new admin.
 * Author: Md Abdullah
 * Date: 09/16/23
 */


//Dependencies:
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new Schema({
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
    image: {
        type: Buffer,
        contentType: String,
        required: [true, 'User image is required']
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
}, { timestamps: true });

const Admin = model('Admins', adminSchema);
module.exports = Admin;