export default function ShowTradeDetails(props) {
    const trade = props.trade

    return <div className="flex flex-col gap-2">
        <p className="border-b border-gray-300">Ticker: <span className="font-bold">{trade.ticker}</span></p>
        <div className="flex gap-8 border-b border-gray-300">
            <p>Net: <span className="font-medium">{parseFloat(trade.net).toFixed(2)}</span></p>
            <p>Gross: <span className="font-medium">{parseFloat(trade.net + trade.commission + trade.fees).toFixed(2)}</span></p>
        </div>
        <p className="border-b border-gray-300">Opened Date: <span className="font-bold">{trade.date_open} at {trade.time_open}</span></p>
        <p className="border-b border-gray-300">Closed Date: <span className="font-bold">{trade.date_closed} at {trade.time_closed}</span></p>
        <p className="border-b border-gray-300">Held: <span className="font-bold">{trade.held}</span></p>
        <p className="border-b border-gray-300">Type: <span className="font-bold">{trade.intraday ? "Intraday" : "Swing"}</span></p>
        <p className="border-b border-gray-300">Direction: <span className="font-bold">{trade.type}</span></p>
        <p className="border-b border-gray-300">Entry: <span className="font-bold">{trade.entry_price}</span></p>
        <p className="border-b border-gray-300">Exit: <span className="font-bold">{trade.exit_price}</span></p>
        <p className="border-b border-gray-300">quantity: <span className="font-bold">{trade.quantity}</span></p>
        <p className="border-b border-gray-300">Commission: <span className="font-bold">{trade.commission}</span></p>
        <p className="border-b border-gray-300">Fees: <span className="font-bold">{trade.fees}</span></p>
    </div>
}