export default function PostInputSelect(props) {

    const optionClass = "bg-cyan-600"

    return (
        <div className="flex justify-between">
            <div className="flex gap-8 border-b border-cyan-900">
                <select
                    className="mx-auto text-gray-300 bg-cyan-700 cursor-pointer rounded-lg"
                    onChange={e => props.setPostType(e.target.value)}
                >
                    <option className={optionClass}>Trade Idea</option>
                    <option className={optionClass}>Generic Post</option>
                </select>
            </div>
            <button
                className="text-white hover:text-red-300 transform hover:scale-105 active:scale-100 text-2xl"
                onClick={() => props.close()}
            >
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}