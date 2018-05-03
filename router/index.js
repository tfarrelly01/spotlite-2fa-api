
const express = require('express');
const router  = express.Router();

const {getPinCode} = require('../controllers/getPinCode');
const {getApplicant} = require('../controllers/getApplicant');
const {postApplicant} = require('../controllers/postApplicant');
const {sendSMS} = require('../utils/sendSMS');

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
				// sendSMS(pinCode, applicant.ContactPhone);

				// send back response object WITHOUT pin code
				return res.status(200).json({applicant});
			}
		})
		.catch(err => {
			let error;
			err.message ? error = err.message : error = err; 
			return res.json({error});
		})
});

router.use((req, res, next) => {
	if (!req.session.applicant) {
		res.json({error: 'Time to complete the registration process has expired. or has not started. Please click on the link in the registration email.'});
	} else {
		next();
	}
});

router.get('/newpin', (req, res, next) => {
	const {phoneNumber} = req.body;
	// user requests a new pin for whatever reason
	let pinCode = getPinCode();

	// TEXT PIN CODE HERE !!!
	// sendSMS(pinCode, phoneNumber);
	
	req.session.applicant.pinCode = pinCode;

	return res.status(200).json({message: 'New verification code generated'});
});

router.post('/verify', (req, res, next) => {
	// if verified then update applicant record (address, mobile phone and registered/verified = true)
	// else throw error 
	const {pinCode} = req.body;

	if (req.session.applicant.pinCode != pinCode) {
		return res.json({error: 'Verification code input does not match!'})
	}

	postApplicant(req.session.applicant.Id) 
		.then((applicant) => {
			if (applicant instanceof Error) {
				throw applicant;
			} else {
				// Do we send a success text via SMS if so need to refactor sendSMS function??
				// sendSMS(pinCode, applicant.ContactPhone);

				return res.status(200).json({applicant});
			}
		})
		.catch(error => res.json({Error}));

})

router.get('/verified', (req, res, next) => {
	delete req.session.applicant;
	return res.status(200).json({message: 'Applicant verified!'});
});

module.exports = router;