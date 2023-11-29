import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";

export default function ExternalHTMLViewer({active, setActive}) {

  const content = useSelector(state => state.entities.filings.currentHTML)

  return (<>
    {content &&
      <div
        className={`w-1/2 border-2 h-[80vh] overflow-y-auto bg-white select-text rounded-lg hover:rounded-none ${active ? "absolute top-2 w-[90%] pl-6 h-[85vh]" : "hover:border-4 hover:border-cyan-600 cursor-zoom-in "} z-20 active:scale-100`}
        onClick={() => setActive(true)}
        onKeyDown={e => {
          if (e.code === 'Escape') setActive(false);
        }}
        tabIndex="0"
        // onMouseLeave={()=>setActive(false)}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>}
  </>
  );
}
