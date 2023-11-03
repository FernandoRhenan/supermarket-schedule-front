// import { useEffect, useState } from 'react';
import { useContext, useEffect, useState } from 'react';
import style from '../../public/styles/pages/newSchedule.module.css'
import { scheduleFiller, scheduleRange } from '../utils/schedules.js'
import axios from '../utils/axios.js'
import ableHours from '../utils/ableHours';
import { hourString } from '../utils/formaters';
import { toast } from 'react-toastify';
import defaultCatchError from '../utils/returnTypes/defaultCatchError';
import Load from '../components/Load';
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { getDayName, getMonthName } from '../utils/formaters';


const NewSchedule = () => {

	const navigate = useNavigate()
	const { setAuth } = useContext(AuthContext)

	const [dates, setDates] = useState([])
	const [hours, setHours] = useState([])
	const [selectedHour, setSelectedHour] = useState('')
	const [frequency, setFrequency] = useState('once')
	const [day, setDay] = useState('')
	const [date, setDate] = useState({})
	const [loading, setLoading] = useState(false)

	async function handleVerifyHour(id) {
		try {
			setLoading(true)
			const { year, month, date, day } = dates.find((item) => item.id == id)
			const newDate = new Date(year, month, date).toISOString()

			setDate({
				date: date,
				month: month,
				year: year
			})
			setDay(`dia ${date} de ${getMonthName(month).toLowerCase()}, ${getDayName(day)}.`)

			const response = await axios.get(`api/v1/schedule/check-schedule/${newDate}`)

			const busyDates = response.data.data.dates
			let unable = []

			for (let { date } of busyDates) {
				const dataHora = new Date(date)
				const hours = dataHora.getHours();
				const min = dataHora.getMinutes();

				unable.push(hourString(`${hours}:${min}`))
			}
			const newArray = ableHours.filter(item => !unable.includes(item));

			setHours(newArray)
			setSelectedHour('')
		} catch (error) {
			const { message, state, statusCode } = defaultCatchError(error)
			if (statusCode == 401) {
				localStorage.clear();
				setAuth(false);
			}

			toast[state](message)
		} finally {
			setLoading(false)
		}
	}

	async function handleSubmit(e) {
		e.preventDefault()
		if (selectedHour == '') {
			return toast.warning('Selecione um horário')
		}

		try {
			setLoading(true)
			const [h, m] = selectedHour.split(':')
			const newDate = new Date(date.year, date.month, date.date, h, m).toISOString()
			const { data } = await axios.post('/api/v1/schedule/create-schedule', {
				date: newDate,
				frequency: frequency
			})
			toast[data.state](data.message)
			navigate('/schedules')

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
					<span className={style.ableHoursTxt}>Horários disponíveis do {day}</span>

					<ul className={style.ableHours}>
						{
							hours && hours.map((item, i) => (
								selectedHour == item ? (
									<li onClick={(e) => { setSelectedHour(e.target.dataset.hour) }} data-hour={item} style={{ backgroundColor: 'var(--color1)' }} key={i}>{item} </li>
								) : (
									<li onClick={(e) => { setSelectedHour(e.target.dataset.hour) }} data-hour={item} key={i}>{item} </li>
								)
							))
						}
					</ul>
					<div className={style.selectedHour}>Horário: <span>{selectedHour}</span></div>
					<form onSubmit={handleSubmit} className='defaultForm'>
						<select className='defaultInput' onChange={e => setFrequency(e.target.value)} >
							<option value='once'>Uma vez</option>
							<option value='weekly'>Semanal</option>
							<option value='biweekly'>Quinzenal</option>
							<option value='monthly'>A cada 28 dias</option>
						</select>
						<button className='defaultButton' >Agendar</button>
					</form>

				</div>
			}
		</div >
	);

};

export default NewSchedule;
