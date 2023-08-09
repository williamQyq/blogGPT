import React, { useState } from 'react';
import { TextField, Button, Grid, Card, Flex, useTheme, Heading, ThemeProvider, Text } from '@aws-amplify/ui-react';

import './blog.view.css';

import { API } from "aws-amplify";

const promptAPI = "api129ef0d6";
const path = "/promptString";

const darkTheme = {
  name: 'dark-theme',
  tokens: {
    colors: {
      background: {
        primary: '#1E1E1E', // Dark background color
      },
      font: {
        primary: '#FFFFFF', // White text color
      },
      // highlight:'#FFA500'
    },
    components: {
      card: {
        backgroundColor: { value: '{colors.background.primary}' },
        outlined: {
          borderColor: { value: '{colors.black}' },
        },
      },
      heading: {
        color: { value: '{colors.font.secondary}' },
      },
      text: {
        color: { value: '{colors.font.primary}' },
      },
      TextField:{
        highlight:{
          borderColor:{value:'#FFA500'}
        }
      }
    },
  },
};


interface Message {
  content: string;
  isUser: boolean;
}

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const { tokens } = useTheme();
  //request to Chat GPT
  const sendPromptToChatGPT = () => {
    API.get(promptAPI, path + '/' + userInput, {}).then((response) => {
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
    <ThemeProvider theme={darkTheme}>
      <Grid
        columnGap="0.5rem"
        rowGap="0.5rem"
        templateColumns="1fr 5fr 1fr"
        templateRows="1fr 5fr 1fr"
        minHeight="100vh"
        backgroundColor={tokens.colors.background.primary}
      >
        {/* header */}
        <Card
          columnStart="1"
          columnEnd="2"
          backgroundColor={tokens.colors.overlay[20]}
        >
          <Heading color={tokens.components.heading.color.value} level={3}>Neil GPT</Heading>
        </Card>
        {/* navigation or history record */}
        <Card
          columnStart="1"
          columnEnd="2"
          rowStart="2"
          rowEnd="-1"
          backgroundColor={tokens.colors.overlay[10]}
        >
          Nav
        </Card>
        {/* chat-messages */}
        <Card
          rowStart="1"
          rowEnd="-2"
          columnStart="2"
          columnEnd="-1"
          backgroundColor="transparent"
        >
          {/* <div className='chat-container'> */}
          {/* <div className="chat-messages"> */}
          {messages.map((message, index) => (
            <Flex
              direction="column"
              key={index}
              minHeight="80px"
              padding="16px 32px"
              backgroundColor={index % 2 === 0 ? tokens.colors.overlay[60] : "transparent"}
            >
              <Text>{message.content}</Text>
            </Flex>
          ))}
          {/* </div> */}
          {/* </div> */}
        </Card>
        {/* User Prompt Input */}
        <Card
          columnStart="2"
          columnEnd="-1"
          backgroundColor={tokens.colors.overlay[10]}
        >
          <Flex>
            <TextField
              label="Prompt"
              width="100%"
              labelHidden={true}
              value={userInput}
              placeholder='Send a Message...'
              onChange={(e) => setUserInput(e.target.value)}
            />
            <Button onClick={handleMessageSubmit}>Send</Button>
          </Flex>
        </Card>
      </Grid>
    </ThemeProvider>
  );

};

export default ChatComponent;
