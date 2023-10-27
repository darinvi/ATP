export default function SideNav(props){

    return <div className="flex flex-col justify-around h-full border-r-4 px-4">
        <p 
            className="bg-gray-100 hover:bg-orange-200 rounded px-4 py-2"
            onClick={()=>props.setCurrentComponent(props.components.dividendStats)}
        >Dividends</p>
        <p 
            className="bg-gray-100 hover:bg-orange-200 rounded px-4 py-2"
            onClick={()=>props.setCurrentComponent()}
        >ToDo1</p>
        <p 
            className="bg-gray-100 hover:bg-orange-200 rounded px-4 py-2"
            onClick={()=>props.setCurrentComponent()}
        >ToDo2</p>
        <p 
            className="bg-gray-100 hover:bg-orange-200 rounded px-4 py-2"
            onClick={()=>props.setCurrentComponent()}
        >ToDo2</p>
    </div>
}