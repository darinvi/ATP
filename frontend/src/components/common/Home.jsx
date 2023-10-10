import { useDispatch } from "react-redux"
import { apiCallBegan } from "../../store/api";

export default function Home() {

    const dispatch = useDispatch();

    function handleButtonclick(){
        dispatch(apiCallBegan({
            data: {},
            method: 'POST',
            url: 'test-user',
            headers: {}
        }))
    }


    return(
    <div className="flex flex-col items-center">
        <h1 className="mx-auto">Katy e sexy!</h1>
        <button onClick={handleButtonclick}>test</button>
    </div>)
}