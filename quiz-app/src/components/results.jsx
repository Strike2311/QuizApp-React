function Results({questionBank, userAnswers, restartQuiz, backToMainMenu}) {

    function getCorrectAnswersCount() {
        let correctAnswersCoutner = 0
        for (let i = 0; i < questionBank.length; i++) {
            if (questionBank[i].answer === userAnswers[i]) {
                correctAnswersCoutner++;
            }
        }
        return correctAnswersCoutner;
    }


    return (
        <div>
            <h2>Quiz Completed</h2>
            <p className="score">Your score {getCorrectAnswersCount()}/{questionBank.length}</p>
            <button className="restart-button"
                onClick={()=> restartQuiz()}>Restart Quiz</button>
            <button className="restart-button"
                onClick={()=> backToMainMenu()}>Back to Main Menu</button>
        </div>
    )
}
export default Results