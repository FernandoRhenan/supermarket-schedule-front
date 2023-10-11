import style from '../../public/styles/pages/register-login.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import cnpjFormater from '../utils/formaters/cnpjFormater.js'
import { toast } from 'react-toastify'
import axios from 'axios'
import checkCnpj from '../utils/validators/checkCnpj'

const Register = () => {

	const [cnpj, setCnpj] = useState('')

	async function handleSubmitVerifyCnpj(e) {
		e.preventDefault()

		const { error, data, message, state } = checkCnpj(cnpj)
		if (error) {
			toast[state](message)
		} else {

			try {
				const response = await axios.get(`http://localhost:3000/api/v1/company/check-cnpj/${data}`)

				const { name, email, phone, cnpj } = response.data.data



			} catch (err) {

				const { message, error } = err.response.data

				if (error) {
					toast.error(message)
				} else {
					toast.error('Ocorreu um erro, por favor tente novamente mais tarde!')
				}

			}

		}

	}

	return <div className={style.mainContainer} >
		<div className={style.formContainer}>
			<h1 >Cadastro</h1>
			<form className="defaultForm" onSubmit={handleSubmitVerifyCnpj}>
				<label>
					<span>Digite o CNPJ:</span>
					<input value={cnpj} onChange={({ target }) => setCnpj(cnpjFormater(target.value))} type='text' maxLength='18' />
				</label>
				<button>Verificar</button>
			</form>

			<div className={style.link}>
				<span>Já tem cadastro? </span>
				<Link to='/login' >Entrar</Link>
			</div>
		</div >
		<div className={style.imageContainer}>

		</div>
	</div>
}

export default Register
