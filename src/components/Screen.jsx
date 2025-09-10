import Stats from "./Stats.jsx";
import Pet from "./Pet.jsx";

import {useRef} from "react";



const Screen = ({petName, hunger, boredom, sleep, isDead
                ,petXRef, petDirRef, popsicles, showZzz, isSleeping,
                petDOMRef, petRef, bounceCount
 }) => {

    const containerRef = useRef(null);

    return (
        <div  ref={containerRef} className="relative outline-4 outline-black rounded bg-[url('/bg.jpg')] bg-cover bg-center w-3/5 h-90">
            <Stats isSleeping={isSleeping} petName={petName} boredom={boredom} hunger={hunger} sleep={sleep} />
            <div className="h-full w-full">
                {popsicles.map(p => (
                    <img
                    key={p.id}
                    src="/popsicle.svg"
                    alt="popsicle"
                    className="absolute w-8 h-auto pointer-events-none"
                    style={{
                        left: `${p.x}px`,
                        bottom: `${p.y}px`,
                        transform: "none",
                    }}
                    />
                ))}

                {showZzz && petDOMRef.current && (
                    <img
                    src="/zzz.svg"
                    alt="snore"
                    className="absolute w-10 h-auto pointer-events-none animate-bounce z-50"
                    style={{
                        left: `${petDOMRef.current.getBoundingClientRect().left -
                            containerRef.current.getBoundingClientRect().left + petDOMRef.current.offsetWidth / 2 - 10}px`,
                        bottom: "120px",
                        transform: "none",

                    }}
                    />
                )}

                <Pet bounceCount={bounceCount} petRef={petDOMRef} isSleeping={isSleeping} petXRef={petXRef} petDirRef={petDirRef} petName={petName} hunger={hunger} sleep={sleep} boredom={boredom} isDead={isDead}/>
            </div>
        </div>
    );

    

}


export default Screen;
