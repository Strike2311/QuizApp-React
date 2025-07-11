import AddNewQuestion from './addNewQuestion'
import QuestionManager from './questionManager'
import Quiz from './quiz'
import { useState } from 'react'

function Title() {

    const [isQuizStarted, setIsQuizStarted] = useState(false)
    const [isQuestionCreation, setIsQuestionCreation] = useState(false)
    const [isQuestionManager, setIsQuestionManager] = useState(false)

    if (!isQuizStarted && !isQuestionCreation && !isQuestionManager) {
        return (
            <div>
                <button className="restart-button"
                    onClick={()=> setIsQuizStarted(true)}>Start Quiz</button>
                <button className="restart-button"
                    onClick={()=> setIsQuestionCreation(true)}>Add new Quiz Question</button>
                <button className="restart-button"
                    onClick={()=> setIsQuestionManager(true)}>Manage Quiz Questions</button>
            </div> 
        )
    } else  if (isQuizStarted && !isQuestionCreation && !isQuestionManager) {
        return <Quiz setIsQuizStarted={setIsQuizStarted}/>
    } else if (!isQuizStarted && isQuestionCreation && !isQuestionManager){
        return <AddNewQuestion setIsQuestionCreation={setIsQuestionCreation}/>
    } else {
        return <QuestionManager setIsQuestionManager={setIsQuestionManager}/>
    }
}
export default Title