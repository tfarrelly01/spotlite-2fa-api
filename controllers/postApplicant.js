const Applicant = require('../models/Applicant');

exports.postApplicant = (applicantData) => {
	return Applicant.findOne( {where: {Id: applicantData.Id}})
		.then((applicant) => {
			if (applicant === null) {
				throw new Error('Applicant not found!');
			} else {
				return applicant.update({
					ContactSurname: applicantData.ContactSurname,
					ContactMiddleName: applicantData.ContactMiddleName,
					ContactForename: applicantData.Contact.Forename,
					ContactAddrCountryId: applicantData.ContactAddrCountryId,
					ContactEmail: applicantData.ContactEmail,
					ContactPhone: applicantData.ContactPhone,
					ContactAddrLine1: applicantData.ContactAddr1,
					ContactAddrLine2: applicantData.ContactAddr2,
					ContactAddrLine3: applicantData.ContactAddr3,
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