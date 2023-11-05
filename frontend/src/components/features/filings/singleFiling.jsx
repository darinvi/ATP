import { useDispatch, useSelector } from "react-redux";
import { apiCallBegan } from "../../../store/api";
import { setHTML } from "../../../store/filings"

export default function SingleFiling(props) {

    const url = props.content.linkToFilingDetails
    // const date = new Date(props.content.filedAt)
    const dispatch = useDispatch()
    const showTime = useSelector(state => state.entities.filings.showTime)

    function handleFilingClick() {
        dispatch(apiCallBegan({
            url: 'filings',
            method: 'POST',
            data: {
                url
            },
            headers: {},
            onSuccess: setHTML.type,
        }))
    }

    return (
        <>
            <tr
                className={`grid grid-cols-${showTime ? '3' : '2'} space-x-3 items-stretch m-auto border-b border-gray-300 text-center cursor-pointer hover:bg-gray-300 transform active:scale-95 hover:border hover:border-gray-500`}
                onClick={handleFilingClick}
            >
                <td>{props.content.formType}</td>
                <td>{props.content.ticker}</td>
                {showTime && <td>{props.content.filedAt}</td>}
                {/* <td>{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</td> */}
            </tr>
        </>
    )

}