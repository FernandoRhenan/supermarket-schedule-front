import { useState, useEffect, useContext } from 'react'
import '../public/styles/app.css'
import Sidebar from './components/Sidebar.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import PrivatePages from './pages/PrivatePages'
import PublicPages from './pages/PublicPages'
import { AuthContext } from './context/AuthContext'

function App() {

	const { auth, setAuth } = useContext(AuthContext)
	console.log('app', auth)
	useEffect(() => {
		axios.create({
			// eslint-disable-next-line no-undef
			baseURL: 'http://localhost:3000/api/v1',
			timeout: 1000,
		});
	}, [])

	const [isAuth, setIsAuth] = useState(false)


	return (
		<div className="mainScreen">
			{isAuth && <Sidebar />}
			<ToastContainer autoClose={3000} />

			<PublicPages />

			{isAuth && <PrivatePages />}


		</div>
	)
}

export default App
