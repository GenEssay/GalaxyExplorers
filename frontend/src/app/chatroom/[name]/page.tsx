'use client';
// Make sure to install and import OpenAI
import React, { useEffect, useState } from 'react';

import { getOpenAIResponse } from '@/lib/openai';

import ChatContainer from '@/components/Chatbox';

const ChatApp = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { role: 'system', content: '你是一个小学老师，每次只说三句话。' },
  ]);
  // Function to send a message and get the response
  const sendMessage = async () => {
    if (inputText.trim() === '') return;
    const newMessage = { role: 'user', content: inputText.trim() };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText('');
  };

  // 在 messages 发生变化时处理 OpenAI 响应
  useEffect(() => {
    const fetchOpenAIResponse = async () => {
      // 检查最后一条消息是否来自用户
      if (
        messages.length > 0 &&
        messages[messages.length - 1].role === 'user'
      ) {
        const completion = await getOpenAIResponse(messages);
        const newAIResponse = { role: 'assistant', content: '' };
        const tmpMessages = [...messages];
        setMessages((prevMessages) => [...tmpMessages, newAIResponse]);
        for await (const chunk of completion) {
          if (chunk.choices[0].delta.content === undefined) break;
          const content = chunk.choices[0].delta.content;
          newAIResponse.content += content;
          setMessages((prevMessages) => [...tmpMessages, newAIResponse]);
        }
      }
    };

    fetchOpenAIResponse();
  }, [messages]); // 依赖于 messages 状态的变化

  function checkForEnter(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  return (
    <div className='flex flex-col h-screen w-full items-center justify-center bg-orange-100 antialiased relative overflow-hidden'>
      <div className='w-full max-w-4xl px-4 pb-4 md:h-auto'>
        <ChatContainer messages={messages} />
      </div>
      <div className='fixed inset-x-0 bottom-0 p-4 flex justify-center w-full'>
        <div className='flex w-full max-w-4xl bg-white rounded-xl overflow-hidden'>
          <input
            type='text'
            value={inputText}
            placeholder='快来跟我聊天吧'
            className='w-full p-4 text-lg text-orange-700 border-none rounded-l-lg'
            onChange={(e) => setInputText(e.target.value)}
            onKeyUp={checkForEnter}
          />
          <button
            onClick={sendMessage}
            className='text-white bg-orange-500 hover:bg-orange-600 font-bold py-2 px-4 rounded-r-lg'
          >
            ⬆️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
