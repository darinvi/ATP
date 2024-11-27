export default function ClosingSVG({ onClick, additionalClass = '' }) {
    return (
        <button
            className={`hover:bg-red-200 rounded transform hover:text-black border-2 border-cyan-800 ${additionalClass}`}
            onClick={onClick}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </button>
    )
}