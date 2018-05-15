const Applicant = require('../models/Applicant');

exports.getApplicant = (contactEmail) => {
	return Applicant.findOne( {where: {ContactEmail: contactEmail}})
		.then((applicant) => {
			if (applicant === null) {
				throw new Error('Cannot find applicant');
			} else if (applicant.Registered === 1) {
				throw new Error('An applicant with this email address has already registered')
			} else {
				return applicant.dataValues;
			}
		})
		.catch(err => err)
}