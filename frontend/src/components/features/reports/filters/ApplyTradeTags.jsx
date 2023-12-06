import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getTradeTags } from "../../../../store/reports";

export default function ApplyTradeTags({disabledClass, setShowTags}) {

    const buttonClass = "px-2 rounded border-2 border-cyan-800 hover:text-black"

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getTradeTags())
        // return cleanup
    }, [])

    function getTagSelect(){
        return (
            <select className="w-fit">
                <option>tag1</option>
                <option>tag2</option>
                <option>tag3</option>
            </select>
        )
    }

    function createTag(){
        return (
            <div>
                <div>
                    <label htmlFor="create-trade-tag">Tag:</label>
                    <input 
                        id="create-trade-tag"
                        type="text"
                        className=""
                    />
                </div>
            </div>
        )
    }

    function getButtons(){
        return (
            <div className="flex gap-2 h-full overflow-x-auto items-center">
                <button
                    disabled={true}
                    className={`${buttonClass} ${disabledClass}`}
                >Save</button>
                <button
                    className={`${buttonClass} hover:bg-red-200`}
                    onClick={() => setShowTags(false)}
                >Hide</button>
            </div>
        )
    }

    return (
        <div
            className="absolute top-0 left-0 min-w-full max-w-fit h-fit p-4 bg-cyan-900 rounded-b-lg border-b-2 border-x-2 border-cyan-700 flex flex-col gap-6"
        >
            {getTagSelect()}
            {createTag()}
            {getButtons()}
        </div>
    )
}