import defaultReturn from '../returnTypes/defaultReturn'

function compareTwoTypes({value1, value2, type}) {
	if (typeof value1 === type && typeof value2 === type) {
		return new defaultReturn({message: '', error: false, state: 'success'})
	} else {
		return new defaultReturn({
			message: 'Os dados enviados são inválidos',
			error: true,
			state: 'error',
		})
	}
}

function compareTwoValues({value1, value2}) {
	if (value1 == value2) {
		return new defaultReturn({message: '', error: false, state: 'success'})
	} else {
		return new defaultReturn({
			message: 'Os dados enviados são inválidos',
			error: true,
			state: 'error',
		})
	}
}

function compareTwoStrict({value1, value2, type, message}) {
	if (value1 === value2 && typeof value1 === type) {
		return new defaultReturn({message: '', error: false, state: 'success'})
	} else {
		return new defaultReturn({message, error: true, state: 'warning'})
	}
}

function compareOneType({value1, type}) {
	if (typeof value1 === type) {
		return new defaultReturn({message: '', error: false, state: 'success'})
	} else {
		return new defaultReturn({
			message: 'Os dados enviados são inválidos',
			error: true,
			state: 'error',
		})
	}
}

export {compareTwoTypes, compareTwoValues, compareTwoStrict, compareOneType}
