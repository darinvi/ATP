import { useSelector } from "react-redux/es/hooks/useSelector";

export default function ExternalHTMLViewer() {

  const content = useSelector(state => state.entities.filings.currentHTML)

  return (
    <div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
