import { useState, useEffect,useRef } from "react";

export const POMODORO_MODES = {
    pomodoro : {label : "Focus 25m" , seconds: 25*60},
    shortBreak: {label: "Break 5m", seconds : 5* 60},
    longBreak: {label: "Break 15m", seconds : 15* 60},
}

export function usePomodoro(onSessionComplete){
    const [mode,setMode] = useState("pomodoro");
    const [timeLeft,setTimeLeft] = useState(POMODORO_MODES.pomodoro.seconds);
    const [running,setRunning] = useState(false);


    const onCompleteRef = useRef(onSessionComplete);
    useEffect(() => { onCompleteRef.current = onSessionComplete;});


    useEffect(() =>{
        if (!running) return;
    

    const id = setInterval(() => {
        setTimeLeft((t) => {
            if(t<= 1){
                clearInterval(id);
                setRunning(false);
                if(mode === "pomodoro") onCompleteRef.current?.();
                return 0;
            }
            return t - 1;
        });

    } , 1000);

    return () => clearInterval(id);
    }, [running,mode]);

    const switchMode = (newMode) =>{
    setRunning(false);
    setMode(newMode);
    setTimeLeft(POMODORO_MODES[newMode].seconds)
    }

    const reset = () => {
        setRunning(false);
        setTimeLeft(POMODORO_MODES[mode].seconds);
    }

    return { mode, timeLeft, running, start: () => setRunning(true),
        pause: () => setRunning(false), reset, switchMode };
    }
