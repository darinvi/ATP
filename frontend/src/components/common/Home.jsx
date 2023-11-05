import ListFilings from "../features/filings/ListFilings"

export default function Home() {
    return(
    <div className="flex flex-col items-center gap-4">
        <ListFilings />
        <h1>Add market holidays</h1>
        <h1>Trade ideas (with dinamic variables), can be commented by the mentors</h1>
        <h1>Add some components that summarize the other pages (filings list, mentor panel, etc)</h1>
    </div>)
}