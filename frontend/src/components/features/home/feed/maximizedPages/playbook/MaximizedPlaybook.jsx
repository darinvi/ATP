import DisplayMetrics from "./DisplayMetrics"
import DisplayComments from "./DisplayComments"
import DisplayVariables from "./DisplayVariables"

export default function MaximizedPlaybook(){


    return (
        <div
            className="flex justify-between pr-8"
        >
            <DisplayMetrics />
            <DisplayVariables />
            <DisplayComments />
        </div>
    )
}