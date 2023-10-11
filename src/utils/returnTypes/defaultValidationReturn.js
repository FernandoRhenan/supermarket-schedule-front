function defaultValidationReturn({ message, state, data, error }) {

	if (state !== 'error' && state !== 'success' && state !== 'warning') {
		state = 'error'
	}

	return { message, state, data, error }
}

export default defaultValidationReturn
