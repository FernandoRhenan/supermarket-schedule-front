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

	function handleClick(id) {
		console.log(id)
	}


	const Calendar = () => {
		let currentMonth = null;
		let currentYear = null;

		return (
			<>
				{dates.map((item, index) => {

					if (item.day != 0 && item.day != 6) {
						// Verifica se o mês ou o ano mudou
						if (item.month !== currentMonth || item.year !== currentYear) {
							currentMonth = item.month;
							currentYear = item.year;

							// Renderiza o mês e o ano correspondentes
							return (
								<div className={style.scheduleBox} key={index}>
									<div className={style.yearAndMonth}>
										<span>{getMonthName(item.month) + ', '}</span>
										<span>{item.year}</span>
									</div>
									<div className={style.dayBox} onClick={() => handleClick(item.id)}>
										<span><b>{'Dia ' + item.date}</b></span>
										<span>{', ' + getDayName(item.day)}</span>
									</div>
								</div>
							);
						} else {
							// Renderiza apenas o dia
							return (
								<div className={style.scheduleBox} key={index}>
									<div className={style.dayBox} onClick={() => handleClick(item.id)}>
										<span><b>{'Dia ' + item.date}</b></span>
										<span>{', ' + getDayName(item.day)}</span>
									</div>
								</div>
							)
						}
					}

				})}
			</>
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
		return monthNames[month];
	}

	function getDayName(day) {
		const dayNames = [
			'domingo', "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"
		];
		return dayNames[day];
	}
};

export default NewSchedule;
