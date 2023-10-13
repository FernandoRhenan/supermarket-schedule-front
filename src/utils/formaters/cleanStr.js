function cleanStr({ data, only }) {

	if (only === 'letters') {
		return data.replace(/[^a-zA-Z]/g, '')
	} else if (only === 'numbers') {
		return (data.replace(/[^0-9]/g, ''))
	} else return
}

export default cleanStr
