export default function StartScreen({ numOfQuestions, onStartQuiz }) {
    console.log(numOfQuestions)

    return <>
        <h2>Welcome to the React Quiz</h2>
        <h3>{numOfQuestions} questions to check your mastery on React</h3>
        <button className="bg-blue-800 p-3 mt-3 text-white" onClick={() => onStartQuiz({ type: "startQuiz" })}>Let's Start</button>

    </>
}