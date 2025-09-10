import {useState} from "react";
import Header from "./Header.jsx";


const StartScreen = ({onSubmit}) => {
    const [input, setInput] = useState("");
    const handleStart = () => {
        if (input.trim()) onSubmit(input);
    };



    return(
        <>
        <Header />
        <div className="bg-black text-[#2f9e4c] h-screen w-screen flex flex-col justify-center items-center font-semibold">
            
            <h1>NAME YOUR PET!</h1>
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
            placeholder="Sausage ..."
            className="px-4 py-2 border-2 border-gray-400 roudned mb-4" />
            <button onClick={handleStart} className="bg-amber-200 text-black rounded px-4 py-2">Start</button>
        </div>
        </>
    );
}


export default StartScreen
