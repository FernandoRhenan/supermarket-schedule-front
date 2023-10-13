import { useState, useEffect } from 'react'
import '../public/styles/app.css'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Sidebar from './components/Sidebar.jsx'
import Register from './pages/Register'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import SendEmailValidation from './pages/SendEmailValidation'

function App() {

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

			<BrowserRouter>
				<ToastContainer autoClose={3000} />
				<Routes>
					<Route element={<Home />} path="/" />
					<Route element={<Register />} path="/register" />
					<Route element={<Login />} path="/login" />
					<Route element={<SendEmailValidation />} path="/send-email-validation/:email/:id" />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
