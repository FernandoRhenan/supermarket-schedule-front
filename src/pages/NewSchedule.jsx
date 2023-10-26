// import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import style from '../../public/styles/pages/newSchedule.module.css'
import { scheduleFiller, scheduleRange } from '../utils/schedules.js'
import axios from '../utils/axios.js'
import ableHours from '../utils/ableHours';
import { hourString } from '../utils/formaters';
import { toast } from 'react-toastify';
import defaultCatchError from '../utils/returnTypes/defaultCatchError';
import Load from '../components/Load';

const NewSchedule = () => {

	const [dates, setDates] = useState([])
	const [hours, setHours] = useState([])
	const [day, setDay] = useState('')
	const [loading, setLoading] = useState(false)

	async function handleVerifyHour(id) {
		try {
			setLoading(true)
			const { year, month, date, day } = dates.find((item) => item.id == id)
			const newDate = new Date(year, month, date).toISOString()

			setDay(`Dia ${date} de ${getMonthName(month)}, ${getDayName(day)}.`)

			const response = await axios.get(`http://localhost:3000/api/v1/schedule/check-schedule/${newDate}`)

			const busyDates = response.data.data.dates
			let unable = []

			for (let { date } of busyDates) {
				const dataHora = new Date(date)
				const hours = dataHora.getUTCHours();
				const min = dataHora.getUTCMinutes();

				unable.push(hourString(`${hours}:${min}`))
			}
			const newArray = ableHours.filter(item => !unable.includes(item));

			setHours(newArray)
		} catch (error) {
			const { message, state } = defaultCatchError(error)

			toast[state](message)
		} finally {
			setLoading(false)
		}
	}

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
									<div className={style.dayBox} onClick={() => handleVerifyHour(item.id)}>
										<span><b>{'Dia ' + item.date}</b></span>
										<span>{', ' + getDayName(item.day)}</span>
									</div>
								</div>
							);
						} else {
							// Renderiza apenas o dia
							return (
								<div className={style.scheduleBox} key={index}>
									<div className={style.dayBox} onClick={() => handleVerifyHour(item.id)}>
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
			{loading && <Load />}

			<div className={style.scheduleContainer}>
				{Calendar()}
			</div>
			{day &&
				<div className={style.hoursContainer}>
					<span className={style.ableHoursTxt}>Horários disponíveis: {day}</span>

					<ul className={style.ableHours}>
						{
							hours && hours.map((item, i) => (
								<li key={i}>{item}</li>
							))
						}
					</ul>
					<form>
						<select>
							<option>Uma vez</option>
							<option>Semanal</option>
							<option>Quinzenal</option>
							<option>A cada 28 dias</option>
						</select>
					</form>

				</div>
			}
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
