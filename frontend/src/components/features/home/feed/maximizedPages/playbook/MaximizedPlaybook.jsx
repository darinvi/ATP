import DisplayMetrics from "./metrics/DisplayMetrics"
import DisplayComments from "./comments/DisplayComments"
import DisplayVariables from "./variables/DisplayVariables"

export default function MaximizedPlaybook(){


    return (
        <div
            className="flex justify-between h-full bg-cyan-900"
        >
            <DisplayMetrics />
            <DisplayVariables />
            <DisplayComments />
        </div>
    )
}