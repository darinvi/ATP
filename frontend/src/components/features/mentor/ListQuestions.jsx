import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUnansweredQuestions } from "../../../store/mentor"

export default function ListQuestions(){
    
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUnansweredQuestions())
    },[])
}