import PostButton from "./PostButton"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadAllPosts, resetPosts } from "../../../../store/home"
import RenderPosts from "./RenderPosts"
import FilterPosts from "./FilterPosts"

export default function PostsFeed() {

    const dispatch = useDispatch();

    useEffect(() => {
        // in load all posts, give the filters and do all the querying in the backend. 
        // (instead of calling separate endpoints)
        dispatch(loadAllPosts());
        return ()=>{
            dispatch(resetPosts());
        }
    }, [])

    return (
        <div className="overflow-y-auto h-[92vh] border border-gray-900 w-[50vw] bg-gray-100">
            <div className="flex sticky top-0 border-b border-gray-900 bg-cyan-700 justify-between">
                <FilterPosts />
                <PostButton />
            </div>
            <RenderPosts />
        </div>
    )
}