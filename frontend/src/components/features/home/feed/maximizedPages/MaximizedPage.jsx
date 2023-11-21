import { useDispatch, useSelector } from "react-redux"
import { setMaximized } from "../../../../../store/home";

export default function MaximizedPage() {

    const dispatch = useDispatch();
    const currentPost = useSelector(state => state.entities.home.maximizedData)

    const pages = {
        // 'playbook': 
    }

    function handleMinimize() {
        dispatch(setMaximized())
    }

    return (
        <div
            className="absolute h-[92vh] w-full z-20 bg-green-700"
            tabIndex="0"
            onKeyDown={e => {
                if (e.code == 'Escape') {
                    handleMinimize()
                }
            }}
            onDoubleClick={handleMinimize}
        >
            <div className="bg-yellow-400 w-full">
                <button
                    className="bg-red-200 hover:bg-red-300 rounded border border-red-900 transform hover:scale-105 active:scale-100 ml-2 mt-1 px-2"
                    onClick={() => {
                        dispatch(setMaximized())
                    }}
                >Minimize</button>
            </div>
            {/* {currentPost && pages[currentPost.type]} */}
        </div>
    )
}