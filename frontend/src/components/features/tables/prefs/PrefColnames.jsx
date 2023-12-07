import { useState } from "react"
import { useDispatch } from "react-redux"

export default function PrefColnames(props){
    
    const [isAscending, setIsAscending] = useState(true)
    const dispatch = useDispatch();

    return (
        <th 
            className="text-center transform hover:scale-105 text-xl cursor-pointer flex-1"
            onClick={()=>{
                props.setSorted(props.text);
                if (props.reducer) {
                    setIsAscending(prev => !prev)
                    dispatch(props.reducer(isAscending))
                }
            }}
        >   
                <p className={`${props.sorted === props.text && "text-cyan-400"}`}>{props.text}</p>
        </th>
    )
}