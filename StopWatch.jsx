import React, {useState, useEffect, useRef} from "react"

function StopWatch(){

    const [isrunning, setisrunning] = useState(false)
    const [elapsedtime, setelapsedtime] = useState(0)
    const intervalidref = useRef(null)
    const starttimeref = useRef(0)

    useEffect(()=>{
        if(isrunning){
            intervalidref.current = setInterval(()=>{
                setelapsedtime(Date.now()-starttimeref.current)
            },10)
        }

        return()=>{
            clearInterval(intervalidref.current)
        }
    },[isrunning])

    function start(){
        setisrunning(true)
        starttimeref.current = Date.now() - elapsedtime
    }

    function stop(){
        setisrunning(false)
    }

    function reset(){
        setelapsedtime(0)
        setisrunning(false)
    }

    function formattime(){
        let hrs = Math.floor(elapsedtime/(1000*60*60))
        let mins = Math.floor(elapsedtime/(1000*60)%60)
        let secs = Math.floor(elapsedtime/(1000)%60)
        let ms = Math.floor((elapsedtime%1000)/10)

        hrs = String(hrs).padStart(2,"0")
        mins = String(mins).padStart(2,"0")
        secs = String(secs).padStart(2,"0")
        ms = String(ms).padStart(2,"0")

        return `${mins}:${secs}:${ms}`
    }

    return(
    <div className="stopwatch">
        <div className="display">{formattime()}</div>
        <div className="controls">
            <button className="start" onClick={start}>Start</button>
            <button className="stop" onClick={stop}>Stop</button>
            <button className="reset" onClick={reset}>Reset</button>
        </div>
    </div>)
}

export default StopWatch