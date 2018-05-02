const express = require('express');
const router  = express.Router();

const {getPinCode} = require('../controllers/getPinCode');
const {getApplicant} = require('../controllers/getApplicant');

router.get('/applicant', (req, res, next) => {
	const applicantEmail = req.query.ContactEmail;

	getApplicant(applicantEmail)
		.then(applicant => {
			if (applicant instanceof Error) {
	//			console.log('applicant::', applicant);
					throw applicant;
			} else {
					// get new pin code
					applicant.pinCode = getPinCode();
					console.log('applicant::', applicant);

					// create user session (user data including pin number)
					req.session.applicant = applicant;

					// TEXT PIN CODE HERE !!!

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

router.get('/newpin', (req, res, next) => {
	if (req.session.applicant) {
		// user requests a new pin for whatever reason
		req.session.applicant.pinCode = getPinCode();

		// TEXT PIN CODE HERE !!!
		
		const applicant = req.session.applicant;
		return res.status(200).json({applicant});
	} else {
		res.json({error: 'Time to complete the registration process has expired. or has not started. Please click on the link in the registration email.'});
	}
});

router.post('/verified', (req, res, next) => {
	// here check applicant and pin number match req.body
	// if verified then update applicant record (address, mobile phone and registered/verified = true)
	// else throw error 
})

router.get('/reset', (req, res, next) => {
	if (req.session.applicant) {
		delete req.session.applicant;
		return res.status(200).json({message: 'Session deleted!'});
	} else {
		res.json({error: 'Registration process not started.'});		
	}
});

module.exports = router;