import { useSelector } from "react-redux"

export default function MaximizedPlaybook(){

    const play = useSelector(state => state.entities.home.maximizedData)

    return (
        <div>
            <p>{play.play}</p>
        </div>
    )
}