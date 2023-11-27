import { useDispatch, useSelector } from "react-redux"
import { modifyName, modifyDescription, removeVariable, activateCancel, deactivateCancel } from "../../../../../../store/posts";
import { useState } from "react";
import MinimizedIdea from "./MinimizedVariable";

export default function TradeIdeaVariable({ counter }) {

    const [maximized, setMaximized] = useState(true);

    const dispatch = useDispatch();
    const vars = useSelector(state => state.entities.posts.tradeIdeas.variables);
    const cancels = useSelector(state => state.entities.posts.tradeIdeas.cancelActive);

    function maximizedInput() {
        const sharedInputClass = "rounded border-2 border-cyan-900 text-black bg-gray-200 hover:bg-white focus:bg-white"
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
        const sharedClass = 'text-sm px-3 rounded transform hover:scale-105 active:scale-100 text-gray-300 border border-cyan-900 hover:text-black opacity-70 hover:opacity-100 '
        const disabledClass = "disabled:opacity-20 disabled:border-2 disabled:border-gray-900 disabled:scale-100 disabled:bg-gray-900 disabled:text-gray-300"
        return (
            <div className="flex gap-2">
                <button
                    disabled={!(vars[counter].name && vars[counter].description)}
                    onClick={() => setMaximized(false)}
                    className={`hover:bg-green-400 ${sharedClass} disabled:bg-gray-100 disabled:scale-100 ${disabledClass}`}
                >minimize</button>
                {validateButton(sharedClass)}
            </div>
        )
    }


    function validateButton(sharedClass) {
        return (
            <>
                {
                    cancels.includes(counter)
                        ?
                        <div className="flex gap-4">
                            <p>proceed?</p>
                            <button
                                onClick={() => {
                                    dispatch(removeVariable(counter));
                                    dispatch(deactivateCancel(counter));
                                }}
                                className="text-green-200 hover:text-green-400"
                                >yes</button>
                            <button
                                className="text-red-200 hover:text-red-400"
                                onClick={() => dispatch(deactivateCancel(counter))}
                            >no</button>
                        </div>
                        :
                        <button
                            className={`text-gray-300 border border-cyan-900 hover:bg-red-400 ${sharedClass} px-5`}
                            onClick={() => {
                                if (vars[counter].name || vars[counter].description) dispatch(activateCancel(counter));
                                else dispatch(removeVariable(counter));
                            }}
                        >cancel</button>
                }
            </>
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
                    <MinimizedIdea setMaximized={setMaximized} name={vars[counter].name}/>
            }
        </>
    )
}