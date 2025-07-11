import { useState } from 'react'
import Results from './results'
import { useEffect } from 'react'
import axios from 'axios';
function Quiz({ setIsQuizStarted }) {
    const QUESTION_TIME_IN_SEC = 10
    let initialAnswers = [null, null, null, null]
    const initialQuestionBank = {
        question: "",
        options: [""],
        answer: ""
    }
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [questionBank, setQuestionBank] = useState([initialQuestionBank])
    const [userAnswers, setUserAnswers] = useState(initialAnswers)
    const selectedAnswer = userAnswers[currentQuestion]
    const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_IN_SEC)
    console.log(questionBank.length)

    useEffect(() => {
        axios.get('http://localhost:5000/api/question_bank_shuffled')
            .then(response => {
                setQuestionBank(response.data);
            })
            .catch(error => {
            console.error('Error fetching data:', error);
      });
    }, []);

     useEffect(() => {
        if (currentQuestion >= questionBank.length) return;

        setTimeLeft(QUESTION_TIME_IN_SEC); 

        const timer = setInterval(() => {
        setTimeLeft(prev => {
            if (prev <= 1) {
            clearInterval(timer);
            setCurrentQuestion(prevQ => prevQ + 1);
            return QUESTION_TIME_IN_SEC;
            }
            return prev - 1;
        });
    }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestion]);

    function restartQuiz() {
        axios.get('http://localhost:5000/api/question_bank_shuffled')
            .then(response => {
                setQuestionBank(response.data);
            })
            .catch(error => {
            console.error('Error fetching data:', error);
        });
        setTimeLeft(QUESTION_TIME_IN_SEC)
        setCurrentQuestion(0)
        let emptyUserAnswers = []
        for (let i = 0; i < userAnswers.length; i++) {
            emptyUserAnswers[i] = null;
        }
        setUserAnswers(emptyUserAnswers)

    }

    function backToMainMenu() {
        setIsQuizStarted(false)
    }

    function handleSelectOption (option) {
        let newUserAnswers = [...userAnswers]
        newUserAnswers[currentQuestion] = option
        setUserAnswers(newUserAnswers)
    }
    function changeCurrentQuestion(modifier) {
        setCurrentQuestion(currentQuestion + modifier)
        setTimeLeft(QUESTION_TIME_IN_SEC)
    }
    if (currentQuestion === questionBank.length) {
        return <Results questionBank={questionBank} userAnswers={userAnswers} restartQuiz={restartQuiz} backToMainMenu={backToMainMenu}/>

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