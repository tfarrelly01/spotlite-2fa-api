
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'dev';
}
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: `./.${process.env.NODE_ENV}.env`});
}

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER } = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const minutesToCompleteRegistration = '20';

exports.sendSMS = (pinCode, phoneNumber, type) => {
    type = type || 'PIN';

    let textBoby;
    if (type = 'PIN') {
        textBody = 'Your Registration pin code is ' + pinCode + 
        '. Your pin code is valid for ' + minutesToCompleteRegistration + ' minutes';
    } else { // type = 'COMPLETE'
        textBody = 'Registration completed, thank you.';
    }

    client.messages
    .create({
        body: textBody,
        from: TWILIO_NUMBER,
        to: phoneNumber
    })
    .then(message => message.sid)
    .catch(err => err)
    .done();
}