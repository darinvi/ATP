import { useState } from "react"
import { useDispatch } from "react-redux"

export default function PrefColnames(props){
    
    const [isAscending, setIsAscending] = useState(true)
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);

    return (
        <th 
            className="text-center transform hover:scale-105 text-xl cursor-pointer"
            onClick={()=>{
                props.setSorted(props.text);
                console.log(props.sorted)
                if (props.reducer) {
                    setIsAscending(prev => !prev)
                    dispatch(props.reducer(isAscending))
                }
            }}
        >   
                <p className={`${props.sorted === props.text && "text-gray-400"}`}>{props.text}</p>
        </th>
    )
}