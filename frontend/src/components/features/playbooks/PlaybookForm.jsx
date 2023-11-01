import FormFeatureSelect from "./FormFeatureSelect"
import { useState } from "react"
import { useSelector } from "react-redux"
import VariableInput from "./VariableInput"

export default function PlaybookForm(){

    const [feature, setFeature] = useState("")
    const [ticker, setTicker] = useState("")
    const [playName, setPlayName] = useState("")

    const selectedFeatures = useSelector(state => state.entities.playbooks.selectedFeatures)
        .map(feature => <VariableInput feature={feature} />)


    return (
            <form
                className="flex flex-col items-center gap-4 select-none"
            >
                <div className="flex gap-2">
                    <div className="flex flex-col items-center">
                        <label htmlFor="ticker">Ticker:</label>
                        <input
                            value={ticker}
                            onChange={(e)=>setTicker(e.target.value)} 
                            id="ticker"
                            className="bg-gray-100 border border-gray-400 rounded focus:bg-gray-300 transform hover:scale-105"
                            ></input>
                    </div>
                    <div className="flex flex-col items-center">
                        <label htmlFor="playname">Play Name:</label>
                        <input 
                            value={playName}
                            onChange={(e)=>setPlayName(e.target.value)} 
                            id="playname"
                            className="bg-gray-100 border border-gray-400 rounded focus:bg-gray-300 transform hover:scale-105"
                        ></input>
                    </div>
                </div>
                <FormFeatureSelect setFeature={setFeature} feature={feature} />
                {selectedFeatures}
            </form>
    )
}