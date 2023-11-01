import { useState } from "react"
import { useDispatch } from "react-redux";
import { apiCallBegan } from "../../../store/api";
import { setHTML } from "../../../store/filings"
import moment from 'moment-timezone'

export default function SingleFiling(props) {

    const url = props.content.linkToFilingDetails
    const date = new Date(props.content.filedAt)
    const dispatch = useDispatch()

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
                className="grid grid-cols-3 space-x-3 items-stretch m-auto border-b border-gray-300 text-center cursor-pointer hover:bg-gray-300"
                onClick={handleFilingClick}
            >
                <td>{props.content.formType}</td>
                <td>{props.content.ticker}</td>
                <td>{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}</td>
            </tr>
            {/* <button onClick={()=>{
                const formattedDate = moment.tz(props.content.filedAt, 'America/New_York').format('YYYY-MM-DDTHH:mm:ssZ');
                console.log(`Formatted New York time: ${formattedDate.hour()}`);
            }}>WTF</button> */}
        </>
    )

}