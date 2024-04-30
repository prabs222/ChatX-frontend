import React from 'react'

export default function Message({text, name, sent}) {
  return (
    <div className={`message ${sent ? 'sent':'recieved'}`}>
        <div className='message-bubble'>
        {!sent && <small className='text-richblack-300'>{name}</small>}
          <p>{text}</p>
        </div>
        
    </div>
  )
}