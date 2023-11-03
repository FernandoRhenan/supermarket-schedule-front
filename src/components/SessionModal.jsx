import { Link } from 'react-router-dom'
import style from '../../public/styles/components/sessionModal.module.css'
import Logout from '../hooks/Logout'

// eslint-disable-next-line react/prop-types
const SessionModal = ({ fnModal }) => {

	return (
		<div className={style.mainContainer}>
			<div onClick={fnModal}><Link style={{ textDecoration: 'none' }} to='/company'>Minha conta</Link></div>
			<Logout onClick={fnModal} />
		</div>
	)
}

export default SessionModal
