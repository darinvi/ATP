import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";

export default function ExternalHTMLViewer() {

  const content = useSelector(state => state.entities.filings.currentHTML)
  const [active, setActive] = useState(false);

  return ( <>
      { content && 
      <div 
        className={`w-1/2 border-2 h-[80vh] overflow-y-auto bg-white cursor-pointer rounded-lg hover:rounded-none ${active ? "absolute top-2 left-0 w-screen pl-6 lr-4 h-[85vh]" : "hover:border-4 hover:border-cyan-600"} z-20 active:scale-100`}
        onClick={()=>setActive(prev => !prev)}
      >
          <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>}
  </>
  );
}
