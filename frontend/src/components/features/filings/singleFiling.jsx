import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFiling } from "../../../store/filings";

export default function SingleFiling({content}) {

    const url = content.linkToFilingDetails
    const dispatch = useDispatch()
    const showTime = useSelector(state => state.entities.filings.showTime)
    const lastPage = useSelector(state => state.entities.filings.lastPage)

    return (
        <>
            <Link 
                to={`${lastPage==="home" ? "/filings" : ""}`}
                className={`grid grid-cols-${showTime ? '3' : '2'} bg-cyan-900 space-x-3 items-stretch m-auto border-b border-cyan-700 text-center cursor-pointer hover:bg-cyan-800 text-gray-300 hover:text-white transform active:scale-95`}
                onClick={() => dispatch(getFiling(url))}
            >
                <td>{content.formType}</td>
                <td>{content.ticker}</td>
                {showTime && <td>{content.filedAt}</td>}
            </Link>
        </>
    )
}