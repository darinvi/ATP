export default function PlaybookActive(props){
    const play = props.play;

    const rowClass = ""
    const spanClassTitle = "font-medium underline"
    const spanClassVar = ""

    return (
        <div className="flex flex-col px-6 border-t border-gray-800 w-full gap-4 py-2 select-text bg-gray-100">
            {play.market_fundamentals && <p className={rowClass}><span className={spanClassTitle}>Market Fundamentals:</span> <span className={spanClassVar}>{play.market_fundamentals}</span></p>}
            {play.market_technicals && <p className={rowClass}><span className={spanClassTitle}>Market Technicals:</span> <span className={spanClassVar}>{play.market_technicals}</span></p>}
            {play.ticker_technicals && <p className={rowClass}><span className={spanClassTitle}>Ticker Technicals:</span> <span className={spanClassVar}>{play.ticker_technicals}</span></p>}
            {play.ticker_fundamentals && <p className={rowClass}><span className={spanClassTitle}>Ticker Fundamentals:</span> <span className={spanClassVar}>{play.ticker_fundamentals}</span></p>}
            {play.trade_management && <p className={rowClass}><span className={spanClassTitle}>Trade Management:</span> <span className={spanClassVar}>{play.trade_management}</span></p>}
            {play.tape_reading && <p className={rowClass}><span className={spanClassTitle}>Tape Reading:</span> <span className={spanClassVar}>{play.tape_reading}</span></p>}
        </div>
    )
}