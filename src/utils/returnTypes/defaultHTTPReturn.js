// Can be used to retuns a successful external request (HTTP request)

function defaultHTTPReturn({ statusCode = 0, message = '', error = false, data = {}, state = 'error' }) {

	return { statusCode, error, message, data, state }
}

export default defaultHTTPReturn
