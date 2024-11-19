import BuilderHeader from "./BuilderHeader"

export default function StrategyBuilder() {
    return (
        <div className="absolute top-0 left-0 h-[92vh] bg-cyan-900 border-x-2 border-cyan-700  w-full z-20 px-4 py-2">
            <BuilderHeader />
            <div>
                <div className="flex gap-6">
                    <p>Name:</p>
                    <input
                        type="text"
                        className="text_input"
                    ></input>
                </div>
            </div>
        </div>
    )
}