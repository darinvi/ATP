import CreateTags from "./CreateTags"
import JournalForm from "./JournalForm"
import DeleteTags from "./DeleteTags"

export default function Journal() {
    // return <div className="flex flex-col w-full gap-8 items-center">
    return <div className="flex flex-col gap-4 mt-2 w-full">
        <div className="flex items-center gap-6">
            <CreateTags />
            {/* I have to create a confirm for deleting tags. Once a tag is deleted, daily journals that once had it will not have it anymore */}
            <DeleteTags />
        </div>
        <JournalForm />
    </div>
}