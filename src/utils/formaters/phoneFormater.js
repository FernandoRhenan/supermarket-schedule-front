function phoneFormater(phone) {

	let formatedPhone;

	if (phone.length < 15) {
		formatedPhone = phone.replace(/\D/g, '')
			.replace(/(\d{2})(\d)/, '($1) $2')
			.replace(/(\d{4})(\d)/, '$1-$2')
			.replace(/(\d{4})/, '$1')
	} else {
		formatedPhone = phone.replace(/\D/g, '')
			.replace(/(\d{2})(\d)/, '($1) $2')
			.replace(/(\d{5})(\d)/, '$1-$2')
			.replace(/(\d{4})/, '$1')
	}

	return formatedPhone
}

export default phoneFormater
