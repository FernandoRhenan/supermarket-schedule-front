import { useContext, useEffect, useState } from 'react'
import style from '../../public/styles/pages/company.module.css'
import { toast } from 'react-toastify'
import defaultCatchError from '../utils/returnTypes/defaultCatchError'
import Load from '../components/Load'
import { cleanStr, cnpjFormater, phoneFormater } from '../utils/formaters'
import { FaExclamationTriangle } from 'react-icons/fa'
import axios from '../utils/axios'
import {
	validateAll,
	validatePassword,
} from '../utils/validators/basicValidation'
import {
	compareTwoStrict,
	compareTwoValues,
} from '../utils/validators/compareData'
import Modal from '../components/Modal'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Company = () => {
	const { setAuth } = useContext(AuthContext)

	const navigate = useNavigate()
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

	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmNewPassword, setConfirmNewPassword] = useState('')

	const [modal, setModal] = useState(false)

	useEffect(() => {
		setLoading(false)

		async function getCompany() {
			try {
				const data = await axios.get('/api/v1/company/get-company')

				const { cnpj, altPhone, corporateName, email, name, phone } =
					data.data.data
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

		const altPhoneComparation = compareTwoValues({
			value1: newCleanAltPhone,
			value2: altPhone,
		})
		const phoneComparation = compareTwoValues({
			value1: newCleanPhone,
			value2: phone,
		})
		const emailComparation = compareTwoValues({ value1: newEmail, value2: email })
		const nameComparation = compareTwoValues({ value1: newName, value2: name })

		if (
			!altPhoneComparation.error &&
			!phoneComparation.error &&
			!emailComparation.error &&
			!nameComparation.error
		) {
			return toast.warning('Para atulizar você precisa modificar algum campo')
		}

		const { message, error, state } = validateAll({
			altPhone: newCleanAltPhone,
			phone: newCleanPhone,
			email: newEmail,
			name: newName,
		})
		if (error) {
			return toast[state](message)
		}

		try {
			setLoading(true)

			const data = await axios.patch('/api/v1/company/change-data-company', {
				altPhone: newCleanAltPhone,
				phone: newCleanPhone,
				email,
				name,
			})

			toast[data.data.state](data.data.message)
		} catch (error) {
			const { message, state } = defaultCatchError(error)

			toast[state](message)
		} finally {
			setLoading(false)
		}
	}

	async function handleEditPassword(e) {
		e.preventDefault()

		const passConfirmationArray = [
			validatePassword(currentPassword),
			validatePassword(newPassword),
			validatePassword(confirmNewPassword),
		]

		const invalidPass = passConfirmationArray.filter((item) => {
			return item.error === true
		})

		if (invalidPass.length > 0) {
			return toast[invalidPass[0].state](invalidPass[0].message)
		}

		if (currentPassword === newPassword) {
			return toast.warning('A sua nova senha não pode ser igual a senha atual')
		}

		const {
			error: error2,
			message: message2,
			state: state2,
		} = compareTwoStrict({
			value1: newPassword,
			value2: confirmNewPassword,
			type: 'string',
			message: 'Confirmação de senha reprovada',
		})
		if (error2) return toast[state2](message2)

		try {
			setLoading(true)
			const data = await axios.patch('/api/v1/company/change-password', {
				currentPassword,
				newPassword,
			})

			toast[data.data.state](data.data.message)

			setNewPassword('')
			setConfirmNewPassword('')
			setCurrentPassword('')
		} catch (error) {
			const { message, state, statusCode } = defaultCatchError(error)
			if (statusCode == 401) {
				localStorage.clear()
				setAuth(false)
			}

			toast[state](message)
		} finally {
			setLoading(false)
		}
	}

	async function handleDeleteCompany() {
		try {
			await axios.delete('/api/v1/company/delete-company')

			localStorage.clear()
			setAuth(false)
			navigate('/register')
		} catch (error) {
			const { message, state, statusCode } = defaultCatchError(error)
			if (statusCode == 401) {
				localStorage.clear()
				setAuth(false)
			}

			toast[state](message)
		} finally {
			setLoading(false)
			setModal(false)
		}
	}

	return (
		<div className={style.mainContainer}>
			{loading && <Load />}
			{modal && (
				<Modal
					btn1={'Cancelar'}
					btn2={'Excluir'}
					text={'Você tem certeza que deseja excluir a conta?'}
					fn2={handleDeleteCompany}
					fn1={() => setModal(false)}
				/>
			)}
			<div className={style.editContainer}>
				<div className={style.editContainerBox}>
					<h1>Edição dos dados:</h1>

					<form className="defaultForm" onSubmit={handleEditCompany}>
						<label>
							<span>CNPJ:</span>
							<input
								value={cnpjFormater(cnpj)}
								type="text"
								disabled
								className="defaultInput"
							/>
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
								onChange={({ target }) =>
									setNewPhone(phoneFormater(target.value))
								}
								className="defaultInput"
								maxLength="15"
							/>
						</label>
						<label>
							<span>Telefone secundário:</span>
							<input
								value={phoneFormater(newAltPhone)}
								type="text"
								onChange={({ target }) =>
									setNewAltPhone(phoneFormater(target.value))
								}
								className="defaultInput"
								maxLength="15"
							/>
						</label>
						<button className="defaultButton">Editar</button>
					</form>
				</div>
				<div className={style.editContainerBox}>
					<h1>Alteração de senha:</h1>

					<form className="defaultForm" onSubmit={handleEditPassword}>
						<label>
							<span>Senha atual:</span>
							<input
								value={currentPassword}
								type="password"
								onChange={({ target }) => setCurrentPassword(target.value)}
								className="defaultInput"
								maxLength="32"
							/>
						</label>
						<label>
							<span>Nova senha:</span>
							<input
								value={newPassword}
								type="password"
								onChange={({ target }) => setNewPassword(target.value)}
								className="defaultInput"
								maxLength="32"
							/>
						</label>
						<label>
							<span>Confirmação da senha:</span>
							<input
								value={confirmNewPassword}
								type="password"
								onChange={({ target }) => setConfirmNewPassword(target.value)}
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
				<p>
					<b>Nota:</b> A exclusão da conta é uma ação irreversível, caso exclua
					essa conta, todos os dados vinculados a ela serão juntamente
					excluídos.
				</p>
				<h3 className={style.deleteButton} onClick={() => setModal(true)}>
					<FaExclamationTriangle fontSize="1.8rem" />
					Excluir minha conta
				</h3>
			</div>
		</div>
	)
}

export default Company
