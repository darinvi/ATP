import { useDispatch, useSelector } from "react-redux";
import ListFilings from "./ListFilings";
import ExternalHTMLViewer from "./ExternalHTMLViewer";
import { useEffect, useState } from "react";
import { showTime } from "../../../store/filings";
import { cleanFilings, setLastPage } from "../../../store/filings";

export default function WTF() {

    const dispatch = useDispatch()
    const loading = useSelector(state => state.entities.filings.loading)
    const [active, setActive] = useState(false);

    useEffect(() => {
        dispatch(showTime());
        return () => {
            dispatch(cleanFilings());
            dispatch(setLastPage(""))
        }
    }, [])

    return (
        <div 
            className="flex mt-4 w-full h-full"
            tabIndex='0'
            onKeyDown={e => {
                if (e.code === 'Escape') setActive(false);
            }}
            onClick={() => setActive(false)}
        >
            <div className="flex w-full justify-center gap-16">
                <div className='scroll w-fit overflow-y-auto h-[80vh] border-2 rounded border-cyan-700'>
                    <ListFilings />
                </div>
                {loading
                    ?
                        <p className="my-auto mx-auto text-3xl animate-ping w-fit bg-red-400">Loading...</p>
                    :
                    <ExternalHTMLViewer
                        active={active}
                        setActive={setActive}
                    />
                }
            </div>
        </div>
    )


}