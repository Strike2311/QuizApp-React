import { useEffect, useState } from 'react';
import axios from 'axios';
import AddNewQuestion from './addNewQuestion';

function QuestionManager() {
  const [questions, setQuestions] = useState([]);
  const [mode, setMode] = useState('list'); // 'list' | 'add' | 'edit'

  useEffect(() => {
    fetchQuestions();
  }, []);

  function fetchQuestions() {
    axios.get('http://localhost:5000/api/question_bank')
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }

  function deleteQuestion(index) {
    if (!window.confirm('Delete this question?')) return;
    axios.delete(`http://localhost:5000/api/questions/${index}`)
      .then(() => fetchQuestions())
      .catch(err => console.error(err));
  }

  function handleEdit(index) {
    //todo
  }

  return (
    <div>
      <h2>Manage Questions</h2>

      {mode === 'list' && (
        <>
          <button onClick={() => setMode('add')}>Add New Question</button>
          <ul>
            {questions.map((q, i) => (
              <li key={i} style={{ marginBottom: '10px' }}>
                <strong>{q.question}</strong><br />
                {q.options.map((opt, j) => (
                  <div key={j}>
                    {opt} {opt === q.answer && <strong>(Correct)</strong>}
                  </div>
                ))}
                <button onClick={() => handleEdit(i)}>Edit</button>
                <button onClick={() => deleteQuestion(i)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default QuestionManager;
