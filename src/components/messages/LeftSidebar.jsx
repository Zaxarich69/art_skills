import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MessageSquare, Menu, X, ChevronDown, Bell } from 'lucide-react';

const LeftSidebar = ({ conversations, activeConversation, onSelectConversation, isMobile, onCloseSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState('all'); // 'all', 'unread', 'archived'

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          conv.lastMessage.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = 
      currentTab === 'all' ||
      (currentTab === 'unread' && conv.unreadCount > 0) ||
      (currentTab === 'archived' && conv.isArchived);

    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-xl font-bold">Диалоги</h2>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onCloseSidebar}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по диалогам..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="p-2 border-b border-border">
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            <Button 
              variant={currentTab === 'all' ? 'secondary' : 'ghost'}
              onClick={() => setCurrentTab('all')}
              size="sm"
            >
              Все ({conversations.length})
            </Button>
            <Button 
              variant={currentTab === 'unread' ? 'secondary' : 'ghost'}
              onClick={() => setCurrentTab('unread')}
              size="sm"
            >
              Непрочитанные ({conversations.filter(c => c.unreadCount > 0).length})
            </Button>
            <Button 
              variant={currentTab === 'archived' ? 'secondary' : 'ghost'}
              onClick={() => setCurrentTab('archived')}
              size="sm"
            >
              Архив ({conversations.filter(c => c.isArchived).length})
            </Button>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1">
        {filteredConversations.length > 0 ? (
          filteredConversations.map(conv => (
            <div
              key={conv.id}
              className={`p-4 border-b border-border hover:bg-secondary/10 cursor-pointer transition-colors ${activeConversation?.id === conv.id ? 'bg-secondary/20' : ''}`}
              onClick={() => onSelectConversation(conv)}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conv.user.avatar || undefined} alt={conv.user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">{conv.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conv.user.isOnline && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium truncate">{conv.user.name}</h3>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{conv.lastMessage.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conv.lastMessage.sender === 'me' && 'Вы: '}
                    {conv.lastMessage.text}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-muted-foreground truncate">{conv.user.title}</span>
                    {conv.unreadCount > 0 && <Badge className="ml-auto" variant="default"><Bell className="w-3 h-3 mr-1" />{conv.unreadCount}</Badge>}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            <p>Нет диалогов, соответствующих запросу.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default LeftSidebar; 