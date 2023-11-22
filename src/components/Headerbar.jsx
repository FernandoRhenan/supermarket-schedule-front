import { useState } from 'react'
import style from '../../public/styles/components/headerbar.module.css'
import { FaRegUserCircle, FaBars } from 'react-icons/fa'
import SessionModal from './SessionModal'

// eslint-disable-next-line react/prop-types
const Headerbar = ({ menuClick }) => {
	const [modal, setModal] = useState(false)
	const [activedMenu, setActivedMenu] = useState(true)

	function fnModal() {
		setModal(!modal)
	}

	return (
		<div className={style.mainContainer}>
			{modal && <SessionModal fnModal={fnModal} />}
			<div>
				{activedMenu ?
					<FaBars
						className={style.menuIcon}
						onClick={() => {
							setActivedMenu(!activedMenu)
							menuClick()
						}}
					/>
					:
					<FaBars
						className={style.menuIcon}
						style={{ transform: 'rotate(90deg)' }}
						onClick={() => {
							setActivedMenu(!activedMenu)
							menuClick()
						}}
					/>
				}
			</div>
			<div>
				<FaRegUserCircle
					className={style.profileIcon}
					onClick={() => setModal(!modal)}
				/>
			</div>
		</div>
	)
}

export default Headerbar
