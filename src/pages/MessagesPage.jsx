import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Send, Paperclip, 
  Phone, Video, Info, ChevronLeft, MessageSquare
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const mockConversationsData = [
  {
    id: 1,
    user: { id: 101, name: 'Dr. Emily Johnson', avatar: null, title: 'Mathematics Professor', isOnline: true },
    lastMessage: { text: 'I can help you with calculus. When would you like to schedule our first session?', time: '10:42 AM', isRead: true, sender: 'them' },
    unreadCount: 0,
  },
  {
    id: 2,
    user: { id: 102, name: 'Marcus Chen', avatar: null, title: 'Woodworking Craftsman', isOnline: false },
    lastMessage: { text: 'Your custom bookshelf design looks great! I can start working on it next week.', time: 'Yesterday', isRead: false, sender: 'them' },
    unreadCount: 2,
  },
];

const mockMessagesData = {
  1: [
    { id: 'm1-1', text: 'Hello! I saw your profile and I\'m interested in learning calculus.', time: '10:30 AM', sender: 'me', status: 'read' },
    { id: 'm1-2', text: 'Hi there! I\'d be happy to help. What topics are you focusing on?', time: '10:35 AM', sender: 'them', status: 'delivered' },
  ],
  2: [
    { id: 'm2-1', text: 'Hey Marcus, about that bookshelf...', time: 'Yesterday', sender: 'me', status: 'read' },
    { id: 'm2-2', text: 'Your custom bookshelf design looks great! I can start working on it next week.', time: 'Yesterday', sender: 'them', status: 'delivered' },
  ],
};

