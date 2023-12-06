import PostTypeButton from "./PostTypeButton"

export default function FilterPosts() {
    return (
        <div className="flex items-center py-1">
            <PostTypeButton postType={'Playbook'} />
            <PostTypeButton postType={'Trade Ideas'} />
            <PostTypeButton postType={'Generic Posts'} />
            <PostTypeButton postType={'Journals'} />
            <PostTypeButton postType={'Journals (trainees)'} />
            <PostTypeButton postType={'Mentee questions'} />
        </div>
    )
}