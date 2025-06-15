import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

const ChatInterface = ({ conversations, onSendMessage }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedConversation) {
      scrollToBottom();
    }
  }, [selectedConversation, conversations]); // Scroll when conversation or messages change

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      onSendMessage(selectedConversation.id, newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[600px] bg-secondary/10 rounded-lg overflow-hidden">
      {/* Conversation List */}
      <div className="w-1/3 border-r border-border p-4 space-y-2 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Messages</h3>
        {conversations.length === 0 ? (
          <div className="text-muted-foreground text-center py-4">
            You don't have any active conversations yet.
          </div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${selectedConversation?.id === conv.id ? 'bg-primary/20' : 'hover:bg-secondary/20'}`}
              onClick={() => setSelectedConversation(conv)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={conv.user.avatar || ''} alt={conv.user.name} />
                <AvatarFallback className="bg-accent text-accent-foreground">
                  {conv.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{conv.user.name}</p>
                  {conv.user.online && <span className="h-2 w-2 rounded-full bg-green-500" title="Online"></span>}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {conv.lastMessage}
                </p>
                <span className="text-xs text-muted-foreground">
                  {conv.lastMessageTime ? format(new Date(conv.lastMessageTime), 'dd.MM.yyyy HH:mm', { locale: enUS }) : ''}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message View */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            <div className="flex items-center gap-3 p-4 border-b border-border bg-background">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedConversation.user.avatar || ''} alt={selectedConversation.user.name} />
                <AvatarFallback className="bg-accent text-accent-foreground">
                  {selectedConversation.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{selectedConversation.user.name}</p>
                {selectedConversation.user.online && <span className="text-xs text-green-500">Online</span>}
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {selectedConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${msg.isOwn ? 'bg-primary text-primary-foreground' : 'bg-secondary/20 text-foreground'}`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-xs opacity-75 mt-1 block">
                        {msg.time ? format(new Date(msg.time), 'HH:mm', { locale: enUS }) : ''}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-border bg-background flex items-center gap-2">
              <Input
                placeholder="Write a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-center p-4">
            <div className="flex flex-col items-center">
              <MessageSquare className="h-12 w-12 mb-4" />
              <p>Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface; 