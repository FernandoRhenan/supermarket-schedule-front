import Load from '../components/Load'
import { useEffect, useState } from 'react'
import axios from 'axios'
import style from '../../public/styles/pages/emailValidation.module.css'

const EmailValidation = () => {

	const [message, setMessage] = useState('')
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);

		const token = urlParams.get('token');

		async function confirmEmail() {
			try {
				setLoading(true)
				const response = await axios.patch('http://localhost:3000/api/v1/company/confirm-email', {
					token
				})

				const { message, state, error, data } = response.data

				if (!error && state === 'success') {

					return data
					//ContextProvider

				} else {
					setMessage(message)
					setError(true)
				}

			} catch (err) {
				const { message, error } = err.response.data

				if (error) {
					setMessage(message)
					setError(true)
				} else {
					setMessage('Ocorreu um erro, por favor tente novamente mais tarde')
					setError(true)
				}

			} finally {
				setLoading(false)
			}
		}
		confirmEmail()

	}, [])


	return (
		<div className={style.mainContainer}>
			{error &&
				<div className={style.messageContainer}>
					<h1>Oh não! Algo inesperado aconteceu...</h1>
					<span>{message}</span>
				</div>
			}
			{loading && <Load />}
		</div>
	)
}

export default EmailValidation
