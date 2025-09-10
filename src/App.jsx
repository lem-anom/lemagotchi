import {useState, useEffect, useRef} from "react";
import Header from "./components/Header.jsx";
import Screen from "./components/Screen.jsx";
import Buttons from "./components/Buttons.jsx";
import GameOverScreen from "./components/GameOverScreen.jsx";
import StartScreen from "./components/StartScreen.jsx";
import Footer from "./components/Footer.jsx";






const App = () => {
  const[petName, setPetName] = useState("");
  const [sleep, setSleep] = useState(50);
  const [hunger, setHunger] = useState(40);
  const [boredom, setBoredom] = useState(50);
  const [isDead, setIsDead] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [popsicles, setPopsicles] = useState([]);
  const [showZzz, setShowZzz] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const petDOMRef = useRef(null);
  const [bounceCount, setBounceCount] = useState(0);

  const petXRef = useRef(0);
  const petDirRef = useRef(1);

  const petX = petXRef.current;
  const petWidth = 64;
  


  //stat decrement
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDead) {
      setHunger(prev => Math.max(prev - 1, 0));
      setSleep(prev => Math.max(prev -1, 0));
      setBoredom(prev => Math.min(prev + 1, 100));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isDead]);

  //check death
  useEffect(() => {
    if (sleep === 0 || boredom === 100 || hunger === 0) {
      setIsDead(true);

    }
  }, [sleep, hunger, boredom]);

  useEffect(() => {
    if (isDead) {
      const timer = setTimeout(() => setShowGameOver(true), 2000);
      return () => clearTimeout(timer);
    }
    setShowGameOver(false);

  }, [isDead]);


   //animate popsicles

    useEffect(() => {
      let raf = null;
      const gravity = 0.6;
      const bounceFactor = 0.6;

      const animate = () => {
        setPopsicles(ps => ps.map((p) => {
          let {x, y, vx, vy } = p;

          //physics bits
          x += vx;
          y += vy;
          vy += gravity;
          //bouncing
          const groundLevel = 4;
          if (y >= groundLevel) {
            y = groundLevel;
            vy = -vy * bounceFactor;
          }
          return {...p, x, y, vx, vy}
        }).filter(p => {
          const petEl = petDOMRef.current;
          const containerEl = petEl?.parentElement;

          const petLeft = petEl.getBoundingClientRect().left - containerEl.getBoundingClientRect().left;
          const petRight = petLeft + petEl.offsetWidth;

          if (!petEl || !containerEl) return true;
          const popsicleLeft = p.x;
          const popsicleRight = p.x + 8;

          const isHorizontallyAligned = popsicleRight >= petLeft && popsicleLeft <= petRight;
          const isTouchingGround = p.y >= -5;
          const hasTravelled = p.x > 20
          const isColliding = hasTravelled && isHorizontallyAligned && isTouchingGround;
          return !isColliding && (Math.abs(p.vy) > 0.5 || p.y < -2);
        }
          
        ));
        
        raf = requestAnimationFrame(animate);

      }
      raf = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(raf);
    }, []);

  if  (!petName) {
    return <StartScreen onSubmit={name => setPetName(name.trim())} />
  }


  
  const restartGame = () => {
    setSleep(50);
    setHunger(30);
    setBoredom(50);
    setIsDead(false);
    setShowGameOver(false);
    

  };

  const handleSleep = () => {
    setSleep(s => Math.min(100, s + 20));
    setIsSleeping(true)
    setShowZzz(true);
    setTimeout(() => {
      setShowZzz(false);
      setIsSleeping(false);
  }, 2000);

  }

  const handleFeed = () => {
    setHunger(h => Math.min(100, h + 20));
    //spawn popsicles

    const petEl =  petDOMRef.current;
    const containerEl = petEl?.parentElement;

    if (!petEl || !containerEl) return;

    const petLeft = petEl.getBoundingClientRect().left;
    const containerLeft = containerEl.getBoundingClientRect().left;
    const petScreenX = petLeft - containerLeft;

    setPopsicles(p => [...p,
      {
        id: Date.now(),
        x: -20,
        y: 2,
        vx: 4,
        vy: 12 
      }]
    );
  console.log("SPAWNED AT ", petScreenX)

  };
 

  const handlePlay = () => {
    setBoredom(b => Math.max(b - 20, 0));
    let count = 0;
    const interval = setInterval(() => {
      setBounceCount(c => c + 1);
      count++;
      if (count >= 5) {
        clearInterval(interval);
        setTimeout(() => setBounceCount(0), 200);

      }
    }, 200);
    
  }

  return (
    <div className="bg-[#e6f4ea] text-[#2f9e4c] min-h-screen min-w-screen flex flex-col">
      <Header />
      {showGameOver ? (
        <GameOverScreen onRestart={restartGame} />
      ) : (
        <div className="flex flex-col items-center gap-4 pt-4">
          
        <Buttons handlePlay={handlePlay} handleSleep={handleSleep} handleFeed={handleFeed} />
        <Screen bounceCount={bounceCount} petDOMRef={petDOMRef} isSleeping={isSleeping} showZzz={showZzz} petName={petName} isDead={isDead} hunger={hunger} sleep={sleep} boredom={boredom} popsicles={popsicles} petXRef={petXRef} petDirRef={petDirRef}/>
        
      </div>
      )}
      <Footer />
      
    </div>
  );

}


export default App;
