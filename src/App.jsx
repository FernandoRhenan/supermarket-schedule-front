import { useEffect, useContext } from 'react'
import '../public/styles/app.css'

import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { AuthContext } from './context/AuthContext'
import DefaultRoutes from './components/DefaultRoutes'
import AdminRoutes from './components/AdminRoutes'


function App() {
	const { auth, isAdmin } = useContext(AuthContext)
	// const navite = useNavigate()

	useEffect(() => {
		axios.create({
			// eslint-disable-next-line no-undef
			baseURL: 'http://localhost:3000/api/v1',
			timeout: 1000,
		})

	}, [])


	return (
		<>
			{isAdmin ?
				<AdminRoutes auth={auth} />
				:
				<DefaultRoutes auth={auth} />
			}
		</>

	)
}

export default App
