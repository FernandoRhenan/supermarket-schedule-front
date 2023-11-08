import { Link, useNavigate } from 'react-router-dom'
import style from '../../public/styles/pages/register-login.module.css'
import { cleanStr, cnpjFormater } from '../utils/formaters'
import { validateAll } from '../utils/validators/basicValidation'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import axios from '../utils/axios.js'
import Load from '../components/Load'
import defaultCatchError from '../utils/returnTypes/defaultCatchError'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
	const { setAuth } = useContext(AuthContext)

	const navigate = useNavigate()
	const [cnpj, setCnpj] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	async function handleSubmit(e) {
		e.preventDefault()

		const cleanCnpj = cleanStr({ data: cnpj, only: 'numbers' })
		const { error, message, state } = validateAll({
			cnpj: cleanCnpj,
			password: password,
		})

		if (error) {
			return toast[state](message)
		}

		try {
			setLoading(true)

			const {
				data: { data },
			} = await axios.post('/api/v1/company/login', {
				cnpj: cleanCnpj,
				password,
			})

			setAuth(true)
			localStorage.setItem('@Authtoken', JSON.stringify(data.token))

		} catch (error) {
			const { message, state, statusCode, data } = defaultCatchError(error)

			if (statusCode === 403) {
				navigate(`/send-email-validation?token=${data.token}`)
				toast[state](message)
			} else {
				toast[state](message)
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={style.mainContainer}>
			{loading && <Load />}

			<div className={style.formContainer}>
				<h1>Entrar</h1>
				<form className="defaultForm" onSubmit={handleSubmit}>
					<label>
						<span>CNPJ:</span>
						<input
							value={cnpj}
							onChange={({ target }) => setCnpj(cnpjFormater(target.value))}
							type="text"
							maxLength="18"
							className="defaultInput"
						/>
					</label>
					<label>
						<span>Senha:</span>
						<input
							value={password}
							type="password"
							onChange={({ target }) => setPassword(target.value)}
							className="defaultInput"
							maxLength="32"
						/>
					</label>
					<button className="defaultButton">Entrar</button>
				</form>

				<div className={style.link}>
					<span>Não tem cadastro? </span>
					<Link to="/register">Cadastrar</Link>
				</div>
			</div>
			<div className={style.imageContainer}></div>
		</div>
	)
}

export default Login
