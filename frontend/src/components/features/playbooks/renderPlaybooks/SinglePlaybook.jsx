import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import PlaybookActive from "./PlaybookActive";
import { AiOutlineCaretRight, AiOutlineCaretDown } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { managePlaybookSeen } from "../../../../store/playbooks";

import { setActivePost } from "../../../../store/home";

export default function SinglePlaybook(props) {

    const play = props.play;
    const dispatch = useDispatch();
    const activePost = useSelector(state => state.entities.home.activePost);
    const isActive = activePost === play.id;

    const [firstClick, setFirstClick] = useState(true);
    const [bgColor, setBgColor] = useState("bg-cyan-700");
    const [favorite, setFavorite] = useState(false);
    const [seen, setSeen] = useState(true);


    useEffect(() => {
        const item = document.getElementById(play.counter);
        if (isActive) {
            item.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        } 
        if (isActive) setBgColor("bg-cyan-900");
        const timeoutId = setTimeout(() => {
            if (!isActive && !seen) {
                setBgColor("bg-cyan-700")
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [isActive])

    function notActive() {

        const playbookOverview = "font-medium text-sm mr-2 text-gray-400"
        const dataClass = ""

        return (
            <div
                className={`flex items-center gap-4 w-full pr-4 cursor-pointer ${bgColor}`}
                onClick={() => {
                    if (isActive) dispatch(setActivePost([null, false]))
                    else dispatch(setActivePost([play.id, true]))
                    if (firstClick) {
                        setFirstClick(false);
                        dispatch(managePlaybookSeen(play.id, true));
                    };

                }}
            >
                <div className="flex flex-col w-full h-full py-3 items-center">
                    <Link to={'/playbook'} className="font-medium hover:text-cyan-200 pb-1 w-fit border-b-2 border-cyan-700">PlayBook</Link>
                    <div className="flex w-full justify-around pb-4 pt-2">
                        <p>
                            <span
                                className={playbookOverview}
                            >By:</span>
                            <span
                                className={dataClass}
                            >{play.user.username}</span></p>

                        <p>
                            <span
                                className={playbookOverview}
                            >Ticker:</span>
                            <span
                                className={dataClass}
                            >{play.ticker}</span></p>

                        <p>
                            <span
                                className={playbookOverview}
                            >Play:</span>
                            <span
                                className={dataClass}
                            >{play.play}</span></p>

                        <p>
                            <span
                                className={playbookOverview}
                            >Created:</span>
                            <span
                                className={dataClass}
                            >{play.date.split("T")[0]}</span></p>
                    </div>
                </div>
                {!isActive ? (
                    <AiOutlineCaretRight className='h-4' />
                ) : (
                    <AiOutlineCaretDown className='h-4' />
                )}
            </div>
        )
    }


    return (
        <div
            className={`border border-cyan-700 flex flex-col my-4 items-center text-gray-300 hover:text-white ${isActive && "border-y-2 shadow-2xl mb-8"} w-full text-gray-300`}
            id={play.counter}
        >
            {notActive()}
            <PlaybookActive
                play={play}
                active={isActive}
                seen={seen}
                setSeen={setSeen}
                favorite={favorite}
                setFavorite={setFavorite}
            />
        </div>
    )
}