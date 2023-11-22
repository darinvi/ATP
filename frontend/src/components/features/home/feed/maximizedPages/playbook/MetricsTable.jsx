export default function MetricsTable({ticker}) {

    const colClass = "flex-1 text-center"
    const colClassBody = "flex-1 text-center shrink"
    
    // Click on whichever of the 3 to show the chart for the given day.
    // Click on Var redirects to docs explaining what each var means.
    function tableHead(){
        return (
            <div
                className="flex w-full border-b border-gray-300"
            >
                <p
                    className={colClass}
                >Var</p>

                <p
                    className={colClass}
                >{ticker}</p>

                <p
                    className={colClass}
                >SPY</p>

                <p
                    className={colClass}
                >TLT</p>

            </div>
        )
    }

    // bugs to fix.
    function tableBody(){
        const metrics = {
            'atr': 'ATR: ',
            'tr': 'TR: ',
            'range': 'Range: ',
            'rrng': 'Range/ATR: ',
            'avgv': 'AVG.V: ',
            'rvol': 'RVOL: ',
            'open': 'Open: ',
            'close': 'Close: ',
            'chng': 'Change',
        }

        const renderMetrics = Object.entries(metrics).map( ([k,v]) => {
            return (
                <div
                    className="flex w-full"
                >
                    <p
                        className={colClassBody}
                    >{v}</p>
                    <p
                        className={colClassBody}
                    >Test</p>

                    <p
                        className={colClassBody}
                    >Test</p>

                    <p
                        className={colClassBody}
                    >Test</p>

                </div>
            )
        })

        return (
            <>
                {renderMetrics}
            </>
        )
    }

    return (
        <div className="shrink">
            {tableHead()}
            {tableBody()}
        </div>
    )
}