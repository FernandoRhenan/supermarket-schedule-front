import style from '../../../public/styles/pages/register-login.module.css'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import RegisterStep1 from './RegisterStep1'
import RegisterStep2 from './RegisterStep2'
import Load from '../../components/Load'

const Register = () => {
	const [cnpj, setCnpj] = useState('')
	const [corporateName, setCorporateName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [secondStep, setSecondStep] = useState(false)
	const [loading, setLoading] = useState(false)

	return (
		<div className={style.mainContainer}>
			{loading && <Load />}

			<div className={style.formContainer}>
				<h1>Cadastro</h1>

				{!secondStep ? (
					<RegisterStep1
						cnpj={cnpj}
						setCnpj={setCnpj}
						setCorporateName={setCorporateName}
						setPhone={setPhone}
						setEmail={setEmail}
						setSecondStep={setSecondStep}
						setLoading={setLoading}
					/>
				) : (
					<RegisterStep2
						cnpj={cnpj}
						corporateName={corporateName}
						phone={phone}
						setPhone={setPhone}
						email={email}
						setEmail={setEmail}
						setLoading={setLoading}
					/>
				)}

				<div className={style.link}>
					<span>Já tem cadastro? </span>
					<Link to="/login">Entrar</Link>
				</div>
			</div>
			<div className={style.imageContainer}></div>
		</div>
	)
}

export default Register
