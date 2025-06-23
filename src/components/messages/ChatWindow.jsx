import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Paperclip, Image, File, Video, Mic } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const MessageTypes = {
  TEXT: 'text',
  IMAGE: 'image',
  FILE: 'file',
  SYSTEM: 'system',
  MEETING: 'meeting',
};

const ChatWindow = ({ chat, socket }) => {
  const messagesEndRef = useRef(null);
  const { darkMode } = useTheme();

  // Получение сообщений
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ['messages', chat.id],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/${chat.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch messages');
      return response.json();
    }
  });

  // Группировка сообщений по дате
  const groupedMessages = messages.reduce((groups, message) => {
    const date = format(new Date(message.timestamp), 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  const renderMessageContent = (message) => {
    switch (message.type) {
      case MessageTypes.IMAGE:
        return (
          <div className="relative group">
            <img 
              src={message.content} 
              alt="Изображение" 
              className="max-w-xs rounded-lg cursor-pointer"
              onClick={() => window.open(message.content, '_blank')}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity rounded-lg" />
          </div>
        );
      
      case MessageTypes.FILE:
        return (
          <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <File size={20} />
            <a 
              href={message.content} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {message.fileName}
            </a>
          </div>
        );
      
      case MessageTypes.SYSTEM:
        return (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            {message.content}
          </div>
        );
      
      case MessageTypes.MEETING:
        return (
          <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Новая встреча</h4>
            <p>{message.content}</p>
            <div className="mt-2 flex space-x-2">
              <button className="px-3 py-1 bg-purple-500 text-white rounded-md text-sm">
                Принять
              </button>
              <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm">
                Отклонить
              </button>
            </div>
          </div>
        );
      
      default:
        return <p>{message.content}</p>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex-grow p-4 space-y-4">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow overflow-y-auto p-4">
      <div className="flex items-center mb-4 sticky top-0 bg-white dark:bg-gray-800 py-2 z-10">
        <div className={`w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white ${
          chat.online ? 'ring-2 ring-green-500' : ''
        }`}>
          {chat.user.avatar}
        </div>
        <div className="ml-3">
          <div className="font-semibold">{chat.user.name}</div>
          <div className="text-sm text-gray-500">
            {chat.online ? 'Онлайн' : 'Оффлайн'}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedMessages).map(([date, messages]) => (
          <div key={date}>
            <div className="text-center text-sm text-gray-500 mb-4">
              {format(new Date(date), 'd MMMM yyyy', { locale: ru })}
            </div>
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs ${
                    message.sender === 'user' 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  } rounded-lg p-3`}>
                    {renderMessageContent(message)}
                    <div className="text-xs mt-1 opacity-75">
                      {format(new Date(message.timestamp), 'HH:mm')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow; 