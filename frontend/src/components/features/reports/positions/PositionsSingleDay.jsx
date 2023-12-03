export default function PositionsSingleDay(props) {

    const pClass = "flex-1 text-center"

    const renderPositions = props.positions && Object.entries(props.positions).map(e => {
        const [ticker, data] = e;
        const { unrealized, quantity, realized, commision, ecn_fee, reg_fee, net, total } = data;
        return <>
            <div 
                className={`flex ${ticker === 'TOTALS' && "border-t-2 border-cyan-900 mt-2"} text-gray-300 hover:text-white`}
            >
                <p className={pClass}>{ticker}</p>
                <p className={pClass}>{unrealized}</p>
                <p className={pClass}>{quantity}</p>
                <p className={pClass}>{realized}</p>
                <p className={pClass}>{commision}</p>
                <p className={pClass}>{ecn_fee}</p>
                <p className={pClass}>{reg_fee}</p>
                <p className={pClass}>{net}</p>
                <p className={pClass}>{total}</p>
            </div>
        </>
    })

    return <div className="flex flex-col items-center w-full text-gray-300 hover:text-white">
        <p>{props.day}</p>
        <div className="flex flex-col w-full border-y-2 border-cyan-700 py-2 hover:bg-cyan-700">
            <div className="flex border-b-2 border-cyan-900 mb-2">
                <p className={pClass}>ticker</p>
                <p className={pClass}>unrealized</p>
                <p className={pClass}>quantity</p>
                <p className={pClass}>realized</p>
                <p className={pClass}>commission</p>
                <p className={pClass}>ecn fee</p>
                <p className={pClass}>reg. fee</p>
                <p className={pClass}>net</p>
                <p className={pClass}>total</p>
            </div>
            <div className="w-full">
                {renderPositions}
            </div>
        </div>
    </div>
}