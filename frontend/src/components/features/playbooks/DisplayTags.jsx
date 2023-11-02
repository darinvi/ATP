import { useDispatch, useSelector } from "react-redux"
import { removeTag } from "../../../store/playbooks";

export default function DisplayTags(){

    const dispatch = useDispatch();
    const selectedTags = useSelector(state => state.entities.playbooks.selectedTags);

    return (
        <div className="flex gap-6">
            {Object.entries(selectedTags).map( ([key, value]) => {
                return (
                    <p 
                        className="bg-green-300 hover:bg-red-300 px-2 rounded transform hover:scale-95"
                        onClick={()=>{
                            dispatch(removeTag(key));
                        }}
                    >{value}</p>
                ) 
            })}
        </div>
    )
}