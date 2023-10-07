export default function ExternalHTMLViewer( props ) {
  return (
    <div className='html-container scroll'>
        <div dangerouslySetInnerHTML={{ __html: props.content }} />
    </div>
  );
}
