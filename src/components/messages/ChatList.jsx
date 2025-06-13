import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Search, Filter } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ChatList = ({ chats = [], isLoading, onSelectChat, selectedChatId }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { darkMode } = useTheme();

  // Фильтрация чатов
  const filteredChats = useMemo(() => {
    return chats.filter(chat => {
      if (filter === 'online' && !chat.online) return false;
      if (filter === 'unread' && !chat.unread) return false;
      return chat.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [chats, filter, searchTerm]);

  // Виртуализация списка
  const parentRef = React.useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: filteredChats.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  });

  if (isLoading) {
    return (
      <div className="w-1/4 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-1/4 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
    >
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Поиск чатов..."
            className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'all' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setFilter('all')}
          >
            Все
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'online' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setFilter('online')}
          >
            Онлайн
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'unread' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setFilter('unread')}
          >
            Непрочитанные
          </button>
        </div>
      </div>

      <div 
        ref={parentRef}
        className="overflow-auto h-[calc(100vh-8rem)]"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const chat = filteredChats[virtualRow.index];
            return (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedChatId === chat.id
                      ? 'bg-purple-100 dark:bg-purple-900'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => onSelectChat(chat)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white ${
                        chat.online ? 'ring-2 ring-green-500' : ''
                      }`}>
                        {chat.user.avatar}
                      </div>
                      {chat.unread && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold truncate">{chat.user.name}</h3>
                        <span className="text-xs text-gray-500">
                          {new Date(chat.lastMessageTime).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatList; 