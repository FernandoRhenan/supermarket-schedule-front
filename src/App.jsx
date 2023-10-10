import { useState } from 'react'
import '../public/styles/app.css'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Sidebar from './components/sidebar/Sidebar.jsx'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
	const [isAuth, setIsAuth] = useState(false)

	return (
		<div className="mainScreen">
			{isAuth && <Sidebar />}

			<BrowserRouter>
				<Routes>
					<Route element={<Home />} path="/" />
					<Route element={<Register />} path="/register" />
					<Route element={<Login />} path="/login" />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
