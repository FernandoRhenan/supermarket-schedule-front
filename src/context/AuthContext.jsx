import { useState, createContext } from "react";

export const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
	const [auth, setAuth] = useState(false)

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider
