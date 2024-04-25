import React, { useEffect, useRef } from 'react';

import '@/styles/chatbox.css';
const ChatContainer = ({ messages }) => {
  const messagesContainer = useRef(null);
  useEffect(() => {
    // 确保在下一帧中滚动，以便所有的内容都已经被渲染
    setTimeout(() => {
      if (messagesContainer.current) {
        messagesContainer.current.scrollTop =
          messagesContainer.current.scrollHeight;
      }
    }, 0);
  }, [messages]);

  return (
    <div className='chat-container' ref={messagesContainer}>
      <div className='container mx-auto'>
        <div className=''>
          {messages.map(
            (message, index) =>
              message.role !== 'system' && (
                <div
                  key={index}
                  className={`py-6 px-4 flex gap-4 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`message-text ${
                      message.role === 'user'
                        ? 'message user'
                        : 'message assistant'
                    }`}
                  >
                    {message.content.split('\n').map((line, key) => (
                      <React.Fragment key={key}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
