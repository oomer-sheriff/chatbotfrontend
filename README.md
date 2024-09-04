
```markdown
# ChatBot UI

This project is a simple ChatBot user interface built using React for the frontend and Node.js for the backend. It allows users to select documents and interact with the bot, with responses provided by the backend API based on the selected documents.

## Features

- **Multi-document selection**: Users can select one or more documents, and the chatbot will generate responses accordingly.
- **API-based interaction**: The backend API serves answers based on the selected documents and user queries.
- **Smooth chat UI**: Simple, clean, and responsive chat interface using Flexbox for alignment and smooth scrolling.

## Tech Stack

- **React**: For building the user interface.
- **Node.js**: For running the backend API.
- **Express.js**: As the server framework for the backend.
- **Axios**: For HTTP requests from the frontend to the backend.
- **Tailwind CSS**: For the frontend styling.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for managing dependencies

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/chatbot-ui.git
   cd chatbot-ui
   ```

2. **Set up the backend**:
   
   Navigate to the backend directory and follow these steps:

   a. **Create a `questions.json` file** in the root of your backend folder with the structure for storing questions and answers. Here's an example of the `questions.json` file:
   
   ```json
   {
     "Q1FY22": {
       "questions": [
         {
           "question": "Who is Avnish Anand?",
           "answer": "Avnish Anand is the CEO of CaratLane, a company recently acquired by Titan Company."
         }
       ]
     },
     "Q2FY22": {
       "questions": [
         {
           "question": "What is the acquisition of CaratLane?",
           "answer": "Titan Company recently acquired CaratLane in a full buyout deal."
         }
       ]
     }
   }
   ```

   b. **Install backend dependencies**:
   
   ```bash
   npm install
   ```

   c. **Start the backend server**:

   ```bash
   node server.js
   ```

   The backend will start and listen on `http://localhost:3001`.

3. **Set up the frontend**:
   
   Open another terminal window and navigate to the frontend directory:

   ```bash
   cd chatbot-ui
   ```

   a. **Install frontend dependencies**:

   ```bash
   npm install
   ```

   b. **Start the frontend server**:

   ```bash
   npm start
   ```

   The frontend will now run on [http://localhost:3000](http://localhost:3000) and interact with the backend API.

## Project Structure

```
├── backend
│   ├── questions.json     # Stores the question-answer pairs for the chatbot
│   ├── server.js          # Main backend server file
│   └── package.json       # Backend dependencies and scripts
├── frontend
│   ├── src
│   │   └── components
│   │       └── ChatBot.jsx  # Main ChatBot component
│   └── App.js             # Entry point for the frontend
├── package.json           # Frontend dependencies and scripts
└── README.md              # Project documentation
```

### Customization

- **Changing API endpoint**:
  
  If the backend API is running on a different URL, update the endpoint URL in the `sendMessage` function in the `ChatBot` component (`ChatBot.jsx`) to match the correct backend URL.

### Example Workflow

1. Start the backend:

   ```bash
   node backend/server.js
   ```

2. Start the frontend:

   ```bash
   cd frontend
   npm start
   ```

3. Interact with the chatbot in the browser, selecting documents and sending queries.

## Troubleshooting

- **CORS errors**: If you encounter CORS errors, ensure that your backend has proper CORS handling. You can use the `cors` package in your backend.
- **Server issues**: Make sure your backend is running on `http://localhost:3001` and is reachable from the frontend.

