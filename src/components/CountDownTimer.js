import React, {useEffect, useRef, useState} from 'react'
import './Timer.css'

const CountDownTimer = () => {

    const [timer, setTimer] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    const startTimer = () => {

           if(timer.minutes === 0 && timer.seconds === 0){
               setTimer({
                   hours: timer.hours - 1,
                   minutes: 59,
                   seconds: 59
               });
            }else if(timer.seconds === 0){
                setTimer({
                    hours: timer.hours,
                    minutes: timer.minutes - 1,
                    seconds: 59
                });
            }else {
                setTimer({
                    hours: timer.hours,
                    minutes: timer.minutes,
                    seconds: timer.seconds - 1
                })
            }

    }
    const onSubmitHandler = event => {
        event.preventDefault();
        const form = event.target;
        const hours = form['timer-hours'].value
        const minutes = form['timer-minutes'].value
        setTimer({
            hours: hours,
            minutes: minutes,
            seconds: 59
        })

    }

    useEffect(() => {
        const {hours, minutes, seconds} = timer
        if(hours === 0 && minutes === 0 && seconds === 0){
            return undefined
        }
      const timerID = setInterval(() => startTimer(), 1000)
        return () => {
            clearInterval(timerID)
        }
    }, [timer.seconds])
    const hoursToShow = timer.hours < 10 ? `0${timer.hours}` : timer.hours;
    const minutesToShow = timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes;
    const secondsToShow = timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds;
    return (
        <section className="container">
            <section>
                <form onSubmit={onSubmitHandler}>
                    <input name="timer-hours" placeholder="hours" type="number"/>
                    <input name="timer-minutes" placeholder="minutes" type="number"/>
                    <input type="submit" value="set timer"/>
                </form>
            </section>
            <section className="timer">
                <div>
                    <h2>CountDown Timer</h2>
                </div>
                <div>
                    <section>
                        <p>{hoursToShow}</p>
                        <p><small>Hours</small></p>
                    </section>
                    <span>:</span>
                    <section>
                        <p>{minutesToShow}</p>
                        <p><small>Minutes</small></p>
                    </section>
                    <span>:</span>
                    <section>
                        <p>{secondsToShow}</p>
                        <p><small>Seconds</small></p>
                    </section>

                </div>
            </section>
        </section>
    )
}
export default CountDownTimer;