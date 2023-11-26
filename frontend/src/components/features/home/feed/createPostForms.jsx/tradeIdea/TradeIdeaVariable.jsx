import { useDispatch } from "react-redux"

export default function TradeIdeaVariable(props) {

    function maximizedInput() {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex flex-col flex-1 w-1/3">
                    <label
                        className="text-xs"
                        htmlFor={`var-name-${props.counter}`}
                        >variable name</label>
                    <input
                        id={`var-name-${props.counter}`}
                        type="text"
                        className="rounded border-2 border-cyan-900 text-black"
                        value={props.vars[props.counter] && props.vars[props.counter].name}
                        onChange={e => props.setVars({...props.vars, [props.counter]: {name: e.target.value, description: props.vars[props.counter].description}})}
                        ></input>
                </div>
                <div className="flex flex-col flex-3 w-full">
                    <label
                        htmlFor={`var-desc-${props.counter}`}
                        className="text-xs"
                        >variable description</label>
                    <textarea
                        id={`var-desc-${props.counter}`}
                        type="text"
                        className="rounded border-2 border-cyan-900 lg:h-20 text-black"
                        value={props.vars[props.counter] && props.vars[props.counter].description}
                        onChange={e => props.setVars({...props.vars, [props.counter]: {description: e.target.value, name: props.vars[props.counter].name}})}
                    ></textarea>
                </div>
            </div>
        )
    }


    function formButtons() {
        return (
            <div className="flex gap-2">
                <button>save</button>
                <button
                    onClick={()=> {
                        // del
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