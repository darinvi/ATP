import SingleFiling from './singleFiling'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { loadFilings, cleanFilings, setShowAll } from '../../../store/filings';

export default function ListFilings(props) {

    const dispatch = useDispatch();
    const showTime = useSelector(state => state.entities.filings.showTime)
    const filings = useSelector(state => state.entities.filings.filings)

    useEffect(() => {
        dispatch(loadFilings());

        return () => {
            dispatch(cleanFilings());
        }
    }, [])

    const renderFilings = filings.map(f => {
        return <SingleFiling content={f} />
    })

    return (
            <table className={`table-fixed ${props.additionalClass}`}>
                <thead className={`grid grid-cols-${showTime ? "3" : "2"} space-x-3 items-stretch m-auto border-b border-gray-900 sticky top-0 bg-gray-200 z-10`}>
                    <th>File</th>
                    <th>Ticker</th>
                    {showTime && <th>Time</th>}
                </thead>
                <tbody>
                    {renderFilings}
                </tbody>
            </table>
    )
}