
const Btn = ({onClick, text}) => {
    return(
        <button className="bg-amber-400 text-[#2F3E46] hover:bg-blue-500 py-2 px-5 hover:scale-125 hover:text-amber-300" onClick={onClick}>{text}</button>
    );
}
const GameOverScreen = ({onRestart}) => {

    return(
        <div className="bg-black items-center text-amber-300 justify-center h-screen w-screen flex flex-col font-bold">
            <h1 className="text-2xl">OH NO ... YOUR PET DIED!</h1>
            <Btn onClick={onRestart} text="restart" />
        </div>
    );

}

export default GameOverScreen;