const ConversationItem = ({ conversation, isActive, onSelect }) => (
  <div
    className={`p-4 border-b border-border hover:bg-secondary/10 cursor-pointer transition-colors ${isActive ? 'bg-secondary/20' : ''}`}
    onClick={onSelect}
  >
    <div className="flex items-start gap-3">
      <div className="relative">
        <Avatar>
          <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
          <AvatarFallback className="bg-primary text-primary-foreground">{conversation.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {conversation.user.isOnline && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-medium truncate">{conversation.user.name}</h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{conversation.lastMessage.time}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">
          {conversation.lastMessage.sender === 'me' && 'You: '}
          {conversation.lastMessage.text}
        </p>
        <div className="flex items-center mt-1">
          <span className="text-xs text-muted-foreground truncate">{conversation.user.title}</span>
          {conversation.unreadCount > 0 && <Badge className="ml-auto" variant="default">{conversation.unreadCount}</Badge>}
        </div>
      </div>
    </div>
  </div>
);

const MessageBubble = ({ message, userAvatar, userName }) => (
  <div className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
    {message.sender === 'them' && (
      <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
        <AvatarImage src={userAvatar} alt={userName} />
        <AvatarFallback className="bg-primary text-primary-foreground text-xs">{userName.charAt(0)}</AvatarFallback>
      </Avatar>
    )}
    <div className="max-w-[70%]">
      <div className={`p-3 rounded-lg ${message.sender === 'me' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
        <p>{message.text}</p>
      </div>
      <div className={`flex items-center mt-1 text-xs text-muted-foreground ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
        <span>{message.time}</span>
        {message.sender === 'me' && <span className="ml-2">{message.status}</span>}
      </div>
    </div>
  </div>
);

const ChatHeader = ({ user, onBack, isMobileView }) => (
  <div className="p-4 border-b border-border flex items-center justify-between">
    <div className="flex items-center">
      {isMobileView && (
        <Button variant="ghost" size="icon" className="mr-2" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}
      <Avatar className="h-10 w-10 mr-3">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="bg-primary text-primary-foreground">{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-medium flex items-center">
          {user.name}
          {user.isOnline && <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>}
        </h3>
        <p className="text-xs text-muted-foreground">{user.isOnline ? 'Online' : 'Offline'}</p>
      </div>
    </div>
    <div className="flex items-center">
      <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
      <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
      <Button variant="ghost" size="icon"><Info className="h-5 w-5" /></Button>
    </div>
  </div>
);

const MessageInput = ({ newMessage, setNewMessage, onSendMessage }) => (
  <div className="p-4 border-t border-border">
    <form onSubmit={onSendMessage} className="flex items-center gap-2">
      <Button type="button" variant="ghost" size="icon"><Paperclip className="h-5 w-5" /></Button>
      <Input type="text" placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1" />
      <Button type="submit" size="icon" disabled={!newMessage.trim()}><Send className="h-5 w-5" /></Button>
    </form>
  </div>
);

const MessagesPage = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    setTimeout(() => {
      setConversations(mockConversationsData);
      if (mockConversationsData.length > 0 && !isMobileView) {
        setActiveConversation(mockConversationsData[0]);
        setMessages(mockMessagesData[mockConversationsData[0].id] || []);
      }
    }, 500);

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      if (!mobile && conversations.length > 0 && !activeConversation) {
        setActiveConversation(conversations[0]);
        setMessages(mockMessagesData[conversations[0].id] || []);
        setShowConversationList(true);
      } else if (mobile) {
        setShowConversationList(!activeConversation);
      } else {
        setShowConversationList(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); 
  
  useEffect(() => {
    if (activeConversation) {
      setMessages(mockMessagesData[activeConversation.id] || []);
    }
  }, [activeConversation]);


  const handleConversationSelect = useCallback((conversation) => {
    setActiveConversation(conversation);
    if (isMobileView) setShowConversationList(false);
    setConversations(prev => prev.map(conv => conv.id === conversation.id ? { ...conv, unreadCount: 0, lastMessage: { ...conv.lastMessage, isRead: true } } : conv));
  }, [isMobileView]);

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    const newMsg = {
      id: `m${activeConversation.id}-${messages.length + 1}`,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      status: 'sent'
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
    
    mockMessagesData[activeConversation.id] = [...(mockMessagesData[activeConversation.id] || []), newMsg];


    setConversations(prev => prev.map(conv => conv.id === activeConversation.id ? { ...conv, lastMessage: { text: newMsg.text, time: newMsg.time, isRead: true, sender: 'me' } } : conv));

    setTimeout(() => {
      const responseMsg = {
        id: `m${activeConversation.id}-${messages.length + 2}`,
        text: 'Thanks for your message! I\'ll get back to you soon.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'them',
        status: 'delivered'
      };
      setMessages(prev => [...prev, responseMsg]);
      mockMessagesData[activeConversation.id] = [...(mockMessagesData[activeConversation.id] || []), responseMsg];
      setConversations(prev => prev.map(conv => conv.id === activeConversation.id ? { ...conv, lastMessage: { text: responseMsg.text, time: responseMsg.time, isRead: false, sender: 'them' }, unreadCount: 0 } : conv));
    }, 1500);
  }, [newMessage, activeConversation, messages]);

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.user.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-20 pb-10 h-screen">
      <div className="container mx-auto px-4 h-full max-h-[calc(100vh-8rem)]">
        <div className="flex flex-col h-full max-h-full">
          <h1 className="text-3xl font-bold mb-6">Messages</h1>
          <div className="flex-1 overflow-hidden rounded-lg border border-border">
            <div className="flex h-full">
              {(showConversationList || !isMobileView) && (
                <motion.div
                  className="w-full md:w-1/3 border-r border-border flex flex-col bg-background"
                  initial={{ x: isMobileView && showConversationList ? 0 : (isMobileView ? -300 : 0), opacity: isMobileView && showConversationList ? 1 : (isMobileView ? 0 : 1) }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: isMobileView ? -300 : 0, opacity: isMobileView ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  layout
                >
                  <div className="p-4 border-b border-border">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input type="text" placeholder="Search conversations..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                  </div>
                  <ScrollArea className="flex-1">
                    {filteredConversations.length > 0 ? (
                      filteredConversations.map((conversation) => (
                        <ConversationItem key={conversation.id} conversation={conversation} isActive={activeConversation?.id === conversation.id} onSelect={() => handleConversationSelect(conversation)} />
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">No conversations found</div>
                    )}
                  </ScrollArea>
                </motion.div>
              )}

              {(!showConversationList || !isMobileView) && activeConversation ? (
                <motion.div
                  className="w-full md:w-2/3 flex flex-col bg-background"
                  initial={{ x: isMobileView && !showConversationList ? 0 : (isMobileView ? 300 : 0), opacity: isMobileView && !showConversationList ? 1 : (isMobileView ? 0 : 1) }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: isMobileView ? 300 : 0, opacity: isMobileView ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  layout
                >
                  <ChatHeader user={activeConversation.user} onBack={() => setShowConversationList(true)} isMobileView={isMobileView} />
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <MessageBubble key={message.id} message={message} userAvatar={activeConversation.user.avatar} userName={activeConversation.user.name} />
                      ))}
                       <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  <MessageInput newMessage={newMessage} setNewMessage={setNewMessage} onSendMessage={handleSendMessage} />
                </motion.div>
              ) : (!activeConversation && (!showConversationList || !isMobileView)) && (
                <div className="w-full md:w-2/3 flex flex-col items-center justify-center p-4 text-center">
                  <div className="mb-4 text-muted-foreground">
                    <MessageSquare className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Conversation Selected</h3>
                    <p className="text-muted-foreground mb-6">Select a conversation from the list to start messaging</p>
                    {isMobileView && <Button onClick={() => setShowConversationList(true)}>View Conversations</Button>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;