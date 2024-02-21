import { useEffect } from "react"

export default function Questions({ question, dispatch, answerChoosen, questionNumber, timeRemaining }) {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    useEffect(() => {
        let timer = setInterval(() => {
            dispatch({ type: "startTimer" });
        }, 1000);
        return () => clearInterval(timer);
    }, [dispatch])
    return <div className="flex justify-center items-center flex-col">
        <p>{question?.question}</p>
        <div>{
            question?.options?.map((option, index) => <button onClick={() => dispatch({ type: "answerChoosen", payload: index })} className={`bg-blue-800 rounded-lg w-3/5 pl-5 py-5 m-4 text-white ${answerChoosen !== null ? index === question.correctOption ? "bg-green-700" : "bg-red-700" : ""}`} >{option}</button>)
        }

        </div>
        <footer className="flex justify-between items-center w-1/5">
            <div>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</div>
            <button className="bg-gray-600 p-3 text-white" onClick={() => dispatch({ type: "nextClick" })}>{questionNumber === 14 ?
                "Finish" : "Next"}</button>
        </footer>
    </div>

}