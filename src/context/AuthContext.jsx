import {useState, createContext, useEffect} from 'react'
import axios from 'axios'

export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
function AuthProvider({children}) {
	const [auth, setAuth] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)

	useEffect(() => {
		if (typeof localStorage.getItem('@Authtoken') === 'string') {
			const token = JSON.parse(localStorage.getItem('@Authtoken'))
			axios.defaults.headers.common = {Authorization: `Bearer ${token}`}
			const tokenIsAdmin = JSON.parse(atob(token.split('.')[1])).isAdmin
			setIsAdmin(tokenIsAdmin)
			setAuth(true)
		} else {
			setAuth(false)
			setIsAdmin(false)
		}
	}, [auth, isAdmin])

	return (
		<AuthContext.Provider value={{auth, setAuth, isAdmin}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
