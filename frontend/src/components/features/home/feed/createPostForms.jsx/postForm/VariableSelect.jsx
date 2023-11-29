import { useDispatch, useSelector } from "react-redux"
import { modifyName } from "../../../../../../store/posts";

export default function VariableSelect({ variables, counter }) {

    const dispatch = useDispatch();

    // function variableInput() {
    //     return (
    //         <div className="flex flex-col w-1/3">
    //             <label
    //                 className="text-xs"
    //                 htmlFor={`var-name-${counter}`}
    //             >variable name</label>
    //             <input
    //                 id={`var-name-${counter}`}
    //                 type="text"
    //                 onClick={e => e.stopPropagation()}
    //                 className={`${sharedInputClass}`}
    //                 value={vars[counter].name}
    //                 onChange={e => dispatch(modifyName([counter, e.target.value]))}
    //             ></input>
    //         </div>
    //     )
    // }


    function varSelect() {
        return (
            <select
                className="bg-cyan-800 text-gray-300 hover:text-white text-sm"
                onChange={e => dispatch(modifyName([counter, e.target.value]))}
            >
                <option
                    selected={true}
                >custom</option>
                {
                    Object.keys(variables).map(e => {
                        return (
                            <option>{e}</option>
                        )
                    })
                }
            </select>
        )
    }

    return (
        <div className="flex">
            {/* {variableInput()} */}
            {varSelect()}
        </div>
    )
}