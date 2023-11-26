export default function PostInputSelect(props) {

    return (
        <div className="flex justify-between">
            <div className="flex gap-8">
                <select
                    className="mx-auto text-sm bg-cyan-100 rounded-sm"
                    onChange={e => props.setPostType(e.target.value)}
                >
                    <option>Trade Idea</option>
                    <option>Generic Post</option>
                </select>
            </div>
            <button 
                className="text-white hover:text-red-300 transform hover:scale-105 active:scale-100"
                onClick={()=>props.close()}
            >X</button>
        </div>
    )
}