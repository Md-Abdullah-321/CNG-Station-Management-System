const errorResponse = (res, { statusCode = 500, message = 'Internel server error' }) => {
    if (!res.headersSent) {
        return res.status(statusCode).json({
        success: false,
        message: message
        })
    }
}



const successResponse = (res, { statusCode = 200, message = 'Success', payload = {} }) => {
    if (!res.headersSent) {
        return res.status(statusCode).json({
        success: true,
        message: message,
        payload,
        })
    }
}



module.exports = {
    errorResponse,
    successResponse
}