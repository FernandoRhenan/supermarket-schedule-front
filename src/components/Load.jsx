import style from '../../public/styles/components/load.module.css'

const Load = () => {
	const date = new Date().getDate()

	return (
		<div className={style.background}>
			<div className={style.loadBox}>
				<img src={`../../public/animatedIcons/dia${date}.gif`} />
				<span>
					<b>Aguarde...</b>
				</span>
			</div>
		</div>
	)
}

export default Load
