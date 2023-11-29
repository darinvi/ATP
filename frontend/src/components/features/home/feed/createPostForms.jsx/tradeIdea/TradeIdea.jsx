import { addVariable } from "../../../../../../store/posts";
import TradeIdeaPostButton from "./TradeIdeaPostButton";
import TradeIdeaVariable from "./TradeIdeaVariable";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearTradeIdeasState } from "../../../../../../store/posts";
import TradeIdeaTagSelect from "./TradeIdeaTagSelect";
import TradeIdeaMetaData from "./TradeIdeaMetaData";

export default function TradeIdea() {

    const vars = useSelector(state => state.entities.posts.tradeIdeas.variables);
    const dispatch = useDispatch();

    const renderInputs = Object.keys(vars).map(k => {
        return (
            <TradeIdeaVariable
                counter={k}
            />
        )
    })

    useEffect(()=>{
        return () => dispatch(clearTradeIdeasState());
    },[])

    return (
        <>
            <div className="flex justify-between w-full">
                <div className="flex gap-12">
                    <button
                        className="border border-orange-900 text-gray-400 hover:text-black hover:bg-orange-300 transform hover:scale-105 active:scale-100 rounded px-3 pb-2 pt-1 w-fit text-2xl"
                        onClick={() => {
                            dispatch(addVariable());
                        }}
                    >+</button>
                    <div className="flex flex-col h-full justify-between">
                        <TradeIdeaMetaData />
                        <TradeIdeaTagSelect />
                    </div>
                </div>
                <TradeIdeaPostButton />
            </div>
            <div className="flex flex-col w-full overflow-y-auto border-t-2 border-cyan-900">
                <div className="flex flex-col">
                    {renderInputs}
                </div>
            </div>
        </>
    )
}
