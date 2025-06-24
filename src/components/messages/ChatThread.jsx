import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { 
  Phone, Video, Info, ChevronLeft, MessageSquare, 
  Paperclip, Send, Calendar, CreditCard, DollarSign
} from 'lucide-react';
import MessageInput from './MessageInput'; // Import the new MessageInput component

const MessageBubble = ({ message, userAvatar, userName, isOwnMessage }) => (
  <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
    {!isOwnMessage && (
      <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
        <AvatarImage src={userAvatar || undefined} alt={userName} />
        <AvatarFallback className="bg-primary text-primary-foreground text-xs">{userName.charAt(0)}</AvatarFallback>
      </Avatar>
    )}
    <div className="max-w-[70%]">
      <div className={`p-3 rounded-lg ${isOwnMessage ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
        <p>{message.text}</p>
      </div>
      <div className={`flex items-center mt-1 text-xs text-muted-foreground ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
        <span>{message.time}</span>
        {isOwnMessage && <span className="ml-2">{message.status}</span>}
      </div>
    </div>
  </div>
);

const SystemEventCard = ({ event }) => (
  <div className="text-center text-muted-foreground text-sm my-4">
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
      {event.type === 'payment' && <DollarSign className="h-3 w-3 mr-1" />} 
      {event.type === 'lesson_booked' && <Calendar className="h-3 w-3 mr-1" />} 
      {event.message}
    </span>
  </div>
);

const ChatThread = ({
  activeConversation,
  messages,
  onSendMessage,
  onToggleSidebar,
  onToggleInfoPanel,
  isMobile,
}) => {
  const messagesEndRef = useRef(null);

  if (!activeConversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <MessageSquare className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Выберите диалог</h2>
        <p className="text-gray-600 dark:text-gray-400">Выберите диалог из списка слева, чтобы начать общение.</p>
        {isMobile && (
          <Button onClick={onToggleSidebar} className="mt-4">
            Показать диалоги
          </Button>
        )}
      </div>
    );
  }

  const { user } = activeConversation;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && (
            <Button variant="ghost" size="icon" className="mr-2" onClick={onToggleSidebar}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={user.avatar || undefined} alt={user.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium flex items-center">
              {user.name}
              {user.isOnline && <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>}
            </h3>
            <p className="text-xs text-muted-foreground">{user.isOnline ? 'Online' : 'Offline'}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" onClick={onToggleInfoPanel}><Info className="h-5 w-5" /></Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            message.type === 'system' ? (
              <SystemEventCard key={message.id} event={message} />
            ) : (
              <MessageBubble 
                key={message.id} 
                message={message} 
                userAvatar={message.sender === 'me' ? undefined : user.avatar} 
                userName={message.sender === 'me' ? 'You' : user.name} 
                isOwnMessage={message.sender === 'me'}
              />
            )
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatThread; 