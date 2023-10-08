import SingleFiling from './singleFiling'
import { useSelector } from 'react-redux/es/hooks/useSelector'

export default function ListFilings() {

    const filings = useSelector(state => state.entities.filings.filings)

    const renderFilings = filings.map(f => {
        return <SingleFiling content={f}/>
    })

    return (
        <div className='list-filings scroll'>
                <table className='filing-table'>
                    <thead>
                        <th>File Type</th>
                        <th>Ticker</th>
                        <th>Time</th>
                    </thead>
                    <tbody>
                        {renderFilings}
                    </tbody>
                </table>
        </div>
    )
}