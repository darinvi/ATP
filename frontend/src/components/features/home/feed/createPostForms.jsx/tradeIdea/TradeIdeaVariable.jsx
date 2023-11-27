import { useDispatch } from "react-redux"

export default function TradeIdeaVariable({ counter, vars, setVars}) {

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
                        value={vars[counter] && vars[counter].name}
                        onChange={e => setVars({...vars, [counter]: {name: e.target.value, description: vars[counter].description}})}
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
                        value={vars[counter] && vars[counter].description}
                        onChange={e => setVars({...vars, [counter]: {description: e.target.value, name: vars[counter].name}})}
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
                    className={`bg-green-200 hover:bg-green-400 ${sharedClass}`}
                >save</button>
                <button
                    className={`bg-red-200 hover:bg-red-400 ${sharedClass}`} 
                    onClick={()=> {
                        // const {[counter], ...rest} = vars;
                        // setVars({...rest})
                    }}
                >cancel</button>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full border-y border-cyan-900 py-1 hover:bg-cyan-800 hover:text-gray-300 px-2 gap-1">
            {maximizedInput()}
            {formButtons()}
        </div>
    )
}