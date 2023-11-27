import { useDispatch, useSelector } from "react-redux"
import { modifyName, modifyDescription, removeVariable } from "../../../../../../store/posts";
import { useState } from "react";

export default function TradeIdeaVariable({counter}) {

    const [maximized, setMaximized] = useState(true);

    const dispatch = useDispatch();
    const vars = useSelector(state => state.entities.posts.tradeIdeas.variables);

    function maximizedInput() {
        const sharedInputClass="rounded border-2 border-cyan-900 text-black bg-gray-200 hover:bg-white focus:bg-white"
        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col flex-1 w-1/3">
                    <label
                        className="text-xs"
                        htmlFor={`var-name-${counter}`}
                        >variable name</label>
                    <input
                        id={`var-name-${counter}`}
                        type="text"
                        className={`${sharedInputClass}`}
                        value={vars[counter].name}
                        onChange={e => dispatch(modifyName([counter, e.target.value]))}
                        ></input>
                </div>
                <div className="flex flex-col flex-3 w-full">
                    <label
                        htmlFor={`var-desc-${counter}`}
                        className="text-xs"
                        >variable description</label>
                    <textarea
                        id={`var-desc-${counter}`}
                        type="text"
                        className={`${sharedInputClass} lg:h-20`}
                        value={vars[counter].description}
                        onChange={e => dispatch(modifyDescription([counter, e.target.value]))}
                    ></textarea>
                </div>
            </div>
        )
    }


    function formButtons() {
        const sharedClass = 'text-black text-sm px-3 rounded transform hover:scale-105 active:scale-100'
        return (
            <div className="flex gap-2">
                <button
                    onClick={()=>setMaximized(false)}
                    className={`bg-green-200 hover:bg-green-400 ${sharedClass}`}
                >save</button>
                {validateButton(sharedClass)}
            </div>
        )
    }


    function validateButton(sharedClass) {
        return (
            <button
                    className={`bg-red-200 hover:bg-red-400 ${sharedClass}`} 
                    onClick={()=> {
                        dispatch(removeVariable(counter));
                    }}
                >cancel</button>
        )
    }

    return (
        <>
        {
            maximized
            ?
            <div className="flex flex-col w-full border-y border-cyan-900 py-1 hover:bg-cyan-800 hover:text-gray-300 px-2 gap-1">
                {maximizedInput()}
                {formButtons()}
            </div>
            :
            <>grr</>
        }
        </>
    )
}