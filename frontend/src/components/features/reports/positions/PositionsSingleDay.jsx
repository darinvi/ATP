import { useState } from "react";

export default function PositionsSingleDay(props) {

    const [activeRow, setActiveRow] = useState(null);

    const pClass = "flex-1 text-center"
    const buttonClass = "border-2 border-cyan-900 rounded px-2 hover:bg-green-200 hover:text-black transform active:scale-95"

    const renderPositions = props.positions && Object.entries(props.positions).map((e, i) => {
        const [ticker, data] = e;
        const { unrealized, quantity, realized, commision, ecn_fee, reg_fee, net, total } = data;
        return <>
            <div
                className={`flex ${ticker === 'TOTALS' && "border-t-2 border-cyan-900 mt-2"} text-gray-300 hover:text-white ${activeRow === i && "bg-cyan-900"}`}
                onClick={() => {
                    if (activeRow !== i) {
                        setActiveRow(i)
                    } else {
                        setActiveRow(null)
                    }
                }}
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
            {activeRow === i && (
                <div
                    className="bg-cyan-800 w-full flex py-1"
                >
                    <div className="mx-auto flex gap-8 text-sm text-gray-300">
                        <button
                            className={buttonClass}
                        >
                            Playbook
                        </button>
                        <button
                            className={buttonClass}
                        >
                            Trade Idea
                        </button>
                        <button
                            className={buttonClass}
                        >
                            Dividends
                        </button>
                    </div>
                </div>
            )}
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