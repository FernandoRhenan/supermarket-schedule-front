import { useState, createContext, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
	const [auth, setAuth] = useState(false)

	useEffect(() => {
		if (typeof localStorage.getItem('@Authtoken') === 'string') {
			const token = JSON.parse(localStorage.getItem('@Authtoken'))
			axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
			setAuth(true)
		} else {
			setAuth(false)
		}
	}, [auth])

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
