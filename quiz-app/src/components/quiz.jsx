import { useState } from 'react'
import Results from './results'
import { useEffect } from 'react'

function Quiz() {
    const questionBank = [
        {
            question : "What is the capital city of Poland?",
            options : [
                "Warsaw", 
                "Berlin", 
                "Bialystok", 
                "Chicago"
            ],
            answer : "Warsaw"
        },
        {
            question : "Which languages are used for web apps?",
            options : [
                "JavaScript", 
                "PHP", 
                "Python", 
                "All"
            ],
            answer : "All"
        },
        {
            question : "Whot does JSX stand for?",
            options : [
                "JavaScript XML", 
                "Java Syntax eXtension", 
                "Just a Simple eXample", 
                "None of the above"
            ],
            answer : "JavaScript XML"
        },
        {
            question : "Which game is the best of the following?",
            options : [
                "Metin 2", 
                "Elden Ring", 
                "Pizza Tower", 
                "Balatro"
            ],
            answer : "Metin 2"
        },
    ]
    let initialAnswers = [null, null, null, null]
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [userAnswers, setUserAnswers] = useState(initialAnswers)
    const selectedAnswer = userAnswers[currentQuestion]
    const [timeLeft, setTimeLeft] = useState(15)
    useEffect(() => {
        // Start a countdown
        const timer = setInterval(() => {
            setTimeLeft(prev => {
            if (prev === 1) {
                clearInterval(timer);
                changeCurrentQuestion(1);  // Move to next question
                return 15; // Reset timer
            }
            return prev - 1;
            });
        }, 1000);

        // Clear interval when question changes
        return () => clearInterval(timer);
    }, [currentQuestion]);

    function restartQuiz() {
        setTimeLeft(15)
        setCurrentQuestion(0)
        let emptyUserAnswers = []
        for (let i = 0; i < userAnswers.length; i++) {
            emptyUserAnswers[i] = null;
        }
        setUserAnswers(emptyUserAnswers)
    }

    function handleSelectOption (option) {
        let newUserAnswers = [...userAnswers]
        newUserAnswers[currentQuestion] = option
        setUserAnswers(newUserAnswers)
    }
    function changeCurrentQuestion(modifier) {
        setCurrentQuestion(currentQuestion + modifier)
        setTimeLeft(15)
    }
    if (currentQuestion === questionBank.length) {
        return <Results questionBank={questionBank} userAnswers={userAnswers} restartQuiz={restartQuiz}/>

    } else {
        return (
            <div>
                <div>
                    <h2>Question {currentQuestion+1}</h2>
                    <p>Time left: {timeLeft} seconds</p>
                    <p className="question">{questionBank[currentQuestion].question}</p>
                    {questionBank[currentQuestion].options.map((option) => (
                        <button 
                            key={option}
                            className={"option" + (selectedAnswer===option ? " selected" : "")} 
                            onClick={() => (handleSelectOption(option))}
                        >
                        {option}
                        </button>
                    ))}
                </div>  
                <div>
                    <button 
                        className="restart-button"
                        onClick={()=>changeCurrentQuestion(1)}
                        disabled={selectedAnswer===null}
                    >
                    {questionBank.length - 1 === currentQuestion
                    ? "Finish Quiz"
                    : "Next"}
                    </button>
                </div>
            </div>
        )
    }
}

export default Quiz;