import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";

export default function ExternalHTMLViewer() {

  const content = useSelector(state => state.entities.filings.currentHTML)
  const [active, setActive] = useState(false);

  return ( <>
      { content && 
      <div 
        className={`w-1/2 border-2 h-[80vh] overflow-y-auto cursor-pointer rounded-3xl hover:rounded-none ${active ? "absolute top-2 left-0 bg-white w-screen pl-6 lr-4 h-[85vh]" : "transform hover:scale-105"}`}
        onClick={()=>setActive(prev => !prev)}
      >
          <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>}
  </>
  );
}
