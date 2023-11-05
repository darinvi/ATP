export default function PostInput(props) {

    function handlePostButton(){
        props.setIsActive(false);
    }

    return (
        <div className="absolute w-full inset-x-0 bg-cyan-700 border-t border-cyan-900 flex flex-col py-2 gap-2">
            <select className="mx-auto text-sm bg-cyan-100 rounded-sm">
                <option>Trade Idea</option>
                <option>Generic Post</option>
            </select>
            <textarea
                className="mx-2 rounded h-20"
            ></textarea>
            <button
                onClick={handlePostButton}
                className="bg-green-300 hover:bg-green-400 w-fit mx-auto px-3 rounded-md border-2 border-green-900"
            >Post</button>
        </div>
    )
}