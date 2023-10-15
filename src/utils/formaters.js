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

function cnpjFormater(cnpj) {

	const formatedCnpj = cnpj
		.replace(/\D/g, '')
		.replace(/(\d{2})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1/$2')
		.replace(/(\d{4})(\d)/, '$1-$2')
		.replace(/(\d{2})/, '$1')

	return formatedCnpj

}

function cleanStr({ data, only }) {

	if (only === 'letters') {
		return data.replace(/[^a-zA-Z]/g, '')
	} else if (only === 'numbers') {
		return (data.replace(/[^0-9]/g, ''))
	} else return
}


export { cleanStr, cnpjFormater, phoneFormater }
