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

export default cnpjFormater
