export default function RenderPlaybookTags(props){

    const renderTags = props.tags.map( e => {
        return <p className="bg-cyan-200 px-2 rounded">{e.name}</p>
    })

    return (
        <div
            className="border-t-2 border-gray-300 select-none text-sm flex flex-col gap-3"
        >
            <p 
                className="mx-auto bg-gray-300 px-2 rounded-b-sm"
            >Tags</p>
            <div className="flex gap-4">
                {renderTags}
            </div>
        </div>
    ) 
}