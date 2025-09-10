import lemon from "../assets/lemon.svg"
const Header = () => {

    return (
        <div className="bg-[#a7d397] min-h-10 min-w-screen flex items-center justify-center">
            <h1 className="text-[#2F3E46] text-3xl">Lemagotchi</h1>
            <img src={lemon} alt="lemon" />
        </div>
    );
}


export default Header;
