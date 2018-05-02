const express = require('express');
const router  = express.Router();

const {getPinCode} = require('../controllers/getPinCode');
const {getApplicant} = require('../controllers/getApplicant');
const {sendSMS} = require('../utils/sendSMS');

router.post('/applicant', (req, res, next) => {
	const {applicantEmail, phoneNumber} = req.body;

	getApplicant(applicantEmail)
		.then(applicant => {
			if (applicant instanceof Error) {
				throw applicant;
			} else {
				// get new pin code
				applicant.pinCode = getPinCode();
				applicant.phoneNumber = phoneNumber;

				// create user session (user data including pin number)
				req.session.applicant = applicant;

				console.log('req.session.id:', req.session.id);
				console.log('req.session::', req.session);

				// TEXT PIN CODE HERE !!!
				// sendSMS(applicant.pinCode, phoneNumber);

				// send back response object
				return res.status(200).json({applicant});
			}
		})
		.catch(err => {
			let error;
			err.message ? error = err.message : error = err; 
			return res.status(500).json({error});
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
	// user requests a new pin for whatever reason
	req.session.applicant.pinCode = getPinCode();

	// TEXT PIN CODE HERE !!!
	// sendSMS(req.session.applicant.pinCode, req.session.applicant.phoneNumber);
	
	const applicant = req.session.applicant;
	return res.status(200).json({applicant});
});

router.post('/verified', (req, res, next) => {
	// here check applicant and pin number match req.body
	// if verified then update applicant record (address, mobile phone and registered/verified = true)
	// else throw error 
	return res.status(200).json({message: 'New Route'});
})

router.get('/reset', (req, res, next) => {
	delete req.session.applicant;
	return res.status(200).json({message: 'Session deleted!'});
});

module.exports = router;