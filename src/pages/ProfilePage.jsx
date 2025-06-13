import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, CreditCard, Bitcoin, Edit, Save, MessageSquare,
  Calendar, Wallet, Star, Settings as SettingsIcon
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ProfileForm from '@/components/profile/ProfileForm';
import PaymentMethods from '@/components/profile/PaymentMethods';
import CryptoWallets from '@/components/profile/CryptoWallets';
import Balance from '@/components/profile/Balance';
import Reviews from '@/components/profile/Reviews';
import Lessons from '@/components/profile/Lessons';
import ConnectWalletModal from '@/components/ConnectWalletModal';
import ChatInterface from '@/components/profile/ChatInterface';
import Settings from '@/components/profile/Settings';
import DepositModal from '@/components/DepositModal';
import WithdrawModal from '@/components/WithdrawModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const initialUserData = {
  name: 'Алексей Морозов',
  email: 'alex.morozov@example.com',
  phone: '+7 (999) 123-45-67',
  location: 'Москва',
  bio: 'Опытный преподаватель с 5-летним стажем. Специализируюсь на веб-разработке и с удовольствием делюсь своими знаниями с учениками.',
  title: 'Старший веб-разработчик',
  hourlyRate: 2500,
  acceptsCrypto: true,
  profilePicture: null,
  skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'UI/UX Design'],
  education: [
    { id: 'edu1', degree: 'Магистр компьютерных наук', institution: 'МГУ', year: '2018' },
    { id: 'edu2', degree: 'Бакалавр компьютерной инженерии', institution: 'МФТИ', year: '2016' }
  ],
  experience: [
    { id: 'exp1', title: 'Старший веб-разработчик', company: 'Технологии будущего', period: '2020 - Настоящее время', description: 'Руководство фронтенд-разработкой для корпоративных приложений.' },
    { id: 'exp2', title: 'Веб-разработчик', company: 'Цифровые решения', period: '2018 - 2020', description: 'Разработка адаптивных веб-приложений с использованием React и Node.js.' }
  ],
  certifications: [
    { id: 'cert1', name: 'AWS Certified Developer' },
    { id: 'cert2', name: 'Google Cloud Professional Developer' },
    { id: 'cert3', name: 'React Advanced Certification' }
  ],
  balance: 25000,
  transactions: [
    {
      id: 't1',
      type: 'deposit',
      amount: 5000,
      description: 'Пополнение счета',
      date: '2024-03-15T10:30:00'
    },
    {
      id: 't2',
      type: 'withdrawal',
      amount: 3000,
      description: 'Вывод средств на карту',
      date: '2024-03-10T15:45:00'
    },
    {
      id: 't3',
      type: 'deposit',
      amount: 8000,
      description: 'Оплата за уроки',
      date: '2024-03-05T09:15:00'
    }
  ],
  upcomingLessons: [
    {
      id: 'l1',
      title: 'Введение в React',
      teacher: 'Иван Петров',
      date: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(), // Через 2 часа
      location: 'Онлайн',
      status: 'ожидается',
      jitsiLink: 'https://meet.jit.si/VvedenieVReact-IvanPetrov',
      hasRecording: false,
      recordUrl: null,
      feedbackLeft: false,
      hasChat: true,
    },
    {
      id: 'l2',
      title: 'Продвинутый JavaScript',
      teacher: 'Мария Иванова',
      date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), // Завтра
      location: 'Онлайн',
      status: 'ожидается',
      jitsiLink: 'https://meet.jit.si/ProdvinutiyJavaScript-MariaIvanova',
      hasRecording: false,
      recordUrl: null,
      feedbackLeft: false,
      hasChat: false,
    },
    {
      id: 'l5',
      title: 'Основы Tailwind CSS',
      teacher: 'Петр Смирнов',
      date: new Date(new Date().getTime() - 30 * 60 * 1000).toISOString(), // Начался 30 минут назад
      location: 'Онлайн',
      status: 'онлайн',
      jitsiLink: 'https://meet.jit.si/OsnovyTailwindCSS-PetrSmirnov',
      hasRecording: false,
      recordUrl: null,
      feedbackLeft: false,
      hasChat: true,
    },
  ],
  pastLessons: [
    {
      id: 'l3',
      title: 'Основы TypeScript',
      teacher: 'Анна Сидорова',
      date: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), // Неделю назад
      location: 'Онлайн',
      status: 'завершено',
      jitsiLink: null,
      hasRecording: true,
      recordUrl: 'https://example.com/recordings/typescript_anna.mp4',
      feedbackLeft: true,
      hasChat: true,
    },
    {
      id: 'l4',
      title: 'Node.js для начинающих',
      teacher: 'Дмитрий Смирнов',
      date: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(), // Две недели назад
      location: 'Онлайн',
      status: 'завершено',
      jitsiLink: null,
      hasRecording: true,
      recordUrl: 'https://example.com/recordings/nodejs_dmitry.mp4',
      feedbackLeft: false,
      hasChat: false,
    },
    {
      id: 'l6',
      title: 'Введение в Figma',
      teacher: 'Елена Козлова',
      date: new Date(new Date().getTime() - 21 * 24 * 60 * 60 * 1000).toISOString(), // Три недели назад
      location: 'Онлайн',
      status: 'в записи',
      jitsiLink: null,
      hasRecording: true,
      recordUrl: 'https://example.com/recordings/figma_elena.mp4',
      feedbackLeft: false,
      hasChat: false,
    },
    {
      id: 'l7',
      title: 'Основы UI/UX Дизайна',
      teacher: 'Ирина Новикова',
      date: new Date(new Date().getTime() - 28 * 24 * 60 * 60 * 1000).toISOString(), // Четыре недели назад
      location: 'Онлайн',
      status: 'отмена',
      jitsiLink: null,
      hasRecording: false,
      recordUrl: null,
      feedbackLeft: false,
      hasChat: false,
    },
  ],
  reviews: [
    {
      id: 'r1',
      student: { name: 'Анна Сидорова', avatar: null },
      rating: 5,
      comment: 'Отличный преподаватель! Объясняет сложные вещи простым языком. Рекомендую!',
      date: '2024-03-15T16:30:00'
    },
    {
      id: 'r2',
      student: { name: 'Дмитрий Смирнов', avatar: null },
      rating: 4,
      comment: 'Хорошие уроки, много практики. Спасибо за помощь в освоении Node.js!',
      date: '2024-03-14T18:00:00'
    }
  ],
  averageRating: 4.5,
  paymentMethods: [
    { id: 'pm1', type: 'card', last4: '4242', expiry: '05/25', isDefault: true }
  ],
  cryptoWallets: [
    { id: 'cw1', type: 'bitcoin', name: 'Мой Bitcoin кошелек', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', isDefault: true },
    { id: 'cw2', type: 'ethereum', name: 'Мой Ethereum кошелек', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', isDefault: false }
  ],
  conversations: [
    {
      id: 'c1',
      user: {
        name: 'Иван Петров',
        avatar: null,
        online: true
      },
      lastMessage: 'Спасибо за урок! Очень полезно.',
      lastMessageTime: '2024-03-19T15:30:00',
      messages: [
        {
          id: 'm1',
          text: 'Здравствуйте! Я хотел бы записаться на урок по React.',
          time: '2024-03-19T14:00:00',
          isOwn: false
        },
        {
          id: 'm2',
          text: 'Здравствуйте! Конечно, я могу помочь вам с React. Когда вам удобно?',
          time: '2024-03-19T14:05:00',
          isOwn: true
        },
        {
          id: 'm3',
          text: 'Может быть завтра в 15:00?',
          time: '2024-03-19T14:10:00',
          isOwn: false
        },
        {
          id: 'm4',
          text: 'Да, завтра в 15:00 подходит. Я отправлю вам ссылку на конференцию.',
          time: '2024-03-19T14:15:00',
          isOwn: true
        },
        {
          id: 'm5',
          text: 'Спасибо за урок! Очень полезно.',
          time: '2024-03-19T15:30:00',
          isOwn: false
        }
      ]
    },
    {
      id: 'c2',
      user: {
        name: 'Мария Иванова',
        avatar: null,
        online: false
      },
      lastMessage: 'До встречи на следующем уроке!',
      lastMessageTime: '2024-03-18T16:45:00',
      messages: [
        {
          id: 'm6',
          text: 'Здравствуйте! Я хотела бы обсудить домашнее задание.',
          time: '2024-03-18T16:00:00',
          isOwn: false
        },
        {
          id: 'm7',
          text: 'Здравствуйте! Конечно, что именно вас интересует?',
          time: '2024-03-18T16:05:00',
          isOwn: true
        },
        {
          id: 'm8',
          text: 'У меня возникли сложности с асинхронными функциями.',
          time: '2024-03-18T16:10:00',
          isOwn: false
        },
        {
          id: 'm9',
          text: 'Давайте разберем это на следующем уроке. Я подготовлю дополнительные материалы.',
          time: '2024-03-18T16:15:00',
          isOwn: true
        },
        {
          id: 'm10',
          text: 'До встречи на следующем уроке!',
          time: '2024-03-18T16:45:00',
          isOwn: false
        }
      ]
    }
  ],
  category: 'web_developer',
};

const categories = [
  {
    value: 'art_tutor',
    label: 'Репетитор по искусству'
  },
  {
    value: 'web_developer',
    label: 'Веб-разработчик'
  },
  {
    value: 'ui_ux_designer',
    label: 'UI/UX Дизайнер'
  },
  {
    value: 'musician',
    label: 'Музыкант'
  },
  {
    value: 'language_tutor',
    label: 'Репетитор по языкам'
  },
  {
    value: 'fitness_coach',
    label: 'Фитнес-тренер'
  },
  {
    value: 'photographer',
    label: 'Фотограф'
  },
  {
    value: 'chef',
    label: 'Повар'
  },
];

const ProfilePage = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState(initialUserData);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // В реальном приложении здесь будет загрузка данных пользователя с сервера
    // и установка их в состояние userData.
    // Для мок-данных мы просто имитируем загрузку.
  }, []);

  const handleSaveProfile = (updatedData) => {
    setUserData(prev => ({ ...prev, ...updatedData }));
    setIsEditing(false);
    toast({
      title: "Профиль обновлен",
      description: "Ваши изменения успешно сохранены.",
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleOpenConnectWalletModal = () => {
    setShowConnectWalletModal(true);
  };

  const handleOpenDepositModal = () => {
    setShowDepositModal(true);
  };

  const handleOpenWithdrawModal = () => {
    setShowWithdrawModal(true);
  };

  const handleDepositSuccess = (amount) => {
    setUserData(prev => ({ ...prev, balance: prev.balance + amount }));
    setShowDepositModal(false);
    toast({
      title: "Пополнение успешно",
      description: `Счет пополнен на ${amount} RUB.`,
    });
  };

  const handleWithdrawSuccess = (amount) => {
    setUserData(prev => ({ ...prev, balance: prev.balance - amount }));
    setShowWithdrawModal(false);
    toast({
      title: "Вывод средств",
      description: `Заявка на вывод ${amount} RUB принята.`,
    });
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({ ...prev, profilePicture: reader.result }));
        toast({
          title: "Фото профиля обновлено",
          description: "Ваше новое фото профиля установлено.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = (conversationId, text) => {
    setUserData(prevData => {
      const updatedConversations = prevData.conversations.map(conv => {
        if (conv.id === conversationId) {
          const newMessage = {
            id: `m${conv.messages.length + 1}`,
            text: text,
            time: new Date().toISOString(),
            isOwn: true,
          };
          return { ...conv, messages: [...conv.messages, newMessage], lastMessage: text, lastMessageTime: newMessage.time };
        }
        return conv;
      });
      return { ...prevData, conversations: updatedConversations };
    });
  };

  const handleLeaveReview = (lessonId, rating, comment) => {
    setUserData(prevData => {
      const updatedPastLessons = prevData.pastLessons.map(lesson => {
        if (lesson.id === lessonId) {
          return { ...lesson, feedbackLeft: true };
        }
        return lesson;
      });
      const newReview = {
        id: `r${prevData.reviews.length + 1}`,
        student: { name: userData.name, avatar: userData.profilePicture }, // Имитация студента, который оставляет отзыв
        rating: rating,
        comment: comment,
        date: new Date().toISOString(),
      };
      return {
        ...prevData,
        pastLessons: updatedPastLessons,
        reviews: [...prevData.reviews, newReview],
      };
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64">
          <Card className="p-6 text-center shadow-lg">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <Avatar className="w-24 h-24 mx-auto mb-4 cursor-pointer" onClick={handleAvatarClick}>
              <AvatarImage src={userData.profilePicture || "https://api.dicebear.com/7.x/initials/svg?seed=AlexeyMorozov"} alt="Аватар" />
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{userData.name}</h2>
            <p className="text-muted-foreground">{userData.title}</p>
            {userData.averageRating && (
              <div className="flex items-center justify-center mt-2 text-yellow-500">
                <Star className="h-4 w-4 fill-current mr-1" />
                <span>{userData.averageRating.toFixed(1)}</span>
              </div>
            )}
            <div className="mt-4 flex flex-col gap-2">
              <Button
                variant={activeTab === 'profile' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('profile')}
              >
                <User className="mr-2 h-4 w-4" /> Профиль
              </Button>
              <Button
                variant={activeTab === 'balance' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('balance')}
              >
                <Wallet className="mr-2 h-4 w-4" /> Баланс
              </Button>
              <Button
                variant={activeTab === 'lessons' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('lessons')}
              >
                <Calendar className="mr-2 h-4 w-4" /> Занятия
              </Button>
              <Button
                variant={activeTab === 'reviews' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('reviews')}
              >
                <Star className="mr-2 h-4 w-4" /> Отзывы
              </Button>
              <Button
                variant={activeTab === 'payments' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('payments')}
              >
                <CreditCard className="mr-2 h-4 w-4" /> Платежи
              </Button>
              <Button
                variant={activeTab === 'chat' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('chat')}
              >
                <MessageSquare className="mr-2 h-4 w-4" /> Чат
              </Button>
              <Button
                variant={activeTab === 'settings' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('settings')}
              >
                <SettingsIcon className="mr-2 h-4 w-4" /> Настройки
              </Button>
            </div>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="profile">
              <ProfileForm 
                userData={userData} 
                onSave={handleSaveProfile} 
                isEditing={isEditing} 
                onEditToggle={handleEditToggle}
                categories={categories}
              />
            </TabsContent>
            <TabsContent value="balance">
              <Balance 
                balance={userData.balance} 
                transactions={userData.transactions} 
                onOpenDeposit={handleOpenDepositModal}
                onOpenWithdraw={handleOpenWithdrawModal}
              />
            </TabsContent>
            <TabsContent value="lessons">
              <Lessons 
                upcomingLessons={userData.upcomingLessons} 
                pastLessons={userData.pastLessons} 
                onLeaveReview={handleLeaveReview} 
              />
            </TabsContent>
            <TabsContent value="reviews">
              <Reviews reviews={userData.reviews} />
            </TabsContent>
            <TabsContent value="payments">
              <PaymentMethods paymentMethods={userData.paymentMethods} cryptoWallets={userData.cryptoWallets} onOpenConnectWalletModal={handleOpenConnectWalletModal} />
            </TabsContent>
            <TabsContent value="chat">
              <ChatInterface conversations={userData.conversations} onSendMessage={handleSendMessage} />
            </TabsContent>
            <TabsContent value="settings">
              <Settings />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <ConnectWalletModal
        isOpen={showConnectWalletModal}
        onClose={() => setShowConnectWalletModal(false)}
      />

      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        onDepositSuccess={handleDepositSuccess}
      />

      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onWithdrawSuccess={handleWithdrawSuccess}
      />
    </div>
  );
};

export default ProfilePage;