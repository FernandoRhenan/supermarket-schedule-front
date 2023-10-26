function defaultReturn({
	message = 'Ocorreu um erro, por favor tente novamente mais tarde',
	state = 'error',
	data = {},
	error = true,
}) {
	if (state !== 'error' && state !== 'success' && state !== 'warning') {
		state = 'error'
	}

	return {message, state, data, error}
}

export default defaultReturn
