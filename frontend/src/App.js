import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, user: true }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('/api/chat', {
        question: input,
        documents: selectedDocuments
      });
      setMessages([...newMessages, { text: response.data.answer, user: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([...newMessages, { text: "Sorry, I couldn't process your request.", user: false }]);
    }
  };

  const toggleDocument = (doc) => {
    setSelectedDocuments(prevDocs => 
      prevDocs.includes(doc) 
        ? prevDocs.filter(d => d !== doc)
        : [...prevDocs, doc]
    );
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 flex flex-col">
        <button className="bg-gray-700 text-white py-2 px-4 rounded mb-4 hover:bg-gray-600 transition-colors">
          + New Chat
        </button>
        <div className="mb-4 flex-grow">
          <h3 className="text-sm font-semibold mb-2 text-gray-400">Multi-select the documents to use:</h3>
          <div className="space-y-2">
            {['Q1FY22', 'Q2FY22', 'Q3FY22', 'Q4FY22', 'Q1FY23', 'Q2FY23', 'Q3FY23'].map(doc => (
              <label key={doc} className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedDocuments.includes(doc)}
                  onChange={() => toggleDocument(doc)}
                  className="form-checkbox text-blue-500 rounded"
                />
                <span>{doc}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold mb-2 text-gray-400">Context:</h3>
          <div className="space-y-2">
            {['Thank you very much, and...', 'question: Acquisition of...', 'question: Siddhant, you\'re...', 'question: Venkat, Ajoy,...', 'question: Okay, sir. Okay....'].map((item, index) => (
              <div key={index} className="bg-gray-700 p-2 rounded text-sm">{item}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.user ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] p-3 rounded-lg ${
                msg.user ? 'bg-blue-600' : 'bg-gray-700'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-gray-800">
          <div className="flex items-center bg-gray-700 rounded-lg">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-transparent text-white p-3 rounded-l-lg focus:outline-none"
              placeholder="Type your question here"
            />
            <button 
              onClick={sendMessage}
              className="bg-blue-600 text-white p-3 rounded-r-lg hover:bg-blue-700 transition-colors focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;