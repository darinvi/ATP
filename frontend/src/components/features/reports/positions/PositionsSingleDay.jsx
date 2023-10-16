export default function PositionsSingleDay(props) {
    const renderPositions = props.positions && Object.entries(props.positions).map(e => {
        const [ticker, data] = e;
        const { unrealized, quantity, realized, commision, ecn_fee, reg_fee, net, total } = data;
        return <>
            <tr>
                <td>{ticker}</td>
                <td>{unrealized}</td>
                <td>{quantity}</td>
                <td>{realized}</td>
                <td>{commision}</td>
                <td>{ecn_fee}</td>
                <td>{reg_fee}</td>
                <td>{net}</td>
                <td>{total}</td>
            </tr>
        </>
    })

    return <div className="shadow container mx-auto p-4">
        <p>{props.day}</p>
        <table className="table-auto">
            <thead>
                <tr>
                <th>ticker</th>
                <th>unrealized</th>
                <th>quantity</th>
                <th>realized</th>
                <th>commission</th>
                <th>ecn fee</th>
                <th>regulatory fee</th>
                <th>net</th>
                <th>total</th>
                </tr>
            </thead>
            <tbody>
                {renderPositions}
            </tbody>
        </table>
    </div>
}