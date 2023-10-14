import { Link } from 'react-router-dom'
import style from '../../public/styles/pages/register-login.module.css'

const Login = () => {
	return <div className={style.mainContainer} >
		<div className={style.formContainer}>
			<h1 >Entrar</h1>
			<form className="defaultForm">
				<label>
					<span>Digite o CNPJ:</span>
					<input name="cnpj" type="text" maxLength='18' className="defaultInput" />
				</label>
				<label>
					<span>Digite a senha:</span>
					<input name="password" type="password" maxLength='32' className="defaultInput" />
				</label>
				<button className='defaultButton'>Entrar</button>
			</form>

			<div className={style.link}>
				<span>Não tem cadastro? </span>
				<Link to='/register' >Cadastrar</Link>
			</div>
		</div >
		<div className={style.imageContainer}>

		</div>
	</div>
}

export default Login
