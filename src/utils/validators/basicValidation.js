import defaultValidationReturn from '../returnTypes/defaultValidationReturn.js'

function validateAll({ password, name, email, cnpj, phone, altPhone }) {
	const _password = validatePassword(password)
	const _name = validateName(name)
	const _email = validateEmail(email)
	const _cnpj = validateCnpj(cnpj)
	const _phone = validatePhone(phone)
	const _altPhone = validateAltPhone(altPhone)

	if (_password.error || _name.error || _email.error || _cnpj.error || _phone.error || _altPhone.error) {

		const array = [_cnpj, _name, _email, _phone, _altPhone, _password]

		const { message, error, state } = array.find(item => item.error === true)

		return defaultValidationReturn({ message, error, state })
	} else {
		return defaultValidationReturn({ message: '', error: false, state: 'success' })
	}

}


function validatePassword(password) {
	// RegEx que permite apenas a-z A-Z 0-9 ! @ # $ % & * ( )
	// .test() retorna um boolean indicando se a password passada está de acordo com as regras do RegEx.
	const passwordRegex = /^[a-zA-Z0-9!@#$%&*()\s]{6,32}$/.test(password)
	// OBS: passwordRegex está permitindo espaços em branco " ".
	if (password.length === 0) {
		return defaultValidationReturn({ message: 'Preencha o campo senha', error: true, state: 'warning' })
	} else if (password.length < 6) {
		return defaultValidationReturn({ message: 'A senha deve conter pelo menos 6 caracteres', error: true, state: 'warning' })
	} else if (password.length > 32) {
		return defaultValidationReturn({ message: 'A senha não pode conter mais que 32 caracteres', error: true, state: 'warning' })
	} else if (!passwordRegex) {
		return defaultValidationReturn({ message: 'Há caracteres não permitidos na senha', error: true, state: 'warning' })
	} else {
		return defaultValidationReturn({ message: '', error: false, state: 'success' })
	}
}

function validateName(name) {
	const nameRegex = /^[a-zA-Z0-9\s]+$/.test(name)

	if (name.length === 0) {
		return defaultValidationReturn({ message: 'Preecha o campo de nome', error: true, state: 'warning' })
	} else if (name.length < 2) {
		return defaultValidationReturn({ message: 'O nome deve conter pelo menos 2 caracteres', error: true, state: 'warning' })
	} else if (name.length > 26) {
		return defaultValidationReturn({ message: 'O nome não pode conter mais que 26 caracteres', error: true, state: 'warning' })
	} else if (!nameRegex) {
		return defaultValidationReturn({ message: 'Há caracteres não permitidos no nome', error: true, state: 'warning' })
	} else {
		return defaultValidationReturn({ message: '', error: false, state: 'success' })
	}
}

function validateEmail(email) {
	const emailRegex = /^[a-zA-Z0-9.-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,4}$/.test(email)
	if (email.length === 0) {
		return defaultValidationReturn({ message: 'Preencha o campo E-mail', error: true, state: 'warning' })
	} else if (email.length < 8) {
		return defaultValidationReturn({ message: 'O email deve conter pelo menos 8 caracteres', error: true, state: 'warning' })
	} else if (email.length > 50) {
		return defaultValidationReturn({ message: 'O email não pode conter mais que 50 caracteres', error: true, state: 'warning' })
	} else if (!emailRegex) {
		return defaultValidationReturn({ message: 'O email está mal formatado ou contém caracteres não permitidos', error: true, state: 'warning' })
	} else {
		return defaultValidationReturn({ message: '', error: false, state: 'success' })
	}
}

function validateCnpj(cnpj) {
	const cnpjRegex = /^[0-9]{14}$/.test(cnpj)
	if (cnpj.length === 0) {
		return defaultValidationReturn({ message: 'Preencha o campo CNPJ', error: true, state: 'warning' })
	} else if (cnpj.length !== 14) {
		return defaultValidationReturn({ message: 'O CNPJ deve conter 14 números', error: true, state: 'warning' })
	} else if (!cnpjRegex) {
		return defaultValidationReturn({ message: 'O campo CNPJ aceita apenas números', error: true, state: 'warning' })
	} else {
		return defaultValidationReturn({ message: '', error: false, state: 'success' })
	}
}

function validatePhone(phone) {
	const phoneRegex = /^[0-9]+$/.test(phone)

	if (phone.length === 0) {
		return new defaultValidationReturn({ message: 'Preencha o campo telefone', error: true, state: 'warning' })
	} else if (phone.length > 11) {
		return defaultValidationReturn({ message: 'O telefone não pode conter mais que 11 números', error: true, state: 'warning' })
	} else if (phone.length < 10) {
		return defaultValidationReturn({ message: 'O telefone deve conter pelo menos 10 números', error: true, state: 'warning' })
	} else if (!phoneRegex) {
		return defaultValidationReturn({ message: 'O campo telefone aceita apenas números', error: true, state: 'warning' })
	} else {
		return defaultValidationReturn({ message: '', error: false, state: 'success' })
	}
}

function validateAltPhone(altPhone) {
	const altPhoneRegex = /^[0-9]+$/.test(altPhone)

	if (altPhone.length === 0) {
		return new defaultValidationReturn({ message: 'Preencha o campo telefone secundário', error: true, state: 'warning' })
	} else if (altPhone.length > 11) {
		return defaultValidationReturn({ message: 'O telefone secundário não pode conter mais que 11 números', error: true, state: 'warning' })
	} else if (altPhone.length < 10) {
		return defaultValidationReturn({ message: 'O telefone secundário deve conter pelo menos 10 números', error: true, state: 'warning' })
	} else if (!altPhoneRegex) {
		return defaultValidationReturn({ message: 'O campo telefone secundário aceita apenas números', error: true, state: 'warning' })
	} else {
		return defaultValidationReturn({ message: '', error: false, state: 'success' })
	}
}

export { validateAll, validateCnpj, validateEmail }
