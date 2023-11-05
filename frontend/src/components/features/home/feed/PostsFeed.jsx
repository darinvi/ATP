import RenderPlaybooks from "../../playbooks/renderPlaybooks/RenderPlaybooks"
import PostTypeButton from "./PostTypeButton"
import PostButton from "./PostButton"

export default function PostsFeed() {
    return (
        <div className="overflow-y-auto h-[92vh] border border-gray-900 w-[50vw]">
            <div className="flex sticky top-0 border-b border-gray-900 bg-cyan-700 justify-between">
                <div className="flex items-center">
                    <PostTypeButton postType={'Playbook'} />
                    <PostTypeButton postType={'Trade Ideas'} />
                    <PostTypeButton postType={'Generic Posts'} />
                </div>
                <PostButton />
            </div>
            <RenderPlaybooks />
        </div>
    )
}