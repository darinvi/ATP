import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editPBComment } from "../../../../../../../store/home";

export default function EditableComment(props) {

    const dispatch = useDispatch();
    const [edited, setEdited] = useState(props.comment);
    const editId = useSelector(state => state.entities.home.playbooks.editingId);
    const [initialRender, setInitialRender] = useState(true);

    useEffect(() => {
        if (!initialRender) {
            if (!props.edit) {
                dispatch(editPBComment(props.id, edited))
            } 
        } else {
            setInitialRender(false);
        }
    }, [props.edit])

    function editForm(){
        return (
            <div className="pr-2">
                <textarea 
                    type="text" 
                    value={edited}
                    onChange={e => setEdited(e.target.value)}
                    className="w-full h-auto border-2 px-1"
                    onKeyDown={ e => {
                        e.stopPropagation()
                        if (e.code === 'Escape') {
                            // setEdited()
                            // exit without dispatching and editing on escape
                        }
                    }}
                />
            </div>
        )
    }

    return (
        <>
            {
                props.edit
                    ?
                    editForm()
                    :
                    <>
                        {editId === props.id ? <p className="animate-pulse text-gray-300">Saving Changes...</p> : <p>{props.comment}</p>}
                    </>
            }
        </>
    )
}