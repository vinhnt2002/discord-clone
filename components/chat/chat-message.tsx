import React from 'react'


interface ChatMessageProps {
    channelId: string
}

const ChatMessage: React.FC<ChatMessageProps> = ({channelId}) => {
  return (
    <div className='flex flex-1'>ChatMessage of channelId : {channelId}</div>
  )
}

export default ChatMessage