import SingleFiling from './singleFiling'
import { useSelector } from 'react-redux/es/hooks/useSelector'

export default function ListFilings() {

    const filings = useSelector(state => state.entities.filings.filings)

    const renderFilings = filings.map(f => {
        return <SingleFiling content={f}/>
    })

    return (
        <div className='list-filings scroll w-fit overflow-y-auto h-[80vh] border border-gray-900'>
                <table className='table-fixed'>
                    <thead className='grid grid-cols-3 space-x-3 items-stretch m-auto border-b border-gray-900 sticky top-0 bg-gray-200 z-10'>
                        <th>File</th>
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