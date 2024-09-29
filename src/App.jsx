import { useState, useEffect,useRef } from 'react';
import { Play, Pause } from '@phosphor-icons/react';



export const App = () => {
  const [startValue, setStartValue] = useState(0); 
  const [endValue, setEndValue] = useState(100);  
  const [currentProgress, setCurrentProgress] = useState(0); 
  const [isPlaying, setIsPlaying] = useState(false); 


  const stylesInput = `bg-zinc-800  outline-none  focus:border border-blue-600 text-white p-1 rounded-md ${isPlaying?"opacity-20":"opacity-100"}`;
  const stylesDiv = "flex flex-col";

  const intervalRef = useRef(null); 

  useEffect(() => {
    
    if (isPlaying && currentProgress < endValue) {
      intervalRef.current = setInterval(() => {
        setCurrentProgress((prevProgress) => {
          const nextProgress = prevProgress + 1; 
          if (nextProgress >= endValue) {
            clearInterval(intervalRef.current); 
            return endValue;
          }
          return nextProgress;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current); 
    }

   
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentProgress, endValue]);

  return (
    <div className="px-5">
      
      <div className="bg-zinc-800 w-full  h-3 rounded-full overflow-hidden my-4">
        <div
          className={`bg-gradient-to-r from-blue-600 via-purple-600 to-purple-800  h-full transition-all `}
          style={{ width: `${currentProgress}%` }}
        />
      </div>

      {currentProgress>0 && <p className="text-slate-100 text-center ">{currentProgress}%</p> } 

      {startValue > endValue && <p className="text-red-500 text-center">O valor inicial não pode ser maior que o valor final.</p>} 

      <div className="flex justify-center items-end text-slate-100 mt-5">
        
        <div className={`${stylesDiv}`}>
          <label htmlFor="startValue">Início</label>
          <input
            type="number"
            id="startValue"
            max={100}
            min={0}
            value={startValue}
            onChange={(e) => {
              setStartValue(Number(e.target.value));
              setCurrentProgress(Number(e.target.value)); 
            }}
            className={`${stylesInput}`}
            disabled={isPlaying}
          />
        </div>
        
        <div
          className={`bg-zinc-800 rounded-full p-2 mx-4 cursor-pointer ${startValue>endValue?"opacity-20":""}`}
          onClick={() => {
            if (startValue <= endValue) {
              setIsPlaying(!isPlaying); 
            }
          }}
          aria-disabled={true}
        >
          {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
        </div>

        <div className={`${stylesDiv}`}>
          <label htmlFor="endValue">Fim</label>
          <input
            type="number"
            id="endValue"
            max={100}
            min={0}
            value={endValue}
            onChange={(e) => setEndValue(Number(e.target.value))}
            className={`${stylesInput}`}
            disabled={isPlaying}
          />
        </div>

      </div>
    </div>
  );
};
