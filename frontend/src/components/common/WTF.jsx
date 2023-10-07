import { useDispatch } from "react-redux";
import { loadFilings } from "../../store/filings";
import { useEffect } from "react";

export default function WTF(){

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(loadFilings())
    },[])

}