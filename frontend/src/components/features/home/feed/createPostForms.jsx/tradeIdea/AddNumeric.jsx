import { useState } from "react"
import { useDispatch } from "react-redux";
import { addNumericVariable } from "../../../../../../store/posts";

export default function AddNumeric({ counter }) {

    const [isActive, setIsActive] = useState("");
    const [numeric, setNumeric] = useState(null);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col w-1/3 text-gray-300 pl-4 text-sm gap-1">
            <p className="hover:text-white"
                onClick={() => setIsActive(prev => !prev)}
            >
                {
                    isActive
                        ?
                        "save"
                        :
                        numeric ? "Edit numeric": "Add numeric" 
                }
            </p>
            {
                isActive 
                ?
                <input
                    type="number"
                    step="0.01"
                    value={numeric}
                    placeholder="0.00"
                    className="bg-cyan-900 rounded w-2/3 pl-2"
                    onChange={e => {
                        dispatch(addNumericVariable([counter, e.target.value]));
                        setNumeric(e.target.value);
                    }}
                    onKeyDown={e => {
                        if (e.code === 'Enter') setIsActive(false)
                    }}
                ></input>
                :
                <p className={numeric > 0 ? "text-green-200" : "text-red-200"}>{numeric}</p>
            }
        </div>
    )
}