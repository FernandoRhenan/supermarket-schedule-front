import { useState } from 'react'
import style from '../../public/styles/components/headerbar.module.css'
import { FaRegUserCircle } from 'react-icons/fa'
import SessionModal from './SessionModal'

// eslint-disable-next-line react/prop-types
const Headerbar = () => {

	const [modal, setModal] = useState(false)

	function fnModal() {
		setModal(!modal)
	}

	return (
		<div className={style.mainContainer}>
			{modal && <SessionModal fnModal={fnModal} />}
			<div></div>
			<div><FaRegUserCircle className={style.icon} onClick={() => setModal(!modal)} /></div>
		</div>
	)
}

export default Headerbar
