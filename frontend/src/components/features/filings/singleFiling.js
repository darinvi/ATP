import { useState } from "react"
import { useDispatch } from "react-redux";
import { apiCallBegan } from "../../../store/api";
import { setHTML } from "../../../store/filings"

export default function SingleFiling(props) {

    const url = props.content.linkToFilingDetails
    // const filedAt = `${new Date(props.data.filedAt).toISOString().slice(0, 19).replace('T', ' ')} ET`;
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
                className="filing-container"
                onClick={handleFilingClick}
            >
                <td>{props.content.formType}</td>
                <td>{props.content.ticker}</td>
                <td>{props.content.filedAt}</td>
            </tr>
        </>
    )

}