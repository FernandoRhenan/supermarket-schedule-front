import style from '../../public/styles/components/sidebar.module.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

	return (
		<div className={style.mainContainer} >
			<nav>
				<ul className={style.navList}>
					{/* <li><NavLink to='/schedules'> Meus agendamentos</NavLink></li> */}
					<li><NavLink to='/new-schedule' className={({ isActive }) => isActive ? (style.active) : (style.desactive)}> Fazer agendamento</NavLink></li>
					<li><NavLink to='/new-schedule' className={({ isActive }) => isActive ? (style.active) : (style.desactive)}> Fazer agendamento</NavLink></li>
					<li><NavLink to='/new-schedule' className={({ isActive }) => isActive ? (style.active) : (style.desactive)}> Fazer agendamento</NavLink></li>
					<li><NavLink to='/schedules' className={({ isActive }) => isActive ? (style.active) : (style.desactive)}> Meus agendamentos</NavLink></li>
					<li><NavLink to='/new-schedule' className={({ isActive }) => isActive ? (style.active) : (style.desactive)}> Fazer agendamento</NavLink></li>
					<li><NavLink to='/new-schedule' className={({ isActive }) => isActive ? (style.active) : (style.desactive)}> Fazer agendamento</NavLink></li>
					<li><NavLink to='/new-schedule' className={({ isActive }) => isActive ? (style.active) : (style.desactive)}> Fazer agendamento</NavLink></li>
					<li><NavLink to='/new-schedule' className={({ isActive }) => isActive ? (style.active) : (style.desactive)}> Fazer agendamento</NavLink></li>
				</ul>
			</nav>
		</div>
	)
}

export default Sidebar
