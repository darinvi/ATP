import { useState } from "react";
import { getReportToken } from "../../../store/reports";
import { useDispatch } from "react-redux";

export default function ReportTokenForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    function handleFormSubmit(e){
        e.preventDefault();
        dispatch(getReportToken(username, password));
    }

    return <form 
                className="lex flex-col shadow mx-auto my-6 p-8 text-2xl text-cyan-500 border border-black"
                onSubmit={handleFormSubmit}
            >
        <div className="flex flex-col">
            <label 
                htmlFor="reports-username"
            >Prop Reports Username</label>
            <input 
                type="text" 
                id="reports-username" 
                className="shadow text-black"
                onChange={(e)=>{setUsername(e.target.value)}}    
            ></input>
        </div>

        <div className="flex flex-col">
            <label 
                htmlFor="reports-password"
            >Prop Reports Password</label>
            <input 
                type="password" 
                id="reports-password" 
                className="shadow  text-black"
                onChange={(e)=>{setPassword(e.target.value)}}
            ></input>
        </div>

        <button 
            type="submit" 
            className="w-full disabled:text-sm disabled:text-white disabled:bg-gray-100 p-2 py-1 my-2 bg-gray-300"
            disabled={!(username && password)}
        >Get Reports</button>
    </form>
}