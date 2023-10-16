import defaultHTTPReturn from './defaultHTTPReturn'

function defaultCatchError(error) {

	if (error.message === 'Network Error') {
		return defaultHTTPReturn({ message: 'Erro de conexão', state: 'error', error: true, statusCode: 500 })
	}
	// eslint-disable-next-line no-case-declarations
	const { message, error: err, state, statusCode, data } = error.response.data

	if (err) {
		return defaultHTTPReturn({ message, state, error: err, statusCode, data: data })
	} else {
		return defaultHTTPReturn({ message: 'Ocorreu um erro, por favor tente novamente mais tarde!', state: 'error', error: true, statusCode: 500 })
	}
}

export default defaultCatchError
