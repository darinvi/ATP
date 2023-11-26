import { useSelector } from "react-redux"
import SinglePlaybook from "../../playbooks/renderPlaybooks/SinglePlaybook"

export default function RenderPosts(){

    const posts = useSelector(state => state.entities.home.allPosts)
    const filteredPosts = useSelector(state => state.entities.home.filteredPosts)

    const mapPostTypes = posts && Object.values(posts).map( post => {
        if ( Object.keys(post).includes('tape_reading') && !filteredPosts.includes('Playbook') ) {
            return <SinglePlaybook play={post} />
        }
    })

    return (
        <>
            {mapPostTypes}
        </>
    )
}