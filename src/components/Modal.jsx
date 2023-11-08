import style from '../../public/styles/components/modal.module.css'

// eslint-disable-next-line react/prop-types
const Modal = ({text, btn1, btn2, fn1, fn2}) => {
	return (
		<div className={style.background}>
			<div className={style.modalBox}>
				<span>{text}</span>
				<span>
					<button onClick={fn1} className="activeButton">
						{btn1}
					</button>
					<button onClick={fn2} className="dangerButton">
						{btn2}
					</button>
				</span>
			</div>
		</div>
	)
}

export default Modal
