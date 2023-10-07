import { useState } from "react"
import ExternalHTMLViewer from "./components/components/ExternalHTMLViewer"
import ListFilings from "./components/ListFilings"


export default function Filing() {
    const [currentHTML, setCurrentHTML] = useState('')


    return (
        <div className="display-html">
            <ListFilings setHTML={setCurrentHTML} />
            {currentHTML && <ExternalHTMLViewer content={currentHTML} />}
        </div>
    )
}