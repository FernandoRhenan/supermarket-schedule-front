import { useEffect, useState } from 'react'
import style from '../../public/styles/pages/company.module.css'
import { toast } from 'react-toastify'
import defaultCatchError from '../utils/returnTypes/defaultCatchError'
import Load from '../components/Load'
import { cleanStr, cnpjFormater, phoneFormater } from '../utils/formaters'
import { FaExclamationTriangle } from 'react-icons/fa'
import axios from '../utils/axios'
import { validateAll } from '../utils/validators/basicValidation'
import { compareTwoValues } from '../utils/validators/compareData'

const Company = () => {

	const [name, setName] = useState('')
	const [newName, setNewName] = useState('')
	const [corporateName, setCorporateName] = useState('')
	const [cnpj, setCnpj] = useState('')
	const [email, setEmail] = useState('')
	const [newEmail, setNewEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [newPhone, setNewPhone] = useState('')
	const [altPhone, setAltPhone] = useState('')
	const [newAltPhone, setNewAltPhone] = useState('')
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(false)

		async function getCompany() {

			try {
				const data = await axios.get('/api/v1/company/get-company')

				const { cnpj, altPhone, corporateName, email, name, phone } = data.data.data
				setCorporateName(corporateName)
				setName(name)
				setCnpj(cnpj)
				setEmail(email)
				setPhone(phone)
				setAltPhone(altPhone)

				setNewName(name)
				setNewEmail(email)
				setNewPhone(phone)
				setNewAltPhone(altPhone)

			} catch (error) {
				const { message, state } = defaultCatchError(error)

				toast[state](message)
			} finally {
				setLoading(false)
			}

		}
		getCompany()


	}, [])

	async function handleEditCompany(e) {
		e.preventDefault()

		const newCleanPhone = cleanStr({ data: newPhone, only: 'numbers' })
		const newCleanAltPhone = cleanStr({ data: newAltPhone, only: 'numbers' })

		const altPhoneComparation = compareTwoValues({ value1: newCleanAltPhone, value2: altPhone })
		const phoneComparation = compareTwoValues({ value1: newCleanPhone, value2: phone })
		const emailComparation = compareTwoValues({ value1: newEmail, value2: email })
		const nameComparation = compareTwoValues({ value1: newName, value2: name })

		if (!altPhoneComparation.error && !phoneComparation.error && !emailComparation.error && !nameComparation.error) {
			toast.warning('Para atulizar você precisa modificar algum campo')
		} else {
			console.log('ok')
		}


		try {

			// const { error, message, state } = validateAll({
			// 	cnpj: cleanCnpj,
			// 	phone: cleanPhone,
			// 	altPhone: cleanAltPhone,
			// 	name,
			// 	email,
			// 	password,
			// })
		} catch (error) {
			const { message, state } = defaultCatchError(error)

			toast[state](message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className={style.mainContainer}>
			{loading && <Load />}
			<div className={style.editContainer}>
				<div className={style.editContainerBox}>
					<h1>Edição dos dados:</h1>

					<form className="defaultForm" onSubmit={handleEditCompany}>
						<label>
							<span>CNPJ:</span>
							<input value={cnpjFormater(cnpj)} type="text" disabled className="defaultInput" />
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
								value={newName}
								type="text"
								onChange={({ target }) => setNewName(target.value)}
								className="defaultInput"
								maxLength="26"
							/>
						</label>
						<label>
							<span>E-mail:</span>
							<input
								value={newEmail}
								type="text"
								onChange={({ target }) => setNewEmail(target.value)}
								className="defaultInput"
								maxLength="50"
							/>
						</label>
						<label>
							<span>Telefone:</span>
							<input
								value={phoneFormater(newPhone)}
								type="text"
								onChange={({ target }) => setNewPhone(phoneFormater(target.value))}
								className="defaultInput"
								maxLength="15"
							/>
						</label>
						<label>
							<span>Telefone secundário:</span>
							<input
								value={phoneFormater(newAltPhone)}
								type="text"
								onChange={({ target }) => setNewAltPhone(phoneFormater(target.value))}
								className="defaultInput"
								maxLength="15"
							/>
						</label>
						<button className="defaultButton">Editar</button>
					</form>

				</div>
				<div className={style.editContainerBox}>

					<h1>Alteração de senha:</h1>

					<form className="defaultForm" >
						<label>
							<span>Senha atual:</span>
							<input
								// value={altPhone}
								type="password"
								// onChange={({ target }) => setAltPhone(phoneFormater(target.value))}
								className="defaultInput"
								maxLength="32"
							/>
						</label>
						<label>
							<span>Nova senha:</span>
							<input
								// value={altPhone}
								type="password"
								// onChange={({ target }) => setAltPhone(phoneFormater(target.value))}
								className="defaultInput"
								maxLength="32"
							/>
						</label>
						<label>
							<span>Confirmação da senha:</span>
							<input
								// value={altPhone}
								type="password"
								// onChange={({ target }) => setAltPhone(phoneFormater(target.value))}
								className="defaultInput"
								maxLength="32"
							/>
						</label>
						<button className="defaultButton">Editar</button>
					</form>
				</div>
			</div>
			<div className={style.deleteContainer}>
				<h1>Exclusão da conta:</h1>
				<p><b>Nota:</b> A exclusão da conta é uma ação irreversível, caso exclua essa conta, todos os dados vinculados a ela serão juntamente excluídos.</p>
				<h3 className={style.deleteButton}><FaExclamationTriangle fontSize='1.8rem' />Excluir minha conta</h3>
			</div>
		</div>
	)
}

export default Company
