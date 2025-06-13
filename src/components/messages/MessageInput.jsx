import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Paperclip, Image, File, Video, Mic, Smile, Send } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const MessageInput = ({ chatId, socket }) => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const { darkMode } = useTheme();

  // Обработка отправки сообщения
  const handleSend = async () => {
    if (!message.trim() && attachments.length === 0) return;

    try {
      const formData = new FormData();
      formData.append('message', message);
      attachments.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/messages/${chatId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to send message');

      setMessage('');
      setAttachments([]);
      socket?.emit('stopTyping', { chatId });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Обработка нажатия Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Обработка печати
  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      socket?.emit('typing', { chatId });
    }

    // Сброс таймера печати
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      setIsTyping(false);
      socket?.emit('stopTyping', { chatId });
    }, 1000);
  };

  // Обработка загрузки файлов
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  // Обработка удаления вложения
  const handleRemoveAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Обработка выбора эмодзи
  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji.native);
  };

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 flex flex-wrap gap-2"
          >
            {attachments.map((file, index) => (
              <div
                key={index}
                className="relative group bg-gray-100 dark:bg-gray-700 p-2 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  {file.type.startsWith('image/') ? (
                    <Image size={16} />
                  ) : file.type.startsWith('video/') ? (
                    <Video size={16} />
                  ) : (
                    <File size={16} />
                  )}
                  <span className="text-sm truncate max-w-[150px]">
                    {file.name}
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveAttachment(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center space-x-2">
        <div className="relative">
          <button
            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
            className="p-2 text-gray-500 hover:text-purple-500 transition-colors"
          >
            <Smile size={20} />
          </button>
          <AnimatePresence>
            {isEmojiPickerOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full mb-2"
              >
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  theme={darkMode ? 'dark' : 'light'}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-500 hover:text-purple-500 transition-colors"
        >
          <Paperclip size={20} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          className="hidden"
        />

        <div className="flex-grow relative">
          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            onKeyPress={handleKeyPress}
            placeholder="Введите сообщение..."
            className="w-full p-3 pr-12 rounded-lg bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 resize-none"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim() && attachments.length === 0}
            className={`absolute right-2 bottom-2 p-2 rounded-full ${
              message.trim() || attachments.length > 0
                ? 'bg-purple-500 text-white'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
            }`}
          >
            <Send size={20} />
          </button>
        </div>

        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`p-2 rounded-full ${
            isRecording ? 'bg-red-500 text-white' : 'text-gray-500 hover:text-purple-500'
          } transition-colors`}
        >
          <Mic size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput; 