
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'dev';
}
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: `./.${process.env.NODE_ENV}.env`});
}

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER } = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const minutesToCompleteRegistration = '20';

exports.sendSMS = (pinCode, phoneNumber) => {
    client.messages
    .create({
        body: 'Your Spotlite Registration pin code is ' + pinCode + 
            '. Your pin code is valid for ' + minutesToCompleteRegistration + ' minutes',
        from: TWILIO_NUMBER,
        to: phoneNumber
    })
    .then(message => phoneNo)
    .catch(err => err)
    .done();
}