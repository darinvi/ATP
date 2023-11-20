import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { filterPostType, removeFiltered } from "../../../../store/home";

export default function PostTypeButton(props){

    const dispatch = useDispatch();

    const [isActive, setIsActive] = useState(true);
    const isMentor = useSelector(state => state.auth.mentor)
    
    const protectedTypes = ['Journals (trainees)', 'Mentee questions']
    const showButton = protectedTypes.includes(props.postType) ? ( isMentor ? true : false ) : true
     
    function handleButtonClick(){
        if (isActive) {
            dispatch(filterPostType(props.postType))
            // if (localStorage.getItem('feedFilters')) {

            //     localStorage.setItem('feedFilters', [localStorage.getItem('feedFilters'), props.postType])
            // } else {
            //     localStorage.setItem('feedFilters', [props.postType])
            // }
        } else {
            dispatch(removeFiltered(props.postType))
        }
        setIsActive(prev => !prev);
    }

    return ( <>
        { showButton && (
            <button 
                onClick={handleButtonClick}
                className={`bg-cyan-200 border border-gray-800 text-xs h-fit px-1 ml-2 rounded hover:text-gray-500 hover:px-2 transform active:scale-95 ${!isActive && 'line-through'}`}
            >{props.postType}</button>
        )}
    </>
    ) 
}