import { useSelector, useDispatch } from "react-redux";
import { handleComments } from "../../../../../../../store/home";
import { loadPlaybookComments } from "../../../../../../../store/home";

export default function MaximizedVariable(props) {

    const dispatch = useDispatch();
    const commentType = useSelector(state => state.entities.home.playbooks.commentType);

    function handleCommentClick(){
        dispatch(handleComments([props.k, mapFeatures[props.k]]))
        dispatch(loadPlaybookComments())
    }

    const mapFeatures = {
        'market_fundamentals': 'Market Fundamentals',
        'market_technicals': 'Market Technicals',
        'ticker_fundamentals': 'Ticker Fundamentals',
        'ticker_technicals': 'Ticker Technicals',
        'trade_management': 'Trade Management',
        'tape_reading': 'Tape Reading',
    }

    function notActive() {
        return (
            <div className="flex w-full relative items-center border cursor-pointer">
                <p
                    className={`text-center hover:bg-gray-200 w-full py-1 ${props.active == props.k && "bg-gray-200"}`}
                    onClick={() => {
                        if (props.active == props.k) props.setActive("");
                        else props.setActive(props.k);
                    }}
                    onDoubleClick={e => e.stopPropagation()}
                    >{mapFeatures[props.k]}</p>
                <button
                    className={`h-full px-2 hover:text-yellow-300 active:text-white py-1 ${mapFeatures[props.k] == commentType && "bg-gray-200"}`}
                    onDoubleClick={e => e.stopPropagation()}
                    onClick={handleCommentClick}
                >{'>'}</button>
            </div>
        )
    }

    function isActive() {
        return (
            <div
                className="border-b-2 shadow-lg mb-2 py-2"
            >
                <p
                    className="pl-2 select-text"
                    onDoubleClick={e => e.stopPropagation()}
                >{props.v}</p>
            </div>
        )
    }

    return (
        <>
            {
                props.v &&
                <div>
                    {notActive()}
                    {props.active == props.k && isActive()}
                </div>
            }
        </>
    )
}