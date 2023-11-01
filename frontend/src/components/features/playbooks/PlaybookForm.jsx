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

    function handleFormSubmit(e){
        e.preventDefault();
    }

    return (
            <form
                className="flex flex-col items-center gap-4 select-none w-full"
                onSubmit={handleFormSubmit}
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
                <button 
                    disabled={!(ticker && playName && selectedFeatures.length > 0)}
                    className="bg-green-200 hover:bg-green-300 transform hover:scale-105 active:scale-100 px-2 rounded border border-green-400 disabled:bg-gray-100 disabled:scale-100 disabled:border-gray-300"
                    type="submit"
                >Save Playbook</button>
            </form>
    )
}