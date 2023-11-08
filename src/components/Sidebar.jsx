import style from '../../public/styles/components/sidebar.module.css'
import {NavLink} from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const Sidebar = ({isAdmin}) => {
	return (
		<div className={style.mainContainer}>
			<nav>
				<ul className={style.navList}>
					{isAdmin ? (
						<li>
							<NavLink
								to="/adm/schedules"
								className={({isActive}) =>
									isActive ? style.active : style.desactive
								}
							>
								Agenda
							</NavLink>
						</li>
					) : (
						<li>
							<NavLink
								to="/schedules"
								className={({isActive}) =>
									isActive ? style.active : style.desactive
								}
							>
								Meus agendamentos
							</NavLink>
						</li>
					)}

					{isAdmin ? (
						<li>
							<NavLink
								to="/adm/companies"
								className={({isActive}) =>
									isActive ? style.active : style.desactive
								}
							>
								Empresas
							</NavLink>
						</li>
					) : (
						<li>
							<NavLink
								to="/new-schedule"
								className={({isActive}) =>
									isActive ? style.active : style.desactive
								}
							>
								Fazer agendamento
							</NavLink>
						</li>
					)}

					{isAdmin ? null : (
						<li>
							<NavLink
								to="/company"
								className={({isActive}) =>
									isActive ? style.active : style.desactive
								}
							>
								Empresa
							</NavLink>
						</li>
					)}
				</ul>
			</nav>
		</div>
	)
}

export default Sidebar
