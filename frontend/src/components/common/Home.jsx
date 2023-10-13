import { useDispatch } from "react-redux"
import { apiCallBegan } from "../../store/api";

export default function Home() {

    const dispatch = useDispatch();

    return(
    <div className="flex flex-col items-center">
        <h1 className="mx-auto">Katy e sexy!</h1>
        <h1>Add market holidays</h1>
    </div>)
}