const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

const FILE = './scores.json'
const filePath = path.join(__dirname, 'question_bank.json')
const questionBank = JSON.parse(fs.readFileSync(filePath, 'utf8'))

app.get('/api/message', (req, res) => {
    res.json({message: "Hello from NodeJS server"})
})
app.get('/api/question_bank_shuffled', (req, res) => {
    const newQuestionBank = shuffleQuizData(questionBank)
    res.json(newQuestionBank)
})
app.get('/api/question_bank', (req, res) => {
    res.json(questionBank)
})

app.post('/api/add_question', (req, res) => {
    const newQuestion = req.body;
    questionBank.push(newQuestion)
    fs.writeFileSync(filePath, JSON.stringify(questionBank, null, 2));
    res.json({ message: 'Question added successfully' });
})

app.delete('/api/questions/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < questionBank.length) {
    questionBank.splice(index, 1);
    fs.writeFileSync(filePath, JSON.stringify(questionBank, null, 2));
    res.json({ message: 'Question deleted' });
  } else {
    res.status(400).json({ message: 'Invalid index' });
  }
});

app.put('/api/questions/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const updatedQuestion = req.body;
  if (index >= 0 && index < questionBank.length) {
    questionBank[index] = updatedQuestion;
    fs.writeFileSync(filePath, JSON.stringify(questionBank, null, 2));
    res.json({ message: 'Question updated' });
  } else {
    res.status(400).json({ message: 'Invalid index' });
  }
});

app.listen(PORT, () => console.log(`Server running at ${PORT}`))


function shuffleQuizData(data) {
  const copiedData = JSON.parse(JSON.stringify(data));

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  shuffleArray(copiedData);

  copiedData.forEach(question => {
    shuffleArray(question.options);
  });

  return copiedData;
}
