import {cleanStr, phoneFormater} from '../../utils/formaters'
import {validateAll} from '../../utils/validators/basicValidation'
import {compareTwoStrict} from '../../utils/validators/compareData'
import {toast} from 'react-toastify'
import axios from '../../utils/axios.js'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import defaultCatchError from '../../utils/returnTypes/defaultCatchError'

// eslint-disable-next-line react/prop-types
const RegisterStep2 = ({
	cnpj,
	corporateName,
	phone,
	email,
	setEmail,
	setPhone,
	setLoading,
}) => {
	const navigate = useNavigate()

	const [name, setName] = useState('')
	const [altPhone, setAltPhone] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	async function handleSubmit(e) {
		e.preventDefault()

		const cleanCnpj = cleanStr({data: cnpj, only: 'numbers'})
		const cleanPhone = cleanStr({data: phone, only: 'numbers'})
		const cleanAltPhone = cleanStr({data: altPhone, only: 'numbers'})

		const {error, message, state} = validateAll({
			cnpj: cleanCnpj,
			phone: cleanPhone,
			altPhone: cleanAltPhone,
			name,
			email,
			password,
		})
		if (error) return toast[state](message)

		const {
			error: error2,
			message: message2,
			state: state2,
		} = compareTwoStrict({
			value1: password,
			value2: confirmPassword,
			type: 'string',
			message: 'Confirmação de senha reprovada',
		})
		if (error2) return toast[state2](message2)

		try {
			setLoading(true)
			const {
				data: {data},
			} = await axios.post('/api/v1/company/register', {
				cnpj: cleanCnpj,
				name,
				corporateName,
				altPhone: cleanAltPhone,
				phone: cleanPhone,
				password,
				email,
			})

			navigate(`/send-email-validation?token=${data}`)
		} catch (error) {
			const {message, state} = defaultCatchError(error)

			toast[state](message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<form className="defaultForm" onSubmit={handleSubmit}>
			<label>
				<span>CNPJ:</span>
				<input value={cnpj} type="text" disabled className="defaultInput" />
			</label>
			<label>
				<span>Nome:</span>
				<input
					value={corporateName}
					type="text"
					disabled
					className="defaultInput"
				/>
			</label>
			<label>
				<span>Nome fantasia:</span>
				<input
					value={name}
					type="text"
					onChange={({target}) => setName(target.value)}
					className="defaultInput"
					maxLength="26"
				/>
			</label>
			<label>
				<span>E-mail:</span>
				<input
					value={email}
					type="text"
					onChange={({target}) => setEmail(target.value)}
					className="defaultInput"
					maxLength="50"
				/>
			</label>
			<label>
				<span>Telefone:</span>
				<input
					value={phone}
					type="text"
					onChange={({target}) => setPhone(phoneFormater(target.value))}
					className="defaultInput"
					maxLength="15"
				/>
			</label>
			<label>
				<span>Telefone secundário:</span>
				<input
					value={altPhone}
					type="text"
					onChange={({target}) => setAltPhone(phoneFormater(target.value))}
					className="defaultInput"
					maxLength="15"
				/>
			</label>
			<label>
				<span>Senha:</span>
				<input
					value={password}
					type="password"
					onChange={({target}) => setPassword(target.value)}
					className="defaultInput"
					maxLength="32"
				/>
			</label>
			<label>
				<span>Confirmação da senha:</span>
				<input
					value={confirmPassword}
					type="password"
					onChange={({target}) => setConfirmPassword(target.value)}
					className="defaultInput"
					maxLength="32"
				/>
			</label>
			<button className="defaultButton">Cadastrar</button>
		</form>
	)
}

export default RegisterStep2
