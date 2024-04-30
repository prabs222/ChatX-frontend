import React, { useState } from 'react';

export default function MessageInput(props) {
  const [inputValue, setInputValue] = useState('');
  const sender_id = localStorage.getItem("userid");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "" && sender_id !== undefined) {
      const messageObj = {
        message: inputValue,
        id: sender_id,
      };
      props.socket.send(JSON.stringify(messageObj));
      console.log("MESSAGE SENT");
      setInputValue("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className='message-input'>
      <input
        type='text'
        placeholder='Type your message'
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
