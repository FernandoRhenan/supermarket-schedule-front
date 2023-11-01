import defaultReturn from '../returnTypes/defaultReturn.js'

function validateAll({ password = null, name = null, email = null, cnpj = null, phone = null, altPhone = null }) {
	const _password = typeof password === 'string' ? validatePassword(password) : false
	const _name = typeof name === 'string' ? validateName(name) : false
	const _email = typeof email === 'string' ? validateEmail(email) : false
	const _cnpj = typeof cnpj === 'string' ? validateCnpj(cnpj) : false
	const _phone = typeof phone === 'string' ? validatePhone(phone) : false
	const _altPhone =
		typeof altPhone === 'string' ? validateAltPhone(altPhone) : false

	if (
		_password?.error ||
		_name?.error ||
		_email?.error ||
		_cnpj?.error ||
		_phone?.error ||
		_altPhone?.error
	) {
		const array = [_cnpj, _name, _email, _phone, _altPhone, _password]

		const { message, error, state } = array.find((item) => item.error === true)

		return defaultReturn({ message, error, state })
	} else {
		return defaultReturn({ message: '', error: false, state: 'success' })
	}
}

function validatePassword(password) {
	// RegEx que permite apenas a-z A-Z 0-9 ! @ # $ % & * ( )
	// .test() retorna um boolean indicando se a password passada está de acordo com as regras do RegEx.
	const passwordRegex = /^[a-zA-Z0-9!@#$%&*()\s]{6,32}$/.test(password)
	// OBS: passwordRegex está permitindo espaços em branco " ".

	if (password.length === 0) {
		return defaultReturn({
			message: 'Preencha o campo senha',
			error: true,
			state: 'warning',
		})
	} else if (password.length < 6) {
		return defaultReturn({
			message: 'A senha deve conter pelo menos 6 caracteres',
			error: true,
			state: 'warning',
		})
	} else if (password.length > 32) {
		return defaultReturn({
			message: 'A senha não pode conter mais que 32 caracteres',
			error: true,
			state: 'warning',
		})
	} else if (!passwordRegex) {
		return defaultReturn({
			message: 'Há caracteres não permitidos na senha',
			error: true,
			state: 'warning',
		})
	} else {
		return defaultReturn({ message: '', error: false, state: 'success' })
	}
}

function validateName(name) {
	const nameRegex = /^[a-zA-Z0-9\s]+$/.test(name)

	if (name.length === 0) {
		return defaultReturn({
			message: 'Preecha o campo de nome',
			error: true,
			state: 'warning',
		})
	} else if (name.length < 2) {
		return defaultReturn({
			message: 'O nome deve conter pelo menos 2 caracteres',
			error: true,
			state: 'warning',
		})
	} else if (name.length > 26) {
		return defaultReturn({
			message: 'O nome não pode conter mais que 26 caracteres',
			error: true,
			state: 'warning',
		})
	} else if (!nameRegex) {
		return defaultReturn({
			message: 'Há caracteres não permitidos no nome',
			error: true,
			state: 'warning',
		})
	} else {
		return defaultReturn({ message: '', error: false, state: 'success' })
	}
}

function validateEmail(email) {
	const emailRegex =
		/^[a-zA-Z0-9.-]{2,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,4}$/.test(email)
	if (email.length === 0) {
		return defaultReturn({
			message: 'Preencha o campo E-mail',
			error: true,
			state: 'warning',
		})
	} else if (email.length < 8) {
		return defaultReturn({
			message: 'O email deve conter pelo menos 8 caracteres',
			error: true,
			state: 'warning',
		})
	} else if (email.length > 50) {
		return defaultReturn({
			message: 'O email não pode conter mais que 50 caracteres',
			error: true,
			state: 'warning',
		})
	} else if (!emailRegex) {
		return defaultReturn({
			message: 'O email está mal formatado ou contém caracteres não permitidos',
			error: true,
			state: 'warning',
		})
	} else {
		return defaultReturn({ message: '', error: false, state: 'success' })
	}
}

function validateCnpj(cnpj) {
	const cnpjRegex = /^[0-9]{14}$/.test(cnpj)
	if (cnpj.length === 0) {
		return defaultReturn({
			message: 'Preencha o campo CNPJ',
			error: true,
			state: 'warning',
		})
	} else if (cnpj.length !== 14) {
		return defaultReturn({
			message: 'O CNPJ deve conter 14 números',
			error: true,
			state: 'warning',
		})
	} else if (!cnpjRegex) {
		return defaultReturn({
			message: 'O campo CNPJ aceita apenas números',
			error: true,
			state: 'warning',
		})
	} else {
		return defaultReturn({ message: '', error: false, state: 'success' })
	}
}

function validatePhone(phone) {
	const phoneRegex = /^[0-9]+$/.test(phone)

	if (phone.length === 0) {
		return new defaultReturn({
			message: 'Preencha o campo telefone',
			error: true,
			state: 'warning',
		})
	} else if (phone.length > 11) {
		return defaultReturn({
			message: 'O telefone não pode conter mais que 11 números',
			error: true,
			state: 'warning',
		})
	} else if (phone.length < 10) {
		return defaultReturn({
			message: 'O telefone deve conter pelo menos 10 números',
			error: true,
			state: 'warning',
		})
	} else if (!phoneRegex) {
		return defaultReturn({
			message: 'O campo telefone aceita apenas números',
			error: true,
			state: 'warning',
		})
	} else {
		return defaultReturn({ message: '', error: false, state: 'success' })
	}
}

function validateAltPhone(altPhone) {
	const altPhoneRegex = /^[0-9]+$/.test(altPhone)

	if (altPhone.length === 0) {
		return new defaultReturn({
			message: 'Preencha o campo telefone secundário',
			error: true,
			state: 'warning',
		})
	} else if (altPhone.length > 11) {
		return defaultReturn({
			message: 'O telefone secundário não pode conter mais que 11 números',
			error: true,
			state: 'warning',
		})
	} else if (altPhone.length < 10) {
		return defaultReturn({
			message: 'O telefone secundário deve conter pelo menos 10 números',
			error: true,
			state: 'warning',
		})
	} else if (!altPhoneRegex) {
		return defaultReturn({
			message: 'O campo telefone secundário aceita apenas números',
			error: true,
			state: 'warning',
		})
	} else {
		return defaultReturn({ message: '', error: false, state: 'success' })
	}
}

export { validateAll, validatePassword }
