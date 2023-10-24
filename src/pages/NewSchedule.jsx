// import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import style from '../../public/styles/pages/newSchedule.module.css'
import { scheduleFiller, scheduleRange } from '../utils/schedules.js'

const NewSchedule = () => {

	const [dates, setDates] = useState([])

	useEffect(() => {

		function getDates() {
			const { minRange, maxRange } = scheduleRange(2)
			const datesArray = scheduleFiller(minRange, maxRange)

			return datesArray
		}
		setDates(getDates())

	}, [])


	const Calendar = () => {
		let currentMonth = null;
		let currentYear = null;

		return (
			<div>
				{dates.map((item, index) => {

					if (item.day != 0 && item.day != 6) {
						// Verifica se o mês ou o ano mudou
						if (item.month !== currentMonth || item.year !== currentYear) {
							currentMonth = item.month;
							currentYear = item.year;

							// Renderiza o mês e o ano correspondentes
							return (
								<div key={index}>
									<h2>{getMonthName(item.month)}</h2>
									<h3>{item.year}</h3>
									<p>{item.date}</p>
									<p>{getDayName(item.day)}</p>
								</div>
							);
						} else {
							// Renderiza apenas o dia
							return (
								<span key={index}>
									<p >{item.date}</p>
									<p >{getDayName(item.day)}</p>
								</span>
							)
						}
					}

				})}
			</div>
		);
	};



	return (
		<div className={style.mainContainer}>
			<div className={style.scheduleContainer}>
				{Calendar()}

			</div>
		</div>
	);

	// Função auxiliar para obter o nome do mês com base no número do mês
	function getMonthName(month) {
		const monthNames = [
			"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
			"Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
		];
		return monthNames[month - 1];
	}

	function getDayName(day) {
		const dayNames = [
			'domingo', "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"
		];
		return dayNames[day - 1];
	}
};

export default NewSchedule;
