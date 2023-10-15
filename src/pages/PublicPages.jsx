import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Register from './register/Register'
import Login from './Login'
import SendEmailValidation from './SendEmailValidation'
import EmailValidation from './EmailValidation'

const PublicPages = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<Register />} path="/register" />
					<Route element={<Login />} path="/login" />
					<Route element={<SendEmailValidation />} path="/send-email-validation" />
					<Route element={<EmailValidation />} path="/email-validation" />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default PublicPages
