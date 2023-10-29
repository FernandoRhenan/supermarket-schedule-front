import { useEffect, useContext } from 'react'
import '../public/styles/app.css'
import Sidebar from './components/Sidebar.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { AuthContext } from './context/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import EmailValidation from './pages/EmailValidation'
import Schedules from './pages/Schedules'
import SendEmailValidation from './pages/SendEmailValidation'
import Register from './pages/register/Register'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import Headerbar from './components/Headerbar'
import NewSchedule from './pages/NewSchedule'
import Company from './pages/Company'

function App() {
	const { auth } = useContext(AuthContext)

	useEffect(() => {
		axios.create({
			// eslint-disable-next-line no-undef
			baseURL: 'http://localhost:3000/api/v1',
			timeout: 1000,
		})
	}, [])

	return (
		<div className="topScreen">
			<BrowserRouter>
				{auth && <Headerbar />}
				<div className="mainScreen">
					{auth && <Sidebar />}
					<ToastContainer autoClose={3000} />

					<Routes>
						<Route
							path="/login"
							element={
								<PublicRoute auth={auth}>
									<Login />
								</PublicRoute>
							}
						/>
						<Route
							path="/send-email-validation"
							element={
								<PublicRoute auth={auth}>
									<SendEmailValidation />
								</PublicRoute>
							}
						/>
						<Route
							path="/email-validation"
							element={
								<PublicRoute auth={auth}>
									<EmailValidation />
								</PublicRoute>
							}
						/>
						<Route
							path="/register"
							element={
								<PublicRoute auth={auth}>
									<Register />
								</PublicRoute>
							}
						/>
						<Route
							path="/schedules"
							element={
								<PrivateRoute auth={auth}>
									<Schedules />
								</PrivateRoute>
							}
						/>
						<Route
							path="/new-schedule"
							element={
								<PrivateRoute auth={auth}>
									<NewSchedule />
								</PrivateRoute>
							}
						/>
						<Route
							path="/company"
							element={
								<PrivateRoute auth={auth}>
									<Company />
								</PrivateRoute>
							}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	)
}

export default App
