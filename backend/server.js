const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3001;  // Make sure this doesn't conflict with your React app's port

app.use(bodyParser.json());

// Load the Q&A data
const qaData = {};
const documents = ['Q1FY22', 'Q2FY22', 'Q3FY22', 'Q4FY22', 'Q1FY23', 'Q2FY23', 'Q3FY23'];

documents.forEach(doc => {
  const rawData = fs.readFileSync(`path/to/your/${doc}.json`);
  qaData[doc] = JSON.parse(rawData);
});

app.post('/api/chat', (req, res) => {
  const { question, documents } = req.body;
  
  let answer = "I'm sorry, I don't have an answer for that question.";

  // Search for the answer in the selected documents
  for (const doc of documents) {
    const matchedQA = qaData[doc].find(qa => 
      qa.question.toLowerCase().includes(question.toLowerCase())
    );

    if (matchedQA) {
      answer = matchedQA.answer;
      break;
    }
  }

  res.json({ answer });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});