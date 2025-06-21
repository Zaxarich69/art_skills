import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Paperclip, Smile } from 'lucide-react';

const Messages = ({ conversations }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Здесь будет логика отправки сообщения
    console.log('Отправка сообщения:', message);
    setMessage('');
  };

  return (
    <div className="h-[calc(100vh-12rem)]">
      <Card className="h-full">
        <CardContent className="p-0 h-full">
          <div className="grid grid-cols-12 h-full">
            {/* Список чатов */}
            <div className="col-span-4 border-r">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Messages</h3>
              </div>
              <div className="overflow-y-auto h-[calc(100%-4rem)]">
                {conversations?.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-4 cursor-pointer hover:bg-accent ${
                      selectedChat?.id === chat.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={chat.user.avatar} />
                        <AvatarFallback>
                          {chat.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{chat.user.name}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {chat.lastMessage}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(chat.lastMessageTime).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Окно чата */}
            <div className="col-span-8 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Заголовок чата */}
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedChat.user.avatar} />
                        <AvatarFallback>
                          {selectedChat.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedChat.user.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedChat.user.online ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Сообщения */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedChat.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.isOwn ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            msg.isOwn
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p>{msg.text}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {new Date(msg.time).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Форма отправки */}
                  <form
                    onSubmit={handleSendMessage}
                    className="p-4 border-t flex items-center gap-2"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
                    >
                      <Smile className="h-5 w-5" />
                    </Button>
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter your message..."
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" className="shrink-0">
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  Select a chat to start messaging
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages; 