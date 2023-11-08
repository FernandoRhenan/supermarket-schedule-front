import {Navigate} from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const AdminRouter = ({auth, isAdmin, children}) => {
	if (auth && isAdmin) {
		return children
	}
	if (auth && !isAdmin) {
		return <Navigate to="/schedules" replace />
	}
	if (!auth) {
		return <Navigate to="/login" replace />
	}
}

export default AdminRouter
