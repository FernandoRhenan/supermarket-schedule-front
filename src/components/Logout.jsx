import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import {FaSignInAlt} from 'react-icons/fa'

function Logout() {
	const {setAuth} = useContext(AuthContext)

	const handleLogout = () => {
		localStorage.clear()
		setAuth(false)
	}

	return (
		<div onClick={handleLogout}>
			Sair <FaSignInAlt />
		</div>
	)
}

export default Logout
