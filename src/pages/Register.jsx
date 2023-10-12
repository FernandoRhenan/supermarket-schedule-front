import style from '../../public/styles/pages/register-login.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import cnpjFormater from '../utils/formaters/cnpjFormater.js'
import { toast } from 'react-toastify'
import axios from 'axios'
import checkCnpj from '../utils/validators/checkCnpj'

const Register = () => {

	const [cnpj, setCnpj] = useState('')
	const [name, setName] = useState('')
	const [corporateName, setCorporateName] = useState('')
	const [phone, setPhone] = useState('')
	const [altPhone, setAltPhone] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [secondStep, setSecondStep] = useState(false)

	async function handleSubmitVerifyCnpj(e) {
		e.preventDefault()

		const { error, data, message, state } = checkCnpj(cnpj)
		if (error) {
			toast[state](message)
		} else {

			try {
				const response = await axios.get(`http://localhost:3000/api/v1/company/check-cnpj/${data}`)

				const { name, email, phone, cnpj } = response.data.data

				setCnpj(cnpj)
				setCorporateName(name)
				setPhone(phone)
				setEmail(email)

				setSecondStep(true)

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
	// async function handleSubmit(e) {
	// 	e.preventDefault()

	// 	const { error, data, message, state } = checkCnpj(cnpj)
	// 	if (error) {
	// 		toast[state](message)
	// 	} else {

	// 		try {
	// 			const response = await axios.post('http://localhost:3000/api/v1/company/register')

	// 			const { name, email, phone, cnpj } = response.data.data

	// 			setCnpj(cnpj)
	// 			setCorporateName(name)
	// 			setPhone(phone)
	// 			setEmail(email)

	// 			setSecondStep(true)

	// 		} catch (err) {

	// 			const { message, error } = err.response.data

	// 			if (error) {
	// 				toast.error(message)
	// 			} else {
	// 				toast.error('Ocorreu um erro, por favor tente novamente mais tarde!')
	// 			}

	// 		}

	// 	}

	// }

	return <div className={style.mainContainer} >
		<div className={style.formContainer}>
			<h1>Cadastro</h1>
			{!secondStep &&

				<form className="defaultForm" onSubmit={handleSubmitVerifyCnpj}>
					<label>
						<span>Digite o CNPJ:</span>
						<input value={cnpj} onChange={({ target }) => setCnpj(cnpjFormater(target.value))} type='text' maxLength='18' className='defaultInput' />
					</label>
					<button>Verificar</button>
				</form>
			}

			{secondStep &&

				<form className="defaultForm" >
					<label>
						<span>CNPJ:</span>
						<input value={cnpj} type='text' maxLength='18' disabled className='defaultInput' />
					</label>
					<label>
						<span>Nome:</span>
						<input value={corporateName} type='text' disabled className='defaultInput' />
					</label>
					<label>
						<span>Nome fantasia:</span>
						<input value={name} type='text' onChange={({ target }) => setName(target.value)} className='defaultInput' maxLength='26' />
					</label>
					<label>
						<span>Email:</span>
						<input value={email} type='text' onChange={({ target }) => setEmail(target.value)} className='defaultInput' maxLength='50' />
					</label>
					<label>
						<span>Telefone:</span>
						<input value={phone} type='text' onChange={({ target }) => setPhone(target.value)} className='defaultInput' />
					</label>
					<label>
						<span>Telefone secundário:</span>
						<input value={altPhone} type='text' onChange={({ target }) => setAltPhone(target.value)} className='defaultInput' />
					</label>
					<label>
						<span>Senha:</span>
						<input value={password} type='password' onChange={({ target }) => setPassword(target.value)} className='defaultInput' maxLength='32' />
					</label>
					<label>
						<span>Confirmação da senha:</span>
						<input value={confirmPassword} type='password' onChange={({ target }) => setConfirmPassword(target.value)} className='defaultInput' maxLength='32' />
					</label>
					<button>Cadastrar</button>
				</form>
			}

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
