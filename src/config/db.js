const mongoose = require('mongoose');
const { DATABASE_URL } = require('../secret');
const connectionDB = async (options = {}) => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log('Database Connected');

        mongoose.connection.on('error', (error) => {
            console.log('DB Connection Error');
        })
    } catch (error) {
        console.error('Could not connect to DB', error.toString());
    }
}

module.exports = connectionDB;