import CreateTags from "./CreateTags"
import JournalForm from "./JournalForm"
import DeleteTags from "./DeleteTags"

export default function Journal() {
    return <div className="flex flex-col gap-4 my-4 w-full select-none">
        <div className="flex items-center gap-14 ml-4">
            <CreateTags />
            {/* I have to create a confirm for deleting tags. Once a tag is deleted, daily journals that once had it will not have it anymore */}
            <DeleteTags />
        </div>
        <JournalForm />
    </div>
}