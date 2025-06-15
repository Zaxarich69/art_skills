import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Video, Info, ChevronLeft } from 'lucide-react';
import { callsService } from '@/services/calls';
import { useToast } from '@/components/ui/use-toast';

const ChatHeader = ({ user, onBack, isMobileView, onInfoClick }) => {
  const { toast } = useToast();

  const handleCall = async (type) => {
    try {
      await callsService.startCall(user.id, type);
    } catch (error) {
      console.error('Call error:', error);
    }
  };

  return (
    <div className="p-4 border-b border-border flex items-center justify-between">
      <div className="flex items-center">
        {isMobileView && (
          <Button variant="ghost" size="icon" className="mr-2" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium flex items-center">
            {user.name}
            {user.isOnline && <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>}
          </h3>
          <p className="text-xs text-muted-foreground">
            {user.isOnline ? 'В сети' : 'Не в сети'}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => handleCall('audio')}
          title="Позвонить"
        >
          <Phone className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => handleCall('video')}
          title="Видеозвонок"
        >
          <Video className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onInfoClick}
          title="Информация"
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader; 