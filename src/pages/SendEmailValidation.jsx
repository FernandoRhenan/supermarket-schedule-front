import Load from '../components/Load'
import { useEffect, useState } from 'react'
import axios from '../utils/axios.js'
import style from '../../public/styles/pages/SendEmailValidation.module.css'
import { useNavigate } from 'react-router-dom'
import defaultCatchError from '../utils/returnTypes/defaultCatchError'

const SendEmailValidation = () => {
	const navigate = useNavigate()
	const [message, setMessage] = useState('')
	const [sent, setSent] = useState(false)
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)

	async function sendEmail() {
		const urlParams = new URLSearchParams(window.location.search)
		const token = urlParams.get('token')

		try {
			setLoading(true)
			const response = await axios.post(
				'http://localhost:3000/api/v1/company/send-email-validation',
				{
					token,
				},
			)
			const { email } = response.data.data

			setMessage(email)
			setSent(true)
		} catch (error) {
			const { message, error: err } = defaultCatchError(error)

			setError(err)
			setMessage(message)
		} finally {
			setLoading(false)
		}
	}

	function redirectToLogin() {
		navigate('/login')
	}

	useEffect(() => {
		sendEmail()
	}, [])

	return (
		<div className={style.mainContainer}>
			{sent && !error && (
				<div className={style.sentEmailContainer}>
					<div className={style.sentEmailBox}>
						<h1>E-mail enviado!</h1>
						<span>
							Enviamos um e-mail de confirmação para: <b>{message}</b>
						</span>
					</div>
					<div className={style.reSendEmailBox}>
						<span>
							Reenviar em: <b>14:15</b>
						</span>
						<button onClick={sendEmail}>Reenviar</button>
					</div>
				</div>
			)}

			{error && (
				<div className={style.sentEmailContainer}>
					<div className={style.sentEmailBox}>
						<h1>O e-mail falhou :(</h1>
						<span>{message}</span>
					</div>
					<div className={style.tryAgainBox}>
						<button onClick={redirectToLogin}>Tentar novamente</button>
					</div>
				</div>
			)}

			{loading && <Load />}
		</div>
	)
}

export default SendEmailValidation
