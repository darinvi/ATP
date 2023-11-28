import { useSelector } from "react-redux"
import SinglePlaybook from "../../playbooks/renderPlaybooks/SinglePlaybook"

export default function RenderPosts(){
    
    const posts = useSelector(state => state.entities.home.allPosts)
    const filteredPosts = useSelector(state => state.entities.home.filteredPosts)

    const mapPostsTypes = {
        'Playbook': (e,i) => <SinglePlaybook play={e} index={i} />,
    }

    const rendePosts = posts && Object.values(posts).map( (post, i) => {
        if (!filteredPosts.includes(post.post_type) ) {
            return mapPostsTypes[post.post_type](post, i);
        }
    })

    return (
        <>
            {rendePosts}
        </>
    )
}