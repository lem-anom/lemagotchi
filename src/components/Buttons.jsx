
const Button = ({onClick, text}) => {
    
    return(
        <button onClick={onClick} className="bg-[#f9c74f] cursor-pointer text-[#2F3E46] px-5  hover:bg-[#f29e4c] rounded hover:scale-125 grow">{text}</button>
    );


}
const Buttons = ({handleSleep, handleFeed, handlePlay}) => {
    
    return (
        <div className="h-1/10 flex  space-x-4 justify-center items-center w-1/2">
            <Button onClick={handleSleep} text="sleep" />
            <Button onClick={handleFeed} text="feed" />
            <Button onClick={handlePlay} text="play" />
        </div>
        

    );
}

export default Buttons