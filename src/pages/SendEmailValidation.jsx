import { useParams } from 'react-router-dom'
import Load from '../components/Load'
import { useEffect, useState } from 'react'
import axios from 'axios'
import style from '../../public/styles/pages/SendEmailValidation.module.css'
import { toast } from 'react-toastify'


const SendEmailValidation = () => {

	const [message, setMessage] = useState('')
	const [sent, setSent] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);

		const token = urlParams.get('token');

		async function sendEmail() {
			try {
				setLoading(true)
				const response = await axios.post('http://localhost:3000/api/v1/company/send-email-validation', {
					token
				})

				const { message, state, error, data } = response.data

				setMessage(data)

				if (error) return toast[state](message)
				setSent(true)

			} catch (err) {
				const { message, error } = err.response.data

				if (error) {
					toast.error(message)
				} else {
					toast.error('Ocorreu um erro, por favor tente novamente mais tarde!')
				}
			} finally {
				setLoading(false)
			}
		}
		sendEmail()


	}, [])


	return (
		<div className={style.mainContainer}>
			{sent &&
				<div className={style.sentEmailContainer}>
					<div className={style.sentEmailBox}>
						<h1>E-mail enviado!</h1>
						<span>Enviamos um e-mail de confirmação para: <b>{message}</b></span>
					</div>
					<div className={style.reSendEmailBox}>
						<span >Reenviar em: <b>14:15</b></span>
						<button >Reenviar</button>
					</div>
				</div>
			}
			{loading && <Load />}
		</div>
	)
}

export default SendEmailValidation
