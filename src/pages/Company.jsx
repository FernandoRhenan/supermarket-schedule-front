import { useEffect, useState } from 'react'
import style from '../../public/styles/pages/company.module.css'
import { toast } from 'react-toastify'
import defaultCatchError from '../utils/returnTypes/defaultCatchError'
import Load from '../components/Load'
import { phoneFormater } from '../utils/formaters'
import { FaExclamationTriangle } from 'react-icons/fa'

const Company = () => {

	const [name, setName] = useState('')
	const [corporateName, setCorporateName] = useState('')
	const [cnpj, setCnpj] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [altPhone, setAltPhone] = useState('')
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(false)
	}, [])

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			console.log('ds')
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
								onChange={({ target }) => setName(target.value)}
								className="defaultInput"
								maxLength="26"
							/>
						</label>
						<label>
							<span>E-mail:</span>
							<input
								value={email}
								type="text"
								onChange={({ target }) => setEmail(target.value)}
								className="defaultInput"
								maxLength="50"
							/>
						</label>
						<label>
							<span>Telefone:</span>
							<input
								value={phone}
								type="text"
								onChange={({ target }) => setPhone(phoneFormater(target.value))}
								className="defaultInput"
								maxLength="15"
							/>
						</label>
						<label>
							<span>Telefone secundário:</span>
							<input
								value={altPhone}
								type="text"
								onChange={({ target }) => setAltPhone(phoneFormater(target.value))}
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
