import PostInputSelect from "./PostInputSelect";
import { useState } from "react";
import TradeIdea from "./tradeIdea/TradeIdea";
import GenericPost from "./GenericPost";

export default function PostInput(props) {

    const [postType, setPostType] = useState("Trade Idea");

    function handlePostButton(){
        props.setIsActive(false);
    }

    const mapPostTypes = {
        'Trade Idea': <TradeIdea />,
        'Generic Post': <GenericPost />
    }

    return (
        <div className="absolute w-full inset-x-0 inset-y-0 h-fit bg-cyan-700 border-b-2 border-cyan-900 flex flex-col py-2 px-6 gap-6 w-full z-20 max-h-[70%]">
            <PostInputSelect 
                close={handlePostButton} 
                postType={postType}
                setPostType={setPostType}
            />
            {mapPostTypes[postType]}
        </div>
    )
}