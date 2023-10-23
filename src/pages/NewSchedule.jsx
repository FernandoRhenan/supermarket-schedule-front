import { useEffect, useState } from 'react';
import style from '../../public/styles/pages/newSchedule.module.css'
import { scheduleFiller, scheduleRange } from '../utils/schedules.js'

const NewSchedule = () => {

	const [dates, setDates] = useState([])

	useEffect(() => {
		const { minRange, maxRange } = scheduleRange(2)
		const datesArray = scheduleFiller(minRange, maxRange)

		console.log(datesArray)
		setDates(datesArray)
	}, [])



	return (
		<div className={style.mainContainer}>
			<div className={style.scheduleContainer}>
				<table>
					<thead>
						<tr>
							<th>Domingo</th>
							<th>Segunda</th>
							<th>Terça</th>
							<th>Quarta</th>
							<th>Quinta</th>
							<th>Sexta</th>
							<th>Sábado</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>d </td>

						</tr>
					</tbody>
				</table>
			</div>
			{/* <div className={style.containerHours}>

			</div> */}
		</div>
	);
};

export default NewSchedule;
