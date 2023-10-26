function scheduleRange(range) {
	if (typeof range !== 'number') {
		return undefined
	}
	const dateNow = new Date()

	const minRange = new Date(dateNow.setUTCDate(dateNow.getUTCDate() + 1))
	// retorna uma nova data 2 meses depois da minRange
	const maxRange = new Date(
		new Date(minRange).setUTCMonth(minRange.getUTCMonth() + range),
	)

	return {minRange, maxRange}
}

function scheduleFiller(minRange, maxRange) {
	const date = new Date(minRange)
	const datesArray = []
	let id = 0

	while (date < maxRange) {
		const dateObj = {
			date: date.getDate(),
			month: date.getMonth(),
			year: date.getFullYear(),
			day: date.getDay(),
			id: id,
		}
		id++

		date.setDate(new Date(date).getDate() + 1)

		datesArray.push(dateObj)
	}

	return datesArray
}

export {scheduleRange, scheduleFiller}
