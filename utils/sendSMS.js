
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'dev';
}
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: `./.${process.env.NODE_ENV}.env`});
}

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER } = process.env;

const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

exports.sendSMS = (pinCode) => {
    client.messages
    .create({
        body: 'Your Spotlite Registration pin code is ' + pinCode + '. Your pin code is valid for 20 minutes',
        from: TWILIO_NUMBER,
        to: '+447799591614'
    })
    .then(message => console.log('MESSAGE SENT:', message.sid))
    .catch(err => err)
    .done();
}