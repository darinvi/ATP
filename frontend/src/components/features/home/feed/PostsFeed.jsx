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
        <div className="relative max-h-[92vh] border border-gray-900 w-[50vw] bg-gray-100">
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