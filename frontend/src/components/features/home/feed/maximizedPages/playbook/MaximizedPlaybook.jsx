import DisplayMetrics from "./metrics/DisplayMetrics"
import DisplayComments from "./comments/DisplayComments"
import DisplayVariables from "./variables/DisplayVariables"

export default function MaximizedPlaybook(){


    return (
        <div
            className="flex justify-between pr-8 h-full"
        >
            <DisplayMetrics />
            <DisplayVariables />
            <DisplayComments />
        </div>
    )
}