import { useContext, useEffect, useState } from 'react'
import style from '../../../public/styles/pages/adm/AdmCompanies.module.css'
import axios from '../../utils/axios.js'
import defaultCatchError from '../../utils/returnTypes/defaultCatchError'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'
import Load from '../../components/Load.jsx'
import { ISODateToDate, ISODateToTime, cnpjFormater, hourString, phoneFormater } from '../../utils/formaters.js'
import PaginationBox from '../../components/PaginationBox.jsx'

const AdmCompanies = () => {

	const [loading, setLoading] = useState(true)
	const { setAuth } = useContext(AuthContext)

	const [pageSkip, setPageSkip] = useState(0)
	const [take] = useState(10)
	const [countOfCompanies, setCountOfCompanies] = useState(0)
	const [currentPage, setCurrentPage] = useState(0)

	const [companies, setCompanies] = useState([])


	useEffect(() => {

		async function getAllCompanies() {
			const data = await axios.get(`/api/v1/company/get-all-companies?skip=${pageSkip}&take=${take}`)
			const companies = data.data.data.companies
			const companiesCount = data.data.data.count
			setCompanies(companies)
			setCountOfCompanies(Number(companiesCount))
		}

		try {
			setLoading(true)
			getAllCompanies()
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
		const firstNum = countOfCompanies.toString()[0]
		const restCompanies = Number(firstNum) * take

		setPageSkip(restCompanies)
		setCurrentPage(firstNum)
	}

	return (
		<div className={style.mainContainer}>
			{loading && <Load />}
			<div className={style.companiesContainer}>
				{countOfCompanies &&
					<div className={style.countOfCompanies}>Total de empresas cadastradas: <span >{countOfCompanies}</span></div>
				}
				<ul >
					{companies && companies.map((item) => (
						<li key={item.id} className={style.companyBox}>
							<div className={style.companyBoxData}>
								<span className={style.lineData}><span>Nome: </span><b>{item.name}</b></span>
								<span className={style.lineData}><span>Razão social: </span> <b>{item.corporateName}</b></span>
								<span className={style.lineData}><span>CNPJ: </span> <b>{cnpjFormater(item.cnpj)}</b></span>
								<span className={style.lineData}><span>E-mail: </span> <b>{item.email}</b></span>
								<span className={style.lineData}><span>Telefone: </span> <b>{phoneFormater(item.phone)}</b></span>
								<span className={style.lineData}><span>Telefone secundário: </span> <b>{phoneFormater(item.altPhone)}</b></span>
								<span className={style.lineData}><span>Situação da conta: </span> {item.confirmedAccount ? <b className={style.active}>Confirmada</b> : <b className={style.desactive}>Não confirmada</b>}</span>
								<span className={style.lineData}><span>Entrada em: </span> <b>{ISODateToDate(item.createdAt) + " - " + ISODateToTime(hourString(item.createdAt))}</b></span>
								<span className={style.lineData}><span>Atualizado em: </span> <b>{ISODateToDate(item.createdAt) + " - " + ISODateToTime(hourString(item.updatedAt))}</b></span>
								<span className={style.lineData}><span>Administradora: </span> <b>{item.isAdmin ? 'Sim' : 'Não'}</b></span>
							</div>

						</li>
					))}
				</ul>
				<div>
					{companies &&
						<PaginationBox first={firstFn} prev={prevFn} next={nextFn} last={lastFn} take={take} count={countOfCompanies} currentPage={currentPage} />
					}
				</div>
			</div>
		</div>
	)
}

export default AdmCompanies
