import { useSelector } from "react-redux"

export default function DisplayVariables() {

    const play = useSelector(state => state.entities.home.maximizedData)

    return (
        < div className="flex flex-col flex-1 items-center" >
            <p>Variables</p>
        </div>
    )
}