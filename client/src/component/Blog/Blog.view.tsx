import React, { useState } from 'react';
import './blog.view.css';

import {API} from "aws-amplify";
import { response } from 'express';

const promptAPI = "api129ef0d6";
const path = "/promptString";
interface Message {
  content: string;
  isUser: boolean;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');

  const sendPromptToChatGPT = () =>{
    API.get(promptAPI,path+'/'+userInput,{}).then((response)=>{
      console.log(response);
    })
  }

  const handleMessageSubmit = () => {
    if (userInput.trim() === '') return;

    const newMessage: Message = {
      content: userInput,
      isUser: true,
    };

    setMessages([...messages, newMessage]);
    setUserInput('');

    // Simulate the reply from the assistant after a delay
    setTimeout(() => {
      const reply: Message = {
        content: "I'm just a simple example, but I'm here to help!",
        isUser: false,
      };
      setMessages([...messages, reply]);
    }, 1000);
  };

  return (
    <div>
    <h1> ChatGPT Mock Up</h1>
    <div className='centered-container'>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={message.isUser ? 'user-message' : 'assistant-message'}>
              {message.content}
            </div>
          ))}
        </div>
        <div className="user-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button onClick={handleMessageSubmit}>Send</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChatComponent;
