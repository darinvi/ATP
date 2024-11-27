export default function Modal({ onClickOutside, children }) {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            onClick={onClickOutside}
        >
            {children}
        </div>
    )
}