const { errorResponse } = require("../src/controllers/responseController");
const Serial = require("../src/models/serialSchema");

const createSerial = async(origin, destination,serial_status) => {
    //if any field is empty throw error:
    if (!origin || !destination || !serial_status) {
        errorResponse(res, {
            statusCode: 400,
            message: "Invalid Serial"
        })
    }

    const serial = {
        origin, destination, serial_status
    }

    //Today's date:
    const date = new Date().toLocaleDateString().toString();

    console.log(typeof date);

    //check today's date is already exist or not:
    const isMatch = Serial.findOne({ day: date });
    console.log(isMatch);
    if (isMatch) {
        await Serial.create(serial);
    } else {
        isMatch.serials.push(serial);

        await Serial.updateOne({_id: isMatch._id},{ $set: { serials: isMatch.serials } });
    }

}

module.exports = createSerial;