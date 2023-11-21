import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import FormFeatureSelect from "./FormFeatureSelect"
import FormTagSelect from "./FromTagSelect"
import VariableInput from "./VariableInput"
import { createPlaybook } from "../../../store/playbooks"

export default function PlaybookForm() {

    const [feature, setFeature] = useState("")
    const [ticker, setTicker] = useState("")
    const [isPublic, setIsPublic] = useState(true);
    const [playName, setPlayName] = useState("")

    const dispatch = useDispatch();
    const playbook = useSelector(state => state.entities.playbooks.playbook)
    const storeTicker = useSelector(state => state.entities.playbooks.ticker)

    const selectedFeatures = useSelector(state => state.entities.playbooks.selectedFeatures)
        .map(feature => <VariableInput feature={feature} />)

    useEffect(() => {
        setTicker(storeTicker)
    }, [storeTicker])

    function handleFormSubmit(e) {
        e.preventDefault();
        dispatch(createPlaybook(ticker, playName, isPublic));
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
                        onChange={(e) => setTicker(e.target.value)}
                        id="ticker"
                        className="bg-gray-100 border border-gray-400 rounded focus:bg-gray-300 transform hover:scale-105"
                    ></input>
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="playname">Play Name:</label>
                    <input
                        value={playName}
                        onChange={(e) => setPlayName(e.target.value)}
                        id="playname"
                        className="bg-gray-100 border border-gray-400 rounded focus:bg-gray-300 transform hover:scale-105"
                    ></input>
                </div>
            </div>

            <FormFeatureSelect setFeature={setFeature} feature={feature} />
            <FormTagSelect />
            {selectedFeatures}

            <div className="flex gap-1">
                <label htmlFor="private">Public</label>
                <input
                    type="checkbox"
                    id="private"
                    checked={isPublic}
                    onChange={() => setIsPublic(prev => !prev)}
                ></input>
            </div>

            <button
                disabled={!(ticker && playName && Object.keys(playbook).length > 0)}
                className="bg-green-200 hover:bg-green-300 transform hover:scale-105 active:scale-100 px-2 rounded border border-green-400 disabled:bg-gray-100 disabled:scale-100 disabled:border-gray-300"
                type="submit"
            >Save Playbook</button>
        </form>
    )
}