import { useDispatch } from "react-redux"
import { modifyName } from "../../../../../../store/posts";
import { useState } from "react";

// instead pass collection and fetch the created tags of the user for the given collection + the build in names.
export default function VariableSelect({ variables, counter }) {

    const dispatch = useDispatch();
    const [isCustom, setIsCustom] = useState(true);

    function createVariable() {
        return (
            <button
                className="w-fit text-sm pl-1 text-gray-300 hover:text-white"
            >
                save name
            </button>
        )
    }

    function varSelect() {
        return (
            <div
                className="flex"
            >
                <select
                    className="bg-cyan-800 text-gray-300 hover:text-white text-sm"
                    onChange={e => {
                        if (e.target.value !== 'custom') {
                            dispatch(modifyName([counter, e.target.value]))
                            setIsCustom(false);
                        } else {
                            setIsCustom(true);
                        }
                    }}
                >
                    <option>custom</option>
                    {
                        Object.keys(variables).map(e => {
                            return (
                                <option>{e}</option>
                            )
                        })
                    }
                </select>
            </div>
        )
    }
    
    return (
        <div className="w-1/3">
            <div className="flex flex-col gap-1 w-1/3 mx-auto">
                {varSelect()}
                { isCustom && createVariable()}
            </div>
        </div>
    )
}