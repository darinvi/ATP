import { useDispatch } from "react-redux"
import { removeFeature } from "../../../store/playbooks";
import { useState } from "react";

export default function VariableInput(props) {

    const dispatch = useDispatch();
    const [saved, setSaved] = useState(false);
    const [entered, setEntered] = useState(false);

    return (
        <div
            className="flex flex-col w-1/2 items-center border-2 bg-cyan-100 rounded-lg"
        >
            <div
                className="bg-cyan-100 w-full pt-2 items-center text-center hover:bg-red-200"
                onClick={() => {
                    dispatch(removeFeature(props.feature));
                }}
                onMouseEnter={()=>setEntered(true)}
                onMouseLeave={()=>setEntered(false)}
            >
                <label htmlFor={props.feature}>{!entered ? props.feature : "Delete?"}</label>
            </div>
            <textarea
                id={props.feature}
                className="bg-gray-100 border focus:bg-gray-300 hover:bg-gray-200 border border-gray-600 w-full h-20 rounded-lg focus:rounded-none"
            ></textarea>
        </div>
    )
}