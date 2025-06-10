import React, { useState } from 'react';

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="relative"
      >
        {children}
      </div>
      {isVisible && content && (
        <div className="absolute bottom-full mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg opacity-0 animate-fade-in z-50 whitespace-nowrap">
          {content}
          <div className="absolute left-1/2 transform -translate-x-1/2 border-t-8 border-x-8 border-transparent border-gray-800 -bottom-2"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip; 