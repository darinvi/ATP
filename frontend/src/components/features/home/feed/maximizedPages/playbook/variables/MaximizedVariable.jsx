export default function MaximizedVariable(props) {

    function handleCommentClick(){
        return
    }

    function notActive() {
        return (
            <div className="flex w-full relative items-center border">
                <p
                    className={`text-center py-1 hover:bg-gray-200 w-full ${props.active == props.k && "bg-gray-200"}`}
                    onClick={() => {
                        if (props.active == props.k) props.setActive("");
                        else props.setActive(props.k);
                    }}
                    onDoubleClick={e => e.stopPropagation()}
                    >{props.k}</p>
                <button
                    className="h-full text-xs bg-yellow-200 p-2 transform hover:bg-yellow-300 active:scale-95 border border-yellow-600"
                    onDoubleClick={e => e.stopPropagation()}
                    onClick={handleCommentClick}
                >C</button>
            </div>
        )
    }

    function isActive() {
        return (
            <div
                className="border-b-2 shadow-lg mb-2 py-2"
            >
                <p
                    className="pl-2 select-text"
                    onDoubleClick={e => e.stopPropagation()}
                >{props.v}</p>
            </div>
        )
    }

    return (
        <>
            {
                props.v &&
                <div>
                    {notActive()}
                    {props.active == props.k && isActive()}
                </div>
            }
        </>
    )
}