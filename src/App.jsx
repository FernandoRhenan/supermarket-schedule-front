import {useEffect, useContext} from 'react'
import '../public/styles/app.css'

import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import {AuthContext} from './context/AuthContext'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Headerbar from './components/Headerbar'
import Sidebar from './components/Sidebar'
import {ToastContainer} from 'react-toastify'
import PrivateRouter from './components/routes/PrivateRouter'
import Schedules from './pages/Schedules'
import NewSchedule from './pages/NewSchedule'
import Company from './pages/Company'
import PublicRouter from './components/routes/PublicRouter'
import Login from './pages/Login'
import SendEmailValidation from './pages/SendEmailValidation'
import EmailValidation from './pages/EmailValidation'
import Register from './pages/register/Register'
import AdminRouter from './components/routes/AdminRouter'
import AdmSchedules from './pages/adm/AdmSchedules'
import AdmCompanies from './pages/adm/AdmCompanies'

function App() {
	const {auth, isAdmin} = useContext(AuthContext)
	// const navite = useNavigate()

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
					{auth && <Sidebar isAdmin={isAdmin} />}
					<ToastContainer autoClose={3000} />

					<Routes>
						<Route
							path="/schedules"
							element={
								<PrivateRouter auth={auth} isAdmin={isAdmin}>
									<Schedules />
								</PrivateRouter>
							}
						/>
						<Route
							path="/new-schedule"
							element={
								<PrivateRouter auth={auth} isAdmin={isAdmin}>
									<NewSchedule />
								</PrivateRouter>
							}
						/>
						<Route
							path="/company"
							element={
								<AdminRouter auth={auth} isAdmin={isAdmin}>
									<Company />
								</AdminRouter>
							}
						/>

						<Route
							path="/login"
							element={
								<PublicRouter auth={auth} isAdmin={isAdmin}>
									<Login />
								</PublicRouter>
							}
						/>
						<Route
							path="/send-email-validation"
							element={
								<PublicRouter auth={auth} isAdmin={isAdmin}>
									<SendEmailValidation />
								</PublicRouter>
							}
						/>
						<Route
							path="/email-validation"
							element={
								<PublicRouter auth={auth} isAdmin={isAdmin}>
									<EmailValidation />
								</PublicRouter>
							}
						/>
						<Route
							path="/register"
							element={
								<PublicRouter auth={auth} isAdmin={isAdmin}>
									<Register />
								</PublicRouter>
							}
						/>

						<Route
							path="/adm/schedules"
							element={
								<AdminRouter auth={auth} isAdmin={isAdmin}>
									<AdmSchedules />
								</AdminRouter>
							}
						/>

						<Route
							path="/adm/companies"
							element={
								<AdminRouter auth={auth} isAdmin={isAdmin}>
									<AdmCompanies />
								</AdminRouter>
							}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	)
}

export default App
