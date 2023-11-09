import style from '../../public/styles/components/paginationBox.module.css'
import { FaAngleLeft, FaAngleRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'

// eslint-disable-next-line react/prop-types
const PaginationBox = ({ first, prev, next, last, take, countOfCompanies, currentPage }) => {

	let currentPages = (currentPage + 1) * take

	return (
		<div className={style.mainContainer}>
			<div className={style.paginationBox}>
				{currentPage <= 0 ?
					<FaAngleDoubleLeft className={style.chevronIconDisabled} />
					:
					<FaAngleDoubleLeft onClick={first} className={style.chevronIcon} />
				}

				{currentPage <= 0 ?
					<FaAngleLeft className={style.chevronIconDisabled} />
					:
					<FaAngleLeft onClick={prev} className={style.chevronIcon} />
				}

				<span className={style.pageNumber}>{Number(currentPage) + 1}</span>

				{currentPages < countOfCompanies ?
					<FaAngleRight onClick={next} className={style.chevronIcon} />
					:
					<FaAngleRight className={style.chevronIconDisabled} />
				}

				{currentPages < countOfCompanies ?
					<FaAngleDoubleRight onClick={last} className={style.chevronIcon} />
					:
					<FaAngleDoubleRight className={style.chevronIconDisabled} />
				}

			</div>
		</div>
	)
}

export default PaginationBox
