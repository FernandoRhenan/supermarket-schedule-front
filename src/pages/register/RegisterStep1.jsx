import { cleanStr } from '../../utils/formaters'
import { validateCnpj } from '../../utils/validators/basicValidation'
import { cnpjFormater } from '../../utils/formaters.js'
import { toast } from 'react-toastify'
import axios from 'axios'


// eslint-disable-next-line react/prop-types
const RegisterStep1 = ({ cnpj, setCnpj, setCorporateName, setPhone, setEmail, setSecondStep, setLoading }) => {

	async function handleSubmit(e) {
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

	return (
		<>
			<form className="defaultForm" onSubmit={handleSubmit}>
				<label>
					<span>Digite o CNPJ:</span>
					<input value={cnpj} onChange={({ target }) => setCnpj(cnpjFormater(target.value))} type='text' maxLength='18' className='defaultInput' />
				</label>
				<button className='defaultButton'>Verificar</button>
			</form>
		</>
	)
}

export default RegisterStep1
