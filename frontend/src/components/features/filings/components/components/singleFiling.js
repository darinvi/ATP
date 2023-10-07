import { useState } from "react"
import { useDispatch } from "react-redux";
import { apiCallBegan } from "../../../../../store/api";

export default function SingleFiling(props) {

    const [isActive, setIsActive] = useState()

    const url = props.data.linkToFilingDetails
    const filedAt = `${new Date(props.data.filedAt).toISOString().slice(0, 19).replace('T', ' ')} ET`;
    const dispatch = useDispatch()

    function handleFilingClick() {
        // fetch(`http://localhost:8000/filings`, {
        //     method: 'POST',
        //     body: {
        //         url
        //     },
        //     headers: {
        //         'Autorization': `Token ${localStorage.getItem('token')}`
        //     }
        // })
        // .then(res => res.json())
        // .then(res => props.setHTMLLink(res.text))
        // .catch(err => console.log(`error fetching html text:\n ${err}`))
        // console.log(props.data.filedAt)
        
        dispatch(apiCallBegan({
            url: 'filings',
            method: 'POST',
            data: {
                url
            },
            headers: {}
        }))
    }

    function handleMouseEnter() {
        setIsActive(true)
    }

    function handleMouseLeave() {
        setIsActive(false)
    }

    return (
        <>
            <tr
                className="filing-container"
                onClick={handleFilingClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <td>{props.data.formType}</td>
                <td>{props.data.ticker}</td>
                <td>{filedAt}</td>
            </tr>
        </>
    )

}