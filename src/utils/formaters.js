function phoneFormater(phone) {
	let formatedPhone

	if (phone.length < 15) {
		formatedPhone = phone
			.replace(/\D/g, '')
			.replace(/(\d{2})(\d)/, '($1) $2')
			.replace(/(\d{4})(\d)/, '$1-$2')
			.replace(/(\d{4})/, '$1')
	} else {
		formatedPhone = phone
			.replace(/\D/g, '')
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
		return data.replace(/[^0-9]/g, '')
	} else return
}

function ISODateToTime(date) {
	const time = new Date(date)
	return `${time.getHours()}:${time.getMinutes()}`
}

function ISODateToDay(date) {
	const day = new Date(date)

	const days = [
		'domingo',
		'segunda-feira',
		'terça-feira',
		'quarta-feira',
		'quinta-feira',
		'sexta-feira',
		'sábado',
	]

	return days[day.getDay()]
}

function ISODateToDate(date) {
	const newDate = new Date(date)

	let day = newDate.getDate().toString()
	let month = (newDate.getMonth() + 1).toString()
	let year = newDate.getFullYear().toString()

	if (day.length === 1) {
		day = `0${day}`
	}

	if (month.length === 1) {
		month = `0${month}`
	}

	return `${day}/${month}/${year}`
}

function hourString(hour) {
	let [hours, min] = hour.split(':')

	if (hours.length === 1) {
		hours = `0${hours}`
	} else {
		hours.toString()
	}

	if (min.length === 1) {
		min = `0${min}`
	} else {
		min.toString()
	}

	return `${hours}:${min}`

}

function getMonthName(month) {
	const monthNames = [
		"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
		"Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
	];
	return monthNames[month];
}

function getDayName(day) {
	const dayNames = [
		'domingo', "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"
	];
	return dayNames[day];
}

function getFrequencyName(frequency) {

	switch (frequency) {
		case 'once':
			return 'Uma vez'

		case 'weekly':
			return 'Semanal'

		case 'biweekly':
			return 'Quinzenal'

		case 'monthly':
			return 'A cada 28 dias'

		default: return 'Algo deu errado...'
	}

}

export {
	cleanStr,
	cnpjFormater,
	phoneFormater,
	ISODateToTime,
	ISODateToDay,
	ISODateToDate,
	hourString,
	getMonthName,
	getDayName,
	getFrequencyName
}
