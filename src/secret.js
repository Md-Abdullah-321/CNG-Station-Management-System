require('dotenv').config()
const serverPort = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const defaultImagePath = process.env.DEFAULT_IMAGE_PATH || 'public/images/users/dafault.jpeg'
const uploadDir = process.env.UPLOAD_DIR || './public/image/users';
const jwtActivationKey = process.env.JSON_ACTIVATION_KEY || 'cngstation';

module.exports = {
    serverPort,
    DATABASE_URL,
    defaultImagePath,
    uploadDir,
    jwtActivationKey
}