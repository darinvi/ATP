import { useDispatch } from "react-redux"
import { setActiveSelect } from "../../../../../store/reports"
import ClosingSVG from "../../../../utils/ClosingSVG"

export default function BuilderHeader() {

    const dispatch = useDispatch();

    return (
        <div
            className="flex justify-between w-full"
        >
            <p></p>
            <ClosingSVG
                onClick={() => dispatch(setActiveSelect(""))}
            />
        </div>
    )
}