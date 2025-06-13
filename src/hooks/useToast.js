import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

export const useToast = () => {
  const showToast = useCallback(({ title, description, variant = 'default' }) => {
    const options = {
      duration: 4000,
      position: 'top-right',
      style: {
        background: variant === 'destructive' ? '#ef4444' : '#ffffff',
        color: variant === 'destructive' ? '#ffffff' : '#000000',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    };

    if (title && description) {
      toast(
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm opacity-90">{description}</div>
        </div>,
        options
      );
    } else {
      toast(title || description, options);
    }
  }, []);

  return {
    toast: showToast,
  };
}; 