import { Link } from 'react-router-dom'
import style from '../../public/styles/pages/register-login.module.css'

const Register = () => {
	return <div className={style.mainContainer} >
		<div className={style.formContainer}>
			<h1 >Cadastro de novo usuário</h1>
			<form className="defaultForm">
				<label>
					<span>Digite o CNPJ:</span>
					<input name="cnpj" type="text" maxLength='18' className="defaultInput" />
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
