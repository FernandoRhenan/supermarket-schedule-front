import { useEffect, useState } from 'react'
import { ISODateToTime, ISODateToDay, ISODateToDate } from '../utils/formaters'
import style from '../../public/styles/pages/schedules.module.css'
import axios from '../utils/axios.js'

const Schedules = () => {
	const [schedules, setSchedules] = useState([])

	useEffect(() => {
		const data = {
			statusCode: 200,
			error: false,
			message: '',
			data: [
				{
					isActive: true,
					date: '2023-12-08T10:30:00.000Z',
					frequency: 'weekly',
					id: 1,
					company_id: 1,
				},
				{
					isActive: true,
					date: '2023-12-15T10:30:00.000Z',
					frequency: 'weekly',
					id: 2,
					company_id: 1,
				},
				{
					isActive: true,
					date: '2023-12-22T10:30:00.000Z',
					frequency: 'weekly',
					id: 3,
					company_id: 1,
				},
				{
					isActive: true,
					date: '2023-12-29T10:30:00.000Z',
					frequency: 'weekly',
					id: 4,
					company_id: 1,
				},
				{
					isActive: true,
					date: '2024-01-05T10:30:00.000Z',
					frequency: 'weekly',
					id: 5,
					company_id: 1,
				},
				{
					isActive: true,
					date: '2024-01-12T10:30:00.000Z',
					frequency: 'weekly',
					id: 6,
					company_id: 1,
				},
				{
					isActive: true,
					date: '2024-01-19T10:30:00.000Z',
					frequency: 'weekly',
					id: 7,
					company_id: 1,
				},
				{
					isActive: true,
					date: '2024-01-26T10:30:00.000Z',
					frequency: 'weekly',
					id: 8,
					company_id: 1,
				},
				{
					isActive: true,
					date: '2024-02-02T10:30:00.000Z',
					frequency: 'weekly',
					id: 9,
					company_id: 1,
				},
			],
			state: 'success',
		}

		const schedulesArray = []

		for (let item of data.data) {
			schedulesArray.push({ ...item, selected: false })
		}

		setSchedules(schedulesArray)
	}, [])

	return (
		<div className={style.mainContainer}>
			<div className={style.scheduleContainer}>
				<ul>
					{schedules &&
						schedules.map((item) => (
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
									<span>{ISODateToTime(item.date)} horas</span>
									<span>{item.isActive ? 'Ativo' : 'inativo'}</span>
								</div>
								<div className={style.scheduleBoxInterface}>
									<button className="dangerButton">Cancelar</button>
								</div>
							</li>
						))}
				</ul>
			</div>
		</div>
	)
}

export default Schedules
