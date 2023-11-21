import { useState } from "react";
import { useDispatch } from "react-redux";
import { managePlaybookSeen } from "../../../../store/playbooks";
import RenderPlaybookTags from "./RenderPlaybookTags";
import { setMaximized } from "../../../../store/home";

export default function PlaybookActive(props) {
    const play = props.play;
    const dispatch = useDispatch();

    const rowClass = ""
    const spanClassTitle = "font-medium underline select-none"
    const spanClassVar = ""

    const [favorite, setFavorite] = useState(false);
    const [seen, setSeen] = useState(true);

    function handleSeenClick() {
        dispatch(managePlaybookSeen(play.id, !seen))
        setSeen(prev => !prev)
    }

    function checkBoxes() {
        return (
            <div className="mx-auto flex gap-6 select-none border-t-2 border-gray-300 pt-2">
                <div className="flex gap-1 transform hover:scale-105">
                    <label htmlFor={`fav-pb-${play.id}`}>Favorite</label>
                    <input
                        id={`fav-pb-${play.id}`}
                        type="checkbox"
                        checked={favorite}
                        onChange={() => setFavorite(prev => !prev)}
                    />
                </div>
                <div className="flex gap-1 transform hover:scale-105">
                    <label htmlFor={`seen-pb-${play.id}`}>Seen</label>
                    <input
                        id={`seen-pb-${play.id}`}
                        type="checkbox"
                        checked={seen}
                        onChange={handleSeenClick}
                    />
                </div>
            </div>
        )
    }

    function handleMaximized(){
        dispatch(setMaximized(play));
    }

    return (
        <div 
            className={`flex flex-col px-6 border-t border-black w-full gap-6 pt-4 pb-6 select-text bg-white ${!props.active && "hidden"}`}
            onClick={handleMaximized}
        >
            {play.market_fundamentals && <p className={rowClass}><span className={spanClassTitle}>Market Fundamentals:</span> <span className={spanClassVar}>{play.market_fundamentals}</span></p>}
            {play.market_technicals && <p className={rowClass}><span className={spanClassTitle}>Market Technicals:</span> <span className={spanClassVar}>{play.market_technicals}</span></p>}
            {play.ticker_technicals && <p className={rowClass}><span className={spanClassTitle}>Ticker Technicals:</span> <span className={spanClassVar}>{play.ticker_technicals}</span></p>}
            {play.ticker_fundamentals && <p className={rowClass}><span className={spanClassTitle}>Ticker Fundamentals:</span> <span className={spanClassVar}>{play.ticker_fundamentals}</span></p>}
            {play.trade_management && <p className={rowClass}><span className={spanClassTitle}>Trade Management:</span> <span className={spanClassVar}>{play.trade_management}</span></p>}
            {play.tape_reading && <p className={rowClass}><span className={spanClassTitle}>Tape Reading:</span> <span className={spanClassVar}>{play.tape_reading}</span></p>}
            <RenderPlaybookTags tags={play.tags} />
            {checkBoxes()}
        </div>
    )
}