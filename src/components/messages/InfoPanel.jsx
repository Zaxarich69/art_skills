import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Star, Phone, Video, Calendar, CreditCard, 
  FileText, Pin, Info, X, ChevronDown, ChevronUp
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const InfoPanel = ({ activeConversation, isMobile, onCloseInfoPanel }) => {
  if (!activeConversation) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-center p-4">
        <Info className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Информация о диалоге</h2>
        <p className="text-gray-600 dark:text-gray-400">Выберите диалог, чтобы увидеть информацию о собеседнике.</p>
      </div>
    );
  }

  const { user, rating, sharedFiles, pinnedMessages } = activeConversation;

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-xl font-bold">Информация</h2>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onCloseInfoPanel}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1 p-4">
        {/* Мини-профиль собеседника */}
        <Card className="mb-6 bg-white/30 backdrop-blur-md shadow-lg rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/20">
          <CardHeader className="flex-col items-center text-center">
            <Avatar className="h-20 w-20 mb-3">
              <AvatarImage src={user.avatar || undefined} alt={user.name} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription className="text-muted-foreground">{user.title}</CardDescription>
            {rating && (
              <div className="flex items-center mt-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{rating}</span>
              </div>
            )}
          </CardHeader>
          <CardContent className="flex justify-center gap-2">
            <Button variant="outline"><Phone className="h-4 w-4 mr-2" />Позвонить</Button>
            <Button variant="outline"><Video className="h-4 w-4 mr-2" />Видеозвонок</Button>
          </CardContent>
        </Card>

        {/* Быстрые действия */}
        <Card className="mb-6 bg-white/30 backdrop-blur-md shadow-lg rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/20">
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3">
            <Button variant="secondary" className="w-full justify-start"><Calendar className="h-4 w-4 mr-2" />Забронировать урок</Button>
            <Button variant="secondary" className="w-full justify-start"><CreditCard className="h-4 w-4 mr-2" />Запросить оплату</Button>
            <Button variant="secondary" className="w-full justify-start"><MessageSquare className="h-4 w-4 mr-2" />Открыть спор</Button>
          </CardContent>
        </Card>

        {/* Общие файлы */}
        <Card className="mb-6 bg-white/30 backdrop-blur-md shadow-lg rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center"><FileText className="h-5 w-5 mr-2" />Общие файлы</CardTitle>
          </CardHeader>
          <CardContent>
            {sharedFiles && sharedFiles.length > 0 ? (
              <ul>
                {sharedFiles.map((file, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{file.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">Нет общих файлов.</p>
            )}
          </CardContent>
        </Card>

        {/* Закрепленные сообщения */}
        <Card className="bg-white/30 backdrop-blur-md shadow-lg rounded-xl transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center"><Pin className="h-5 w-5 mr-2" />Закрепленные сообщения</CardTitle>
          </CardHeader>
          <CardContent>
            {pinnedMessages && pinnedMessages.length > 0 ? (
              <ul>
                {pinnedMessages.map((msg, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{msg.text}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">Нет закрепленных сообщений.</p>
            )}
          </CardContent>
        </Card>

      </ScrollArea>
    </div>
  );
};

export default InfoPanel; 