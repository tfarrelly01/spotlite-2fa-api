const Applicant = require('../models/Applicant');

exports.getApplicant = (id) => {
	return Applicant.findOne( {where: {ApplicantId: id}})
		.then((applicant) => {
			if (applicant === null) {
				throw new Error('Unknown User');
			} else {
				return applicant;
			}
		})
		.catch(err => err)
}