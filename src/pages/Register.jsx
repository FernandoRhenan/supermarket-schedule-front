import style from '../../public/styles/pages/register-login.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cnpjFormater from '../utils/formaters/cnpjFormater.js'
import phoneFormater from '../utils/formaters/phoneFormater.js'
import { toast } from 'react-toastify'
import axios from 'axios'
import cleanStr from '../utils/formaters/cleanStr.js'
import { validateAll, validateCnpj } from '../utils/validators/basicValidation.js'
import { compareTwoStrict } from '../utils/validators/compareData'
import Load from '../components/Load'

const Register = () => {

	const navigate = useNavigate();
	const [cnpj, setCnpj] = useState('')
	const [name, setName] = useState('')
	const [corporateName, setCorporateName] = useState('')
	const [phone, setPhone] = useState('')
	const [altPhone, setAltPhone] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [secondStep, setSecondStep] = useState(false)
	const [loading, setLoading] = useState(false)

	async function handleSubmitVerifyCnpj(e) {
		e.preventDefault()

		const cleanCnpj = cleanStr({ data: cnpj, only: 'numbers' })
		const { error, message, state } = validateCnpj(cleanCnpj)

		if (error) {
			return toast[state](message)
		}

		try {
			setLoading(true)
			const response = await axios.get(`http://localhost:3000/api/v1/company/check-cnpj/${cleanCnpj}`)

			const { name, email, phone, cnpj } = response.data.data

			setCnpj(cnpj)
			setCorporateName(name)
			setPhone(phone)
			setEmail(email)
			// setCnpj('00.216.844/0001-01')
			// setCorporateName('Testeeeee')
			// setPhone('(48) 98444-9444')
			// setEmail('teste@tesste.com')

			setSecondStep(true)

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



	async function handleSubmit(e) {
		e.preventDefault()
		setLoading(true)

		const cleanCnpj = cleanStr({ data: cnpj, only: 'numbers' })
		const cleanPhone = cleanStr({ data: phone, only: 'numbers' })
		const cleanAltPhone = cleanStr({ data: altPhone, only: 'numbers' })

		const { error, message, state } = validateAll({ cnpj: cleanCnpj, phone: cleanPhone, altPhone: cleanAltPhone, name, email, password })
		if (error) return toast[state](message)

		const { error: error2, message: message2, state: state2 } = compareTwoStrict({ value1: password, value2: confirmPassword, type: 'string', message: 'Confirmação de senha reprovada' })
		if (error2) return toast[state2](message2)

		try {

			const { data: { data, error, state } } = await axios.post('http://localhost:3000/api/v1/company/register', {
				cnpj: cleanCnpj,
				name,
				corporateName,
				altPhone: cleanAltPhone,
				phone: cleanPhone,
				password,
				email
			})

			if (error) {
				toast[state](message)
			}

			navigate(`/send-email-validation/${data.email}/${data.id}`)


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

	return <div className={style.mainContainer} >
		{loading && <Load />}
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

				<form className="defaultForm" onSubmit={handleSubmit} >
					<label>
						<span>CNPJ:</span>
						<input value={cnpj} type='text' disabled className='defaultInput' />
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
						<input value={phone} type='text' onChange={({ target }) => setPhone(phoneFormater(target.value))} className='defaultInput' maxLength='15' />
					</label>
					<label>
						<span>Telefone secundário:</span>
						<input value={altPhone} type='text' onChange={({ target }) => setAltPhone(phoneFormater(target.value))} className='defaultInput' maxLength='15' />
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
