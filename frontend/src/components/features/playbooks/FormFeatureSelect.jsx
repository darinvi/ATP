import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { selectFeature } from "../../../store/playbooks";

// decided to try spreading the code like this as I had an experience with growing a form too much, hard for maintaining in the future
export default function FormFeatureSelect(props){

    const [changed, setChanged] = useState(false);
    const selectedFeatures = useSelector(state => state.entities.playbooks.selectedFeatures);
    const dispatch = useDispatch();

    const features = [
        'Market Fundamentals',
        'Market Technicals',
        'Ticker Fundamentals',
        'Ticker Technicals',
        'Ticker Metrics',
        'Trade Management',
        'Tape Reading',
    ]
    
    const renderFeatures = features.map( feature => {
        return (
            <option
                className="disabled:hidden"
                disabled={selectedFeatures.includes(feature)}
            >{feature}</option>
        )
    })

    return (
        <div className="flex gap-2">
            
            <select 
                onChange={e => {
                    props.setFeature(e.target.value);
                    setChanged(true);
                }}
                className="bg-gray-200 border rounded hover:bg-gray-300 border border-gray-600"
            >
                <option disabled={changed}>---choose variable---</option>
                {renderFeatures}
            </select>

            <button
                disabled={!props.feature}
                className="bg-green-200 hover:bg-green-300 transform hover:scale-105 active:scale-100 rounded px-2 border border-green-500 disabled:bg-gray-100 disabled:scale-100 disabled:border-gray-300"
                onClick={(e)=>{
                    e.preventDefault();
                    dispatch(selectFeature(props.feature));
                    props.setFeature("");
                }}
            >Add Variable</button>
        </div>
    )
}
