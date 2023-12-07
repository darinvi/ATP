import { useDispatch } from "react-redux"
import { useState } from "react";
import { handleCheckedTrades } from "../../../../store/reports";

export default function SingleTrade(props) {
    const trade = props.trade
    const bg_color = trade.net > 0 ? "bg-green-100 hover:bg-green-300" : "bg-red-100 hover:bg-red-300"

    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);

    return <>
        {trade.filtered !== false && 
        <div
            className={`${bg_color} flex gap-8 justify-between px-4 rounded`}
            onMouseEnter={()=>{props.setInfo({...trade})}}
            onClick={()=> {
                setChecked(prev => {
                    const newState = !prev;
                    dispatch(handleCheckedTrades([trade.hashed, newState]));
                    return newState;
                });
            }}
        >
            <input 
                type="checkbox"
                checked={checked}
                onChange={()=>{}} //so the err in console doesn't show
            />
            <p>{trade.ticker}</p>
            <p>{trade.type}</p> 
            <p>{parseFloat(trade.net).toFixed(2)}</p>
        </div >}
    </>
}