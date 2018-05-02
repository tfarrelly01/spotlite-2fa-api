const Applicant = require('../models/Applicant');

exports.postApplicant = (applicantId, options) => {
	options = options || {};
		
	let {contactEmail} = options;

	return Applicant.findOne( {where: {ApplicantId: applicantId}})
		.then((applicant) => {
			if (applicant === null) {
				throw new Error('Applicant not found!');
			} else {
				return applicant.update({
					ContactName: 'Freddy Flintstone'
				})
					.then(data => data.dataValues)
					.catch(err => err)
			}
		})
		.catch(err => err)
}
