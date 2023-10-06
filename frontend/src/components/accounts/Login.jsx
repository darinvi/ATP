import { useState } from "react";
import { Link } from "react-router-dom";
import { login, loadUser } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.authenticated)

    function handleSubmitForm(e){
        e.preventDefault()
        dispatch(login(username, password))
        // dispatch(loadUser())
    }

    return (
        <>
        {auth && <Navigate to='/' />}

        <form 
            onSubmit={handleSubmitForm} 
            className="flex flex-col shadow m-6 p-8 text-2xl text-cyan-500 border border-black">

            <label 
                htmlFor="username" 
                className="mx-auto"
            >Username</label>
            <input 
                id="username" 
                type="text"
                value={username}
                onChange={ e => setUsername(e.target.value)}
                className="shadow mx-auto text-black"
                ></input>

            <label 
                htmlFor="password"
                className="mx-auto"
                >Password</label>
            <input 
                id="password" 
                type="password"
                value={password}
                onChange={ e => setPassword(e.target.value)}
                className="shadow mx-auto text-black"
                ></input>

            <button 
                type="submit" 
                disabled={!(username && password)}
                className="mx-auto disabled:text-sm disabled:text-white disabled:bg-gray-100 p-2 py-1 m-2 bg-gray-300"
            >Login</button>

        </form>
        </>
    )
}