import { useDispatch, useSelector } from "react-redux"
import { clearTradeIdeasState, createTradeIdea } from "../../../../../../store/posts";
import { useState } from "react";

export default function TradeIdeaPostButton() {

    const dispatch = useDispatch();
    const vars = useSelector(state => state.entities.posts.tradeIdeas.variables)
    const name = useSelector(state => state.entities.posts.tradeIdeas.name)
    const ticker = useSelector(state => state.entities.posts.tradeIdeas.ticker)
    const varsWithContent = vars && Object.values(vars).filter( e => (e.name && e.description) || (e.name && e.numeric));

    const [deleting, setDeleting] = useState(false);

    function buttons() {
        const disabledClass = "disabled:opacity-20 disabled:border-2 disabled:border-gray-900 disabled:scale-100 disabled:bg-gray-900 disabled:text-gray-300"
        const transformClass = "transform hover:scale-105 active:scale-100"
        return (
            <div className="flex gap-3 h-full">
                <button
                    disabled={!(Object.values(varsWithContent).length != 0 && name && ticker)}
                    onClick={() => {
                        dispatch(createTradeIdea());
                    }}
                    className={`hover:bg-green-300 text-gray-300 opacity-80 hover:text-black px-8 rounded border border-green-900 ${transformClass} ${disabledClass}`}
                >
                    Post
                </button>

                <button
                    disabled={!(Object.values(vars).length != 0)}
                    onClick={() => setDeleting(true)}
                    className={`hover:bg-red-400 text-gray-300 opacity-80 hover:text-black px-6 rounded border border-red-900 ${transformClass} ${disabledClass}`}
                >
                    Delete
                </button>
            </div>
        )
    }

    function validateDelete() {
        return (
            <div className="flex gap-3 items-center text-xl">
                <p className="text-gray-300">Delete All?</p>
                <button
                    onClick={() =>{
                        dispatch(clearTradeIdeasState());
                        setDeleting(false);
                    }}
                    className="text-green-200 hover:text-green-400"
                >Yes</button>
                <button
                    className="text-red-200 hover:text-red-400"
                    onClick={() => setDeleting(false)}
                >No</button>
            </div>
        )
    }

    return (
        <>
            {
                deleting
                    ?
                    validateDelete()
                    :
                    buttons()
            }
        </>
    )
}