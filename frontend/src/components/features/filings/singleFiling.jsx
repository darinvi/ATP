import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFiling } from "../../../store/filings";

export default function SingleFiling(props) {

    const url = props.content.linkToFilingDetails
    const dispatch = useDispatch()
    const showTime = useSelector(state => state.entities.filings.showTime)
    const lastPage = useSelector(state => state.entities.filings.lastPage)

    return (
        <>
            <Link 
                to={`${lastPage==="home" ? "/filings" : ""}`}
                className={`grid grid-cols-${showTime ? '3' : '2'} space-x-3 items-stretch m-auto border-b border-gray-300 text-center cursor-pointer hover:bg-gray-300 transform active:scale-95 hover:border hover:border-gray-500`}
                onClick={() => dispatch(getFiling(url))}
            >
                <td>{props.content.formType}</td>
                <td>{props.content.ticker}</td>
                {showTime && <td>{props.content.filedAt}</td>}
            </Link>
        </>
    )
}