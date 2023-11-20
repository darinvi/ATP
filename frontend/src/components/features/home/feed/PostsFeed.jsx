import PostTypeButton from "./PostTypeButton"
import PostButton from "./PostButton"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadAllPosts, resetPosts } from "../../../../store/home"
import RenderPosts from "./RenderPosts"

export default function PostsFeed() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllPosts());
        return ()=>{
            dispatch(resetPosts());
        }
    }, [])

    return (
        <div className="overflow-y-auto h-[92vh] border border-gray-900 w-[50vw] bg-gray-100">
            <div className="flex sticky top-0 border-b border-gray-900 bg-cyan-700 justify-between">
                <div className="flex items-center">
                    <PostTypeButton postType={'Playbook'} />
                    <PostTypeButton postType={'Trade Ideas'} />
                    <PostTypeButton postType={'Generic Posts'} />
                    <PostTypeButton postType={'Journals'} />
                    <PostTypeButton postType={'Journals (trainees)'} />
                    <PostTypeButton postType={'Mentee questions'} />
                </div>
                <PostButton />
            </div>
            <RenderPosts />
        </div>
    )
}