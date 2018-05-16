const Applicant = require('../models/Applicant');

exports.postApplicant = (applicantId, applicantData) => {
	return Applicant.findOne( {where: {Id: applicantId}})
		.then((applicant) => {
			if (applicant === null) {
				throw new Error('Applicant not found!');
			} else {
				return applicant.update({
					ContactSurname: applicantData.ContactSurname,
					ContactMiddleName: applicantData.ContactMiddleName,
					ContactForename: applicantData.ContactForename,
//					ContactAddrCountryId: applicantData.ContactAddrCountryId,
					ContactEmail: applicantData.ContactEmail,
					ContactPhone: applicantData.ContactPhone,
					ContactAddr1: applicantData.ContactAddr1,
					ContactAddr2: applicantData.ContactAddr2,
					ContactAddr3: applicantData.ContactAddr3,
					ContactCity: applicantData.ContactCity,
					ContactState: applicantData.ContactState,
					ContactPostCode: applicantData.ContactPostCode,
					Registered: 1
				})
					.then(data => data.dataValues)
					.catch(err => err);
			}
		})
		.catch(err => err)
}