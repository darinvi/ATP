export default function SingleTrade(props) {
    const trade = props.trade
    const bg_color = trade.net > 0 ? "bg-green" : "bg-red"

    return <div
        className={`${bg_color}-100 hover:bg-gray-300 flex gap-8 justify-between px-4 rounded`}
        onMouseEnter={()=>{props.setInfo({...trade})}}
    >
        <input type="checkbox"></input>
        <p>{trade.ticker}</p>
        <p>{trade.type}</p>
        <p>{parseFloat(trade.net).toFixed(2)}</p>
    </div >
}