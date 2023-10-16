import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {

	const [auth, setAuth] = useState(false)

	useEffect(() => {
		if (typeof localStorage.getItem('@Authtoken') === 'string') {
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
