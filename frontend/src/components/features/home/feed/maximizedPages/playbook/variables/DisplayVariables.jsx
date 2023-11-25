import { useSelector } from "react-redux"
import MaximizedVariable from "./MaximizedVariable"
import { useState } from "react"

export default function DisplayVariables() {

    const play = useSelector(state => state.entities.home.maximizedData)
    const [active, setActive] = useState("");

    const variables = [
        'market_fundamentals',
        'market_technicals',
        'ticker_technicals',
        'ticker_fundamentals',
        'trade_management',
        'tape_reading'
    ]

    // var components that are 
    return (
        < div className="flex flex-col flex-1 border-x-2 w-full pt-2">
            {variables.map( e => {
                return (
                    <MaximizedVariable 
                        k={e} 
                        v={play[e]} 
                        active={active}
                        setActive={setActive}
                    />
                )
            })}
        </div>
    )
}