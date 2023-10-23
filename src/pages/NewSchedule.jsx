// import { useEffect, useState } from 'react';
import style from '../../public/styles/pages/newSchedule.module.css'
import { scheduleFiller, scheduleRange } from '../utils/schedules.js'

const NewSchedule = () => {


	function getDates() {
		const { minRange, maxRange } = scheduleRange(2)
		const datesArray = scheduleFiller(minRange, maxRange)
		return datesArray
	}


	function GetMonths({ children }) {
		const monthName = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
		const monthArray = []

		for (let item of getDates()) {
			monthArray.push(item.month)
		}
		const months = Array.from(new Set(monthArray))

		return months.map((month, index) => (
			<div key={index}>
				{monthName[month]}
				{children}
			</div>
		));

	}


	return (
		<div className={style.mainContainer}>
			<div className={style.scheduleContainer}>
				<GetMonths>
					<h1>d</h1>
				</GetMonths>
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
