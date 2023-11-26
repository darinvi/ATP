import { useDispatch, useSelector } from "react-redux"
import { setMaximized } from "../../../../../store/home";
import MaximizedPlaybook from "./playbook/MaximizedPlaybook";


import { useEffect, useRef } from 'react';



export default function MaximizedPage() {
    const myElementRef = useRef(null);
    
    useEffect(() => {
      // Focus the element when the component mounts
      if (myElementRef.current) {
        myElementRef.current.focus();
      }
    }, []);

    const dispatch = useDispatch();
    const currentPost = useSelector(state => state.entities.home.maximizedData)

    const pages = {
        'playbook': <MaximizedPlaybook />
    }

    function handleMinimize() {
        dispatch(setMaximized())
    }
    
    function maximizedPost() {
        return (
            <div
                className="h-[90%] w-[85%] bg-white mx-auto z-30 rounded border-2 border-black relative"
                onDoubleClick={e => e.stopPropagation()} 
                onClick={e => e.stopPropagation()}
            >
                {currentPost && pages[currentPost.post_type]}
            </div>
        )
    }

    return (
        <div
            className="absolute h-full w-full z-20 bg-gray-800 bg-opacity-80 top-0 flex items-center"
            onClick={handleMinimize}
            ref={myElementRef}
            tabIndex="0"
            onKeyDown={e => {
                if (e.code === 'Escape') {
                    dispatch(setMaximized())
                } else if (e.code === 'ArrowUp') {
                    // dispatch data is previous post
                } else if (e.code === 'ArrowDown') {
                    // dispatch data is next post
                }
            }}
        >
            {maximizedPost()}
        </div>
    )
}