import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const PublicRouter = ({ auth, isAdmin, children }) => {

	if (!auth) {
		return children
	}
	if (auth && isAdmin) {
		return <Navigate to="/adm/schedules" replace />
	}
	if (auth && !isAdmin) {
		return <Navigate to="/schedules" replace />
	}

}

export default PublicRouter
