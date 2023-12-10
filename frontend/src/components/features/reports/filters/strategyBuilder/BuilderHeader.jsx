import { useDispatch } from "react-redux"
import { setActiveSelect } from "../../../../../store/reports"

export default function BuilderHeader() {

    const dispatch = useDispatch();

    return (
        <div
            className="flex justify-between w-full"
        >
            <p></p>
            <svg
                class="h-6 w-6 hover:text-red-300"
                xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor"
                aria-hidden="true"
                onClick={() => dispatch(setActiveSelect(""))}
            >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>
    )
}