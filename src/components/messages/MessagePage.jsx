import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import UserProfile from './UserProfile';
import { useTheme } from '../../contexts/ThemeContext';
import { useToast } from '../../hooks/useToast';

const MessagePage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const { darkMode } = useTheme();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // WebSocket connection initialization
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_WS_URL, {
      auth: {
        token: localStorage.getItem('token')
      }
    });

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    newSocket.on('error', (error) => {
      toast({
        title: 'Connection Error',
        description: error.message,
        variant: 'destructive'
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // Получение списка чатов
  const { data: chats, isLoading: isLoadingChats } = useQuery({
    queryKey: ['chats'],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch chats');
      return response.json();
    }
  });

  // Обработка новых сообщений
  const handleNewMessage = useCallback((message) => {
    queryClient.setQueryData(['messages', selectedChat?.id], (old) => {
      if (!old) return [message];
      return [...old, message];
    });
  }, [selectedChat, queryClient]);

  // Подписка на новые сообщения
  useEffect(() => {
    if (!socket || !selectedChat) return;

    socket.on(`message:${selectedChat.id}`, handleNewMessage);

    return () => {
      socket.off(`message:${selectedChat.id}`, handleNewMessage);
    };
  }, [socket, selectedChat, handleNewMessage]);

  return (
    <div 
      className="flex h-screen bg-gray-100 dark:bg-gray-900"
    >
      <AnimatePresence mode="wait">
        <ChatList 
          chats={chats}
          isLoading={isLoadingChats}
          onSelectChat={setSelectedChat}
          selectedChatId={selectedChat?.id}
        />
      </AnimatePresence>

      <div className="flex flex-col flex-grow">
        {selectedChat ? (
          <>
            <ChatWindow 
              chat={selectedChat}
              socket={socket}
            />
            <MessageInput 
              chatId={selectedChat.id}
              socket={socket}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 dark:text-gray-400">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedChat && (
          <UserProfile 
            user={selectedChat.user}
            socket={socket}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessagePage; 