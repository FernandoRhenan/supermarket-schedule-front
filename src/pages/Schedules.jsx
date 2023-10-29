import { useContext, useEffect, useState } from 'react'
import { ISODateToTime, ISODateToDay, ISODateToDate, hourString, getFrequencyName } from '../utils/formaters'
import style from '../../public/styles/pages/schedules.module.css'
import axios from '../utils/axios.js'
import { AuthContext } from '../context/AuthContext'
import defaultCatchError from '../utils/returnTypes/defaultCatchError'
import { toast } from 'react-toastify'
import Load from '../components/Load'
import { Link } from 'react-router-dom'

const Schedules = () => {

	const [schedules, setSchedules] = useState([])
	const { setAuth } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)

	useEffect(() => {

		async function getCompanySchedule() {
			try {
				setLoading(true)

				const data = await axios.get('/api/v1/schedule/get-company-schedule')

				const schedulesArray = []
				for (let item of data.data.data) {
					schedulesArray.push({ ...item, selected: false })
				}

				setSchedules(schedulesArray)
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
		getCompanySchedule()
	}, [setAuth])

	async function handleCancel({ target }) {
		const id = parseInt(target.id)

		try {
			setLoading(true)

			const data = await axios.patch('/api/v1/schedule/cancel-schedule', {
				schedule: [id]
			})

			const canceledId = data.data.data.id
			const updatedSchedules = schedules.map((item) => {
				if (item.id === canceledId) {
					return { ...item, isActive: !item.isActive };
				}
				return item;
			});

			setSchedules(updatedSchedules);

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

	async function handleActive({ target }) {
		const id = parseInt(target.id)

		try {
			setLoading(true)

			const data = await axios.patch('/api/v1/schedule/active-schedule', {
				schedule: [id]
			})

			const activedId = data.data.data.id

			const updatedSchedules = schedules.map((item) => {
				if (item.id === activedId) {
					return { ...item, isActive: !item.isActive };
				}
				return item;
			});

			setSchedules(updatedSchedules);

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

	return (
		<div className={style.mainContainer}>
			{loading && <Load />}

			<div className={style.scheduleContainer}>
				{schedules && schedules.length !== 0 ?
					<ul>

						{schedules.map((item) => (
							<li
								key={item.id}
								className={
									item.selected ? style.scheduleBoxSelected : style.scheduleBox
								}
							>
								<div className={style.scheduleBoxData}>
									<div>
										<span className={style.dayLine}>
											{ISODateToDay(item.date)}
										</span>
										<span>{ISODateToDate(item.date)}</span>
									</div>
									<span>Horário: <b>{hourString(ISODateToTime(item.date))}</b></span>
									<span>Frequência: <b>{getFrequencyName(item.frequency)}</b></span>
									<span>
										{item.isActive ?
											<><span>Estado: </span><span className={style.activeSchedule}>Ativo</span></> :
											<><span>Estado: </span><span className={style.canceledSchedule}>Cancelado</span></>
										}
									</span>
								</div>
								<div className={style.scheduleBoxInterface}>
									{item.isActive ?
										<button id={item.id} onClick={handleCancel} className="dangerButton">Cancelar</button> :
										<button id={item.id} onClick={handleActive} className="activeButton">Ativar</button>
									}

								</div>
							</li>
						))
						}
					</ul>
					:
					<div className={style.anyScheduleContainer}>
						<span>Nenhum agendamento...</span>
						<Link to='/new-schedule' className={style.linkNewSchedule}>Fazer agendamento</Link>
					</div>}

			</div>
		</div>
	)
}

export default Schedules
