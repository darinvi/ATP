import CommentSectionButtons from "./CommentSectionButtons"

export default function DisplayComments(){
    return (
        <div className="flex flex-col flex-1 items-center">
            <CommentSectionButtons />
            <p>Comments</p>
        </div>
    )
}