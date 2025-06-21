import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Video, Calendar, Star, MoreVertical, Mail, MapPin, Clock } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const UserProfile = ({ user, socket }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { darkMode } = useTheme();

  const handleCall = () => {
    socket?.emit('call:request', { userId: user.id });
  };

  const handleVideoCall = () => {
    socket?.emit('video:request', { userId: user.id });
  };

  const handleScheduleMeeting = () => {
    // Открыть модальное окно для планирования встречи
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Сохранить в избранное
  };

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-1/4 p-4 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="text-center flex-1">
          <div className="relative inline-block">
            <div className={`w-24 h-24 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl ${
              user.online ? 'ring-2 ring-green-500' : ''
            }`}>
              {user.avatar}
            </div>
            {user.online && (
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
            )}
          </div>
          <h2 className="mt-4 font-semibold text-xl">{user.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">{user.role}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-full ${
              isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
            }`}
          >
            <Star size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
          <Mail size={16} />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
          <MapPin size={16} />
          <span>{user.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
          <Clock size={16} />
          <span>{user.timezone}</span>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <button
          onClick={handleCall}
          className="w-full p-2 bg-purple-500 text-white rounded-md flex items-center justify-center space-x-2 hover:bg-purple-600 transition-colors"
        >
          <Phone size={16} />
          <span>Call</span>
        </button>
        <button
          onClick={handleVideoCall}
          className="w-full p-2 bg-purple-500 text-white rounded-md flex items-center justify-center space-x-2 hover:bg-purple-600 transition-colors"
        >
          <Video size={16} />
          <span>Video Call</span>
        </button>
        <button
          onClick={handleScheduleMeeting}
          className="w-full p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md flex items-center justify-center space-x-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <Calendar size={16} />
          <span>Schedule Meeting</span>
        </button>
      </div>

      {user.bio && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {user.bio}
          </p>
        </div>
      )}

      {user.skills && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default UserProfile; 