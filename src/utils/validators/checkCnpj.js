import defaultValidationReturn from '../returnTypes/defaultValidationReturn.js'

function checkCnpj(cnpj) {

	const onlyNumbers = cnpj.replace(/[^0-9]/g, '')

	if (onlyNumbers.length !== 14) {
		return defaultValidationReturn({ message: 'Preencha o CNPJ', state: 'warning', error: true })
	}

	return defaultValidationReturn({ message: '', state: 'success', data: onlyNumbers, error: false })

}

export default checkCnpj
