import { Link } from "react-router-dom"
import { useState } from "react";
import PlaybookActive from "./PlaybookActive";
import {AiOutlineCaretRight, AiOutlineCaretDown}from 'react-icons/ai';
import { useDispatch } from "react-redux";
import { managePlaybookSeen } from "../../../../store/playbooks";

export default function SinglePlaybook(props) {

    const play = props.play;
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);
    const [firstClick, setFirstClick] = useState(true);

    function notActive() {

        const playbookOverview = "font-medium text-sm mr-2"

        return (
            <div 
                className="flex items-center gap-4 w-full pr-4 cursor-pointer bg-white" 
                onClick={()=>{
                    setIsActive(prev => !prev)
                    if (firstClick) {
                        setFirstClick(false);
                        dispatch(managePlaybookSeen(play.id, true));
                    };
                }}
            >
                <div className="flex flex-col w-full h-full py-3 items-center">
                    <Link to={'/playbook'} className="font-medium hover:text-cyan-700 pb-1 w-fit border-b-2 border-gray-300">PlayBook</Link>
                    <div className="flex w-full justify-around pb-4 pt-2">
                        <p>
                            <span 
                                className={playbookOverview}
                            >By:</span> 
                            <span 
                                className="underline"
                            >{play.user.username}</span></p>
                        
                        <p>
                            <span 
                                className={playbookOverview}
                            >Ticker:</span> 
                            <span 
                                className="underline"
                            >{play.ticker}</span></p>
                        
                        <p>
                            <span 
                                className={playbookOverview}
                            >Play:</span> 
                            <span 
                                className="underline"
                            >{play.play}</span></p>
                        
                        <p>
                            <span 
                                className={playbookOverview}
                            >Created:</span>
                            <span 
                                className="underline"
                            >{play.date.split("T")[0]}</span></p>
                    </div>
                </div>
                    {!isActive ?  (
                        <AiOutlineCaretRight className='h-4' />
                        ) : (
                        <AiOutlineCaretDown className='h-4' />
                    )}
            </div>
        )
    }


    return (
        <div
            className={`border border-gray-300 flex flex-col my-4 items-center hover:bg-gray-200 ${isActive && "border-2 border-gray-900 bg-gray-200 my-8"} w-full`}
        >
            {notActive()}
            <PlaybookActive play={play} active={isActive}/>
        </div>
    )
}