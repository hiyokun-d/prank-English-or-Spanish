import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const result = useRef(null);
  const [showEnglish, setShowingEnglish] = useState(false);
  const [showIndonesia, setShowingIndonesia] = useState(false);
  let moveCount = 0
  const [funText, setFunText] = useState("")

  function handleClickEnglish() {
    setShowingEnglish(prevShowEnglish => {
      if (showIndonesia) {
        setShowingIndonesia(false);
      }
      return !prevShowEnglish;
    });
  }

  function handleClickIndonesia() {
    setShowingIndonesia(prevShowIndonesia => {
      if (showEnglish) {
        setShowingEnglish(false);
      }
      return !prevShowIndonesia;
    });
  }

  function handleUserAction() {
    if (showEnglish) {
      moveCount += 1
      if (moveCount > 2) {
        setFunText("CONFIRMED GAY!")
      }
    } else if (showIndonesia) {
      moveCount += 1
      if (moveCount > 2) {
        setFunText("TERKONFIRMASI GAY!")
      }
    }
  }

  useEffect(() => {
    const events = [
      'click', 'keypress', 'resize', 'scroll', 'mousemove',
      'mousedown', 'mouseup', 'mouseenter', 'mouseleave',
      'mouseover', 'mouseout', 'touchstart', 'touchend',
      'touchmove', 'touchcancel', 'focus', 'blur',
      'change', 'input', 'submit', 'reset', 'contextmenu'
    ];

    // Attach event listeners
    events.forEach(event => {
      window.addEventListener(event, handleUserAction);
    });

    // Handle unload events separately
    const handleUnload = () => {
      alert("Goodbye! See you next time.");
    };
    window.addEventListener('beforeunload', handleUnload);

    // Cleanup event listeners on component unmount
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleUserAction);
      });
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [showEnglish, showIndonesia]);


  return (
    <>
      <div className='container'>
        <button onClick={handleClickEnglish}>ENGLISH</button>
        <h1 className='gap'>OR</h1>
        <button onClick={handleClickIndonesia}>INDONESIA</button>
      </div>
      <div className='result' ref={result}>
        {showEnglish && <h1 className='text-result'>{funText ? funText : "IF YOU MOVE YOU'RE GAY!"}</h1>}
        {showIndonesia && <h1 className='text-result'>{funText ? funText : "Lu Gerak Lu Ganteng"}</h1>}
      </div>
    </>
  )
}

export default App
