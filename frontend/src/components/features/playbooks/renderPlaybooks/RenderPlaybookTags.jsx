export default function RenderPlaybookTags(props){

    const renderTags = props.tags.map( e => {
        return <p className="bg-cyan-700 px-2 rounded text-white text-xs py-1">{e.name}</p>
    })

    return (
        <div
            className="border-t-2 border-cyan-700 text-sm flex flex-col gap-3"
        >
            <p 
                className="mx-auto bg-cyan-700 text-gray-300 px-2 pb-1 rounded-b-sm"
            >Tags</p>
            <div className="flex gap-4">
                {renderTags}
            </div>
        </div>
    ) 
}