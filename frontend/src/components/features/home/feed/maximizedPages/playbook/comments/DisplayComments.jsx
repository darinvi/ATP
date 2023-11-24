import CommentTextArea from "./CommentTextArea"

export default function DisplayComments() {

    return (
        <div className="flex flex-col flex-1 items-center justify-between w-full py-2">
            <p
                className="border-b w-full text-center"
            >Comments</p>
            <CommentTextArea />
        </div>
    )
}