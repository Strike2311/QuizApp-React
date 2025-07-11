import { useState } from 'react'
import axios from 'axios';
function AddNewQuestion({ setIsQuestionCreation }) {

  const [formData, setFormData] = useState({
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: ''
  })
  const [isLoading, setIsLoading] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const fields = [
      {
          fieldName : 'question',
          fieldLabel : 'Question',
          hasCheckbox : false
      },
      {
          fieldName : 'option1',
          fieldLabel : 'Option 1',
          hasCheckbox : true
      },
      {
          fieldName : 'option2',
          fieldLabel : 'Option 2',
          hasCheckbox : true
      },
      {
          fieldName : 'option3',
          fieldLabel : 'Option 3',
          hasCheckbox : true
      },
      {
          fieldName : 'option4',
          fieldLabel : 'Option 4',
          hasCheckbox : true
      }
  ]

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }  

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true)
    const payload = {
      question: formData.question,
      options: [
        formData.option1,
        formData.option2,
        formData.option3,
        formData.option4
      ],
      answer: formData[correctAnswer] 
    };

    axios.post('http://localhost:5000/api/add_question', payload)
      .then(response => {
        console.log('Question added:', response.data);
        setIsQuestionCreation(false);
      })
      .catch(error => {
        console.error('Error adding question:', error);
      })
      .finally(setIsLoading(false));
  }

  function handleRadioChange(e) {
    const { value } = e.target;
    setCorrectAnswer(value);
  }

  return (
    <div className="app-container">
      
      <h2>Add new quiz question</h2>
       <form onSubmit={handleSubmit}>

        {fields.map((field, index) => (
          <div key={index}>
            <label>
              {field.fieldLabel}:
              <input
                type="text"
                name={field.fieldName}
                value={formData[field.fieldName] || ''}
                onChange={handleChange}
                required
              />
            </label>
            {field.hasCheckbox && (
              <label style={{ marginLeft: "10px" }}>
                <input
                  type="radio"
                  name="correctAnswer"
                  value={field.fieldName}
                  checked={correctAnswer === field.fieldName}
                  onChange={handleRadioChange}
                  required
                /> Correct Answer
              </label>
            )}
            <br /><br />
          </div>
        ))}
        <button type="submit" disabled={isLoading}> {isLoading ? "Submitting" : "Submit"}</button>
        <button type="button" onClick={() => setIsQuestionCreation(false)}>Cancel</button>
      </form>
    </div>
  )
}

export default AddNewQuestion
