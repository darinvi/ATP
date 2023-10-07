import SingleFiling from './components/singleFiling'

const jsons = require('../../../../example_responses')

export default function ListFilings(props) {
    const renderFilings = jsons.allFilingTypes.filings.map(e => {
        return <SingleFiling
            setHTMLLink={props.setHTML}
            data={e}
        />
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