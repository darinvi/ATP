import PostButton from "./createPostForms.jsx/PostButton"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadAllPosts, resetPosts } from "../../../../store/home"
import RenderPosts from "./RenderPosts"
import FilterPosts from "./FilterPosts"
import { setActivePost } from "../../../../store/home"

export default function PostsFeed() {

    const dispatch = useDispatch();
    const activePost = useSelector(state => state.entities.home.activePost);

    useEffect(() => {
        // in load all posts, give the filters and do all the querying in the backend. 
        // (instead of calling separate endpoints)
        dispatch(loadAllPosts());
        return () => { 
            dispatch(resetPosts());
        }
    }, [])

    return (
        <div
            className="relative max-h-[92vh] border border-gray-900 w-[50vw] bg-cyan-800"
            tabIndex="0"
            onKeyDown={e => {
                e.stopPropagation();
                console.log(e.code);
                if (e.code === 'ArrowUp') {
                    dispatch(setActivePost([activePost-1,true]))
                }
            }}
        >
            <div className="flex border-b border-gray-900 bg-cyan-700 justify-between h-fit py-1 w-full">
                <FilterPosts />
                <PostButton />
            </div>
            <div className="overflow-y-auto h-[95%]">
                <RenderPosts />
            </div>
        </div>
    )
}