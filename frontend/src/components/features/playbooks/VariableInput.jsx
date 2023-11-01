import { useDispatch } from "react-redux"
import { removeFeature, removeFeatureText, addFeatureText } from "../../../store/playbooks";
import { useState } from "react";

export default function VariableInput(props) {

    const dispatch = useDispatch();
    const [entered, setEntered] = useState(false);
    const [text, setText] = useState("");
    const [saved, setSaved] = useState("");

    return (
        <div
            className="flex flex-col w-1/2 items-center border-2 bg-cyan-100 rounded-lg"
        >
            <div className="flex w-full">
                <div
                    className="bg-cyan-100 border border-cyan-300 w-full py-1 items-center text-center hover:bg-red-200 hover:border-red-400 rounded-l-md"
                    onClick={() => {
                        dispatch(removeFeature(props.feature));
                        dispatch(removeFeatureText(props.feature));
                    }}
                    onMouseEnter={()=>setEntered(true)}
                    onMouseLeave={()=>setEntered(false)}
                >
                    <label htmlFor={props.feature}>{!entered ? props.feature : "Delete?"}</label>
                </div>
                <button 
                    disabled={!text}
                    onClick={(e)=>{
                        e.preventDefault();
                        if (!saved) {
                            dispatch(addFeatureText([props.feature, text]));
                            setSaved(true);
                        } else {
                            setSaved(false);
                        }
                    }}
                    className={`px-6 border ${!saved ? "bg-green-200 hover:bg-green-300 border-green-500 rounded-r-md" : "bg-orange-200 hover:bg-orange-300 border-orange-300 rounded-r-md" }  disabled:bg-gray-100 disabled:border-gray-300`}
                >{saved? "Edit" : "Save" }</button>
            </div>
            <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                id={props.feature}
                className={`bg-gray-100 border focus:bg-gray-300 hover:bg-gray-200 border border-gray-600 w-full h-20 rounded-lg focus:rounded-none ${saved && "hidden"}`}
            ></textarea>
        </div>
    )
}