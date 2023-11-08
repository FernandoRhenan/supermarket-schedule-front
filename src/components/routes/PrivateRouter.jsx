import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const PrivateRouter = ({ auth, isAdmin, children }) => {

	if (auth && !isAdmin) {
		return children
	}
	if (auth && isAdmin) {
		return <Navigate to="/adm/schedules" replace />
	}
	if (!auth) {
		return <Navigate to="/login" replace />
	}
}

export default PrivateRouter
