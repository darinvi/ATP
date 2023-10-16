export default function ShowTradeDetails(props) {
    const trade = props.trade

    return <div className="flex flex-col gap-2">
        <p>Ticker: {trade.ticker}</p>
        <div className="flex gap-8">
            <p>Net: {parseFloat(trade.net).toFixed(2)} </p>
            <p>Gross: {parseFloat(trade.net + trade.commission + trade.fees).toFixed(2)}</p>
        </div>
        <p>Opened Date: {trade.date_open} at {trade.time_open}</p>
        <p>Closed Date: {trade.date_closed} at {trade.time_closed}</p>
        <p>Held: {trade.held}</p>
        <p>Type: {trade.intraday ? "Intraday" : "Swing"}</p>
        <p>Direction: {trade.type}</p>
        <p>Entry: {trade.entry_price}</p>
        <p>Exit: {trade.exit_price}</p>
        <p>quantity: {trade.quantity}</p>
        <p>Commission: {trade.commission}</p>
        <p>Fees: {trade.fees}</p>
    </div>
}