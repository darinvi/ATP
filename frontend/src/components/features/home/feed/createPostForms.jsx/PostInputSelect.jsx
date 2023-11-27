export default function PostInputSelect(props) {

    const optionClass = "bg-cyan-100"

    return (
        <div className="flex justify-between">
            <div className="flex gap-8">
                <select
                    className="mx-auto text-sm bg-cyan-200 rounded hover:bg-cyan-300"
                    onChange={e => props.setPostType(e.target.value)}
                >
                    <option className={optionClass}>Trade Idea</option>
                    <option className={optionClass}>Generic Post</option>
                </select>
            </div>
            <button 
                className="text-white hover:text-red-300 transform hover:scale-105 active:scale-100 text-2xl"
                onClick={()=>props.close()}
            >X</button>
        </div>
    )
}