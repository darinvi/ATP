import PostInputSelect from "./PostInputSelect";

export default function PostInput(props) {


    function handlePostButton(){
        props.setIsActive(false);
    }

    return (
        <div className="absolute w-full inset-x-0 inset-y-0 h-fit bg-cyan-700 border-t border-cyan-900 flex flex-col py-2 gap-2 w-full z-20">
            <PostInputSelect close={handlePostButton} />
            <textarea
                className="mx-2 rounded h-20"
            ></textarea>
            <button
                onClick={handlePostButton}
                className="bg-green-300 hover:bg-green-400 mx-auto px-2 rounded border border-green-900 transform active:scale-95"
            >Post</button>
        </div>
    )
}