const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

const FILE = './scores.json'

app.get('/api/message', (req, res) => {
    res.json({message: "Hello from NodeJS server"})
})
app.get('/api/question_bank', (req, res) => {
    const filePath = path.join(__dirname, 'question_bank.json')
    const questionBank = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    const newQuestionBank = shuffleQuizData(questionBank)
    res.json(newQuestionBank)
})

app.listen(PORT, () => console.log(`Server running at {PORT}`))


function shuffleQuizData(data) {
  // Deep copy to avoid mutating the original array
  const copiedData = JSON.parse(JSON.stringify(data));

  // Fisher-Yates shuffle for an array
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Shuffle the question order
  shuffleArray(copiedData);

  // Shuffle options in each question
  copiedData.forEach(question => {
    shuffleArray(question.options);
  });

  return copiedData;
}
