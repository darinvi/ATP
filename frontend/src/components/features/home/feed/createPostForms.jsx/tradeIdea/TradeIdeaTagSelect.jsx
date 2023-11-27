export default function TradeIdeaTagSelect() {
    return (
        <div className="flex gap-2 text-sm text-gray-300 items-center h-fit">
            <p className="hover:text-white border-r w-fit pr-2 cursor-pointer">Manage Tags</p>
            <select
                className="bg-cyan-700 rounded hover:text-white cursor-pointer"
            >
                <option>Choose Tag</option>
                <option>Tags2xxx</option>
                <option>Tags3xxx</option>
                <option>Tags4xxx</option>
                <option>Tags5xxx</option>
            </select>
        </div>
    )
}