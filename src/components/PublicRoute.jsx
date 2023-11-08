import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ auth, children }) => {
	if (auth) {
		return <Navigate to="/schedules" replace />
	}

	return children
}

export default PublicRoute
