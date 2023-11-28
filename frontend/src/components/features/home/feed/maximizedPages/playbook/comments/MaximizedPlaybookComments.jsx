import { useSelector, useDispatch } from "react-redux"
import SinglePlaybookComment from "./SinglePlaybookComment";
import { clearPBError } from "../../../../../../../store/home";

export default function MaximizedPlaybookComments() {

    const dispatch = useDispatch();

    const comments = useSelector(state => state.entities.home.playbooks.comments);
    const loading = useSelector(state => state.entities.home.playbooks.commentsLoading);
    const createLoading = useSelector(state => state.entities.home.playbooks.commentCreateLoading);
    const err = useSelector(state => state.entities.home.playbooks.error);

    const renderComments = comments.map(c => {
        return <SinglePlaybookComment comment={c} />
    })

    return (
        <div className="overflow-y-auto w-full h-full relative">
            {
                loading
                    ?
                    <p className="text-lg animate-ping text-center mt-5 w-fit mx-auto">Loading...</p>
                    :
                    <>
                        {renderComments}
                        {renderComments.length === 0 && <p className="mx-auto w-fit mt-5">No Comments Yet!</p>}
                    </>
            }
            {createLoading && <p className="absolute bottom-0 bg-cyan-700 text-gray-300 border border-cyan-900 w-full text-center text-black animate-pulse">Creating Comment!</p>}
            {err && (
                <div className="absolute bottom-0 bg-cyan-700 text-gray-300 border border-cyan-900 w-full flex justify-between px-2">
                    <p className="text-center">Error Creating Comment!</p>
                    <button
                        className="hover:text-white"
                        onClick={()=>dispatch(clearPBError())}
                    >X</button>
                </div>
                )
            }
        </div>
    )
}