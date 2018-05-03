const Applicant = require('../models/Applicant');

exports.postApplicant = (applicantId) => {
	return Applicant.findOne( {where: {Id: applicantId}})
		.then((applicant) => {
			if (applicant === null) {
				throw new Error('Applicant not found!');
			} else {
console.log('ID:::', applicantId);
				return applicant.update({
					Registered: 1
				})
					.then(data => data.dataValues)
					.catch(err => err)
			}
		})
		.catch(err => err)
}
