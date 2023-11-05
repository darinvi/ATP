import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { loadPublicPlaybooks } from "../../../../store/playbooks";
import SinglePlaybook from "./SinglePlaybook";

export default function RenderPlaybooks(){

    const dispatch = useDispatch();
    const playbooks = useSelector(state => state.entities.playbooks.playbookList)

    useEffect(()=>{
        dispatch(loadPublicPlaybooks());
    },[])

    return (
        <div className="w-full">
            {playbooks && playbooks.map(play => <SinglePlaybook play={play} />)}
        </div>
    )
}