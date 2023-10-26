import style from '../../public/styles/pages/sendEmailValidation.module.css'
import Load from '../components/Load'
import axios from '../utils/axios.js'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import defaultCatchError from '../utils/returnTypes/defaultCatchError'
import { AuthContext } from '../context/AuthContext'

const EmailValidation = () => {
	const { setAuth } = useContext(AuthContext)

	const navigate = useNavigate()
	const [message, setMessage] = useState('')
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)

	function redirectToLogin() {
		navigate('/login')
	}

	useEffect(() => {
		async function confirmEmail() {
			try {
				setLoading(true)
				const urlParams = new URLSearchParams(window.location.search)

				const token = urlParams.get('token')

				const response = await axios.patch(
					'http://localhost:3000/api/v1/company/confirm-email',
					{
						token,
					},
				)

				const { message, state, error, data } = response.data

				if (!error && state === 'success') {
					setAuth(true)
					localStorage.setItem('@Authtoken', JSON.stringify(data.token))
				} else {
					setMessage(message)
					setError(true)
				}
			} catch (error) {
				const { message, error: err } = defaultCatchError(error)

				setError(err)
				setMessage(message)
			} finally {
				setLoading(false)
			}
		}
		confirmEmail()
	}, [setAuth])

	return (
		<div className={style.mainContainer}>
			{error && (
				<div className={style.sentEmailContainer}>
					<div className={style.sentEmailBox}>
						<h1>Oh não! Ocorreu um erro na validação...</h1>
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

export default EmailValidation
