export default function MetricsTable({ticker}) {

    
    // Click on whichever of the 3 to show the chart for the given day.
    // Click on Var redirects to docs explaining what each var means.
    function tableHead(){
        const colClass = "flex-1 text-center"
        return (
            <div
                className="flex w-full border-b-2 border-gray-300"
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
            'atr': 'ATR',
            'tr': 'TR',
            'range': 'Range',
            'rrng': 'Range/ATR',
            'avgv': 'AVG.V',
            'rvol': 'RVOL',
            'open': 'Open',
            'close': 'Close',
            'chng': 'Change',
        }

        const colClass = "flex-1 text-center"
        
        // color variables vased on how far they are from 0
        const renderMetrics = Object.entries(metrics).map( ([k,v]) => {
            return (
                <div
                    className="flex w-full hover:bg-gray-300"
                >
                    <p
                        className="flex-1 text-cleft border-r-2 border-gray-300"
                        >{v}</p>
                    <p
                        className={colClass}
                    >Test</p>

                    <p
                        className={colClass}
                    >Test</p>

                    <p
                        className={colClass}
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
        <div className="pl-2">
            {tableHead()}
            {tableBody()}
        </div>
    )
}