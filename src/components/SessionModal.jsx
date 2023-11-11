import { Link } from 'react-router-dom'
import style from '../../public/styles/components/sessionModal.module.css'
import Logout from './Logout'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

// eslint-disable-next-line react/prop-types
const SessionModal = ({ fnModal }) => {

	const { isAdmin } = useContext(AuthContext)

	return (
		<div className={style.mainContainer}>
			<div onClick={fnModal}>

				{isAdmin ?
					<Link style={{ textDecoration: 'none' }} to="/adm/company">
						Minha conta
					</Link>
					: (
						<Link style={{ textDecoration: 'none' }} to="/company">
							Minha conta
						</Link>
					)}


			</div>
			<Logout onClick={fnModal} />
		</div>
	)
}

export default SessionModal
