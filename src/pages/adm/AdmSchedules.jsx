import style from '../../../public/styles/pages//schedules.module.css'
import { useContext, useEffect, useState } from 'react'
import axios from '../../utils/axios.js'
import Load from '../../components/Load.jsx'
import {
	ISODateToDate,
	ISODateToDay,
	ISODateToTime,
	getFrequencyName,
	hourString,
} from '../../utils/formaters'
import { toast } from 'react-toastify'
import defaultCatchError from '../../utils/returnTypes/defaultCatchError.js'
import { AuthContext } from '../../context/AuthContext.jsx'
import PaginationBox from '../../components/PaginationBox.jsx'

const AdmSchedules = () => {
	const { setAuth } = useContext(AuthContext)
	const [allSchedules, setAllSchedules] = useState([])
	const [loading, setLoading] = useState(true)

	const [pageSkip, setPageSkip] = useState(0)
	const [take] = useState(9)
	const [currentPage, setCurrentPage] = useState(0)
	const [countOfSchedules, setCountOfScheudules] = useState(0)

	useEffect(() => {

		async function checkAllSchedules() {
			const data = await axios.get(`/api/v1/schedule/check-all-schedules?skip=${pageSkip}&take=${take}`)

			const schedulesCount = data.data.data.count

			setCountOfScheudules(Number(schedulesCount))

			const schedulesArray = []
			data.data.data.dates.forEach((item) => {
				// eslint-disable-next-line no-unused-vars
				const { Company, ...scheduleObj } = { ...item, ...item.Company }
				schedulesArray.push(scheduleObj)
			})
			setAllSchedules(schedulesArray)
		}

		try {
			checkAllSchedules()
		} catch (error) {
			const { message, state } = defaultCatchError(error)
			toast[state](message)
		} finally {
			setLoading(false)
		}

	}, [pageSkip, take, setAuth])

	function firstFn() {
		setCurrentPage(0)
		setPageSkip(0)
	}

	function prevFn() {
		setCurrentPage(currentPage - 1)
		setPageSkip(pageSkip - take)
	}

	function nextFn() {
		setCurrentPage(currentPage + 1)
		setPageSkip(pageSkip + take)
	}

	function lastFn() {
		const firstNum = countOfSchedules.toString()[0]
		const restCompanies = Number(firstNum) * take

		setPageSkip(restCompanies)
		setCurrentPage(firstNum)
	}

	async function handleCancel({ target }) {
		const id = parseInt(target.id)

		const confirmation = confirm('Você deseja cancelar esse agendamento?')

		if (confirmation) {
			try {
				setLoading(true)

				const data = await axios.patch('/api/v1/schedule/cancel-schedule', {
					schedule: [id],
				})

				const canceledId = data.data.data.id
				const updatedSchedules = allSchedules.map((item) => {
					if (item.id === canceledId) {
						return { ...item, isActive: !item.isActive }
					}
					return item
				})

				setAllSchedules(updatedSchedules)
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
		} else {
			setLoading(false)
		}
	}

	return (
		<div className={style.mainContainer}>
			{loading && <Load />}

			<div className={style.scheduleContainer}>
				{allSchedules && allSchedules.length !== 0 ? (
					<>
						<ul>
							{allSchedules.map((item) => {
								if (item.isActive) {
									return (
										<li key={item.id} className={style.scheduleBox}>
											<div className={style.scheduleBoxData}>
												<div>
													<span className={style.dayLine}>
														{ISODateToDay(item.date)}
													</span>
													<span>{ISODateToDate(item.date)}</span>
												</div>
												<span>
													Empresa: <b>{item.name}</b>
												</span>
												<span>
													Horário: <b>{hourString(ISODateToTime(item.date))}</b>
												</span>
												<span>
													Frequência: <b>{getFrequencyName(item.frequency)}</b>
												</span>
											</div>
											<div className={style.scheduleBoxInterface}>
												{item.isActive && (
													<button
														id={item.id}
														onClick={handleCancel}
														className="dangerButton"
													>
														Cancelar
													</button>
												)}
											</div>
										</li>
									)
								}
							})}
						</ul>
						<div>
							{allSchedules &&
								<PaginationBox first={firstFn} prev={prevFn} next={nextFn} last={lastFn} take={take} count={countOfSchedules} currentPage={currentPage} />
							}
						</div>
					</>
				) : (
					<div className={style.anyScheduleContainer}>
						<span>Nenhum agendamento...</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default AdmSchedules
