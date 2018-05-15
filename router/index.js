
const express = require('express');
const router  = express.Router();

const path = require('path');
const {getPinCode} = require('../controllers/getPinCode');
const {getApplicant} = require('../controllers/getApplicant');
const {postApplicant} = require('../controllers/postApplicant');
const {sendSMS} = require('../utils/sendSMS');
const libs = require('../libs/api');

console.log('libs:', libs);

// additional middleware
libs.extendApp(router);

router.post('/applicant', (req, res, next) => {
	const {applicantEmail} = req.body;

	getApplicant(applicantEmail)
		.then(applicant => {
			if (applicant instanceof Error) {
				throw applicant;
			} else {
				// get new pin code
				let pinCode = getPinCode();
console.log('Verification Code::', pinCode);

				// create session (applicant data including pin number)
				req.session.applicant = {...applicant};
				req.session.applicant.pinCode = pinCode;

				// Send pin code via SMS
				// sendSMS(pinCode, applicant.ContactPhone, 'PIN');
				// .then(messageSid => messageSid)
				// .catch(err => err)

				// An error here will be because the app was unable to send a pin code to the applicants
				// mobile phone. Need to send back an appropriate error message to the front end application
				// requesting the applicant to try again.

				// send back response object WITHOUT pin code

console.log('NEW SESSION:', req.session)
				res.api(null, applicant);
			}
		})
		.catch(err => {
			let error;
			err.message ? error = err.message : error = err; 
			res.api(error); 
		})
});

router.use((req, res, next) => {
console.log('SESSION::', req.session);
	if (req.session.applicant) {
		next();
	} else {
		let error = 'Time to complete the registration process has expired. or has not started. Please click on the link in the registration email.';
		res.api(error);
	}
});

router.get('/newpin', (req, res, next) => {
	// user requests a new pin for whatever reason
	let pinCode = getPinCode();

console.log('Verification Code::', pinCode);
	// Send pin code via SMS

	// sendSMS(pinCode, applicant.ContactPhone, 'PIN');
	// .then(messageSid => messageSid)
	// .catch(err => err)

	// An error here will be because the app was unable to re-send a pin code to the applicants
	// mobile phone. Need to send back an appropriate error message to the front end application
	// requesting the applicant to try again.
	
	req.session.applicant.pinCode = pinCode;

	return res.api(null, {message: 'New verification code generated'});
});

router.post('/verify', (req, res, next) => {
	// if verified then update applicant record (address, mobile phone and registered/verified = true)
	// else throw error 
	const {pinCode} = req.body;
console.log('pinCode:', pinCode);

	if (req.session.applicant.pinCode != pinCode) {
		let error = 'Verification code input does not match!';
		return res.api(error);
	}

	postApplicant(req.session.applicant.Id) 
		.then((applicant) => {
			if (applicant instanceof Error) {
				throw applicant;
			} else {
				// Send Registration Complete message via SMS 
				// sendSMS(pinCode, applicant.ContactPhone, 'COMPLETE');
				// .then(messageSid => messageSid)
				// .catch(err => err)

				// An error here will be because the app was unable to send an SMS to the applicant informing
				// them that the registration process has completed successfully. Don't really need to send  
				// an error message to the front end application which also informs the applicant of successful completion.

				return res.api(null, applicant);
			}
		})
		.catch(err => {
			let error;
			err.message ? error = err.message : error = err; 
			res.api(error); 
		})
})

router.get('/verified', (req, res, next) => {
	delete req.session.applicant;
	return res.api(null, {message: 'Applicant verified!'});
});

module.exports = router;