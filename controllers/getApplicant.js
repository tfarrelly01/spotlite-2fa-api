const Applicant = require('../models/Applicant');

exports.getApplicant = (contactEmail) => {
	return Applicant.findOne( {where: {ContactEmail: contactEmail}})
		.then((applicant) => {
			if (applicant === null) {
				throw new Error('Unknown User');
			} else {
				return applicant.dataValues;
			}
		})
		.catch(err => err)
}