export default function PostValidButton({valid, onSubmit}) {
    return (
        <button
            disabled={!valid}
            onClick={() => onSubmit()}
            className="bg-cyan-300 hover:bg-cyan-400 mx-auto px-8 rounded border border-green-900 transform hover:scale-[103%] active:scale-[98%] disabled:bg-gray-300 disabled:border-gray-900 disabled:scale-100"
        >Post</button>
    )
}