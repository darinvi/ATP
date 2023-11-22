export default function MaximizedVariable(props) {
    return (
        <>
            {
                props.v &&
                <div>
                    <p>{props.k}</p>
                    <p className={`${props.active !== props.k && "hidden" }`}>{props.v}</p>
                </div>
            }
        </>
    )
}