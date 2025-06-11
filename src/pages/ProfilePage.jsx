import React, { useState, useRef } from 'react';
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
import Messages from '@/components/profile/Messages';
import Settings from '@/components/profile/Settings';
import DepositModal from '@/components/DepositModal';
import WithdrawModal from '@/components/WithdrawModal';

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
      student: { name: 'Иван Петров', avatar: null },
      date: '2024-03-20T15:00:00',
      location: 'Онлайн'
    },
    {
      id: 'l2',
      title: 'Продвинутый JavaScript',
      student: { name: 'Мария Иванова', avatar: null },
      date: '2024-03-21T18:00:00',
      location: 'Онлайн'
    }
  ],
  pastLessons: [
    {
      id: 'l3',
      title: 'Основы TypeScript',
      student: { name: 'Анна Сидорова', avatar: null },
      date: '2024-03-15T14:00:00',
      hasReview: true
    },
    {
      id: 'l4',
      title: 'Node.js для начинающих',
      student: { name: 'Дмитрий Смирнов', avatar: null },
      date: '2024-03-14T16:00:00',
      hasReview: false
    }
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
  ]
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
  {
    value: 'craftsman',
    label: 'Мастер поделок'
  },
  {
    value: 'other',
    label: 'Другое'
  }
];

const ProfilePage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [formData, setFormData] = useState({...initialUserData});
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const fileInputRef = useRef(null);

  const handleSaveProfile = (updatedData) => {
    setUserData(updatedData);
    setFormData(updatedData); 
    setIsEditing(false);
    toast({
      title: "Профиль обновлен",
      description: "Ваш профиль был успешно обновлен.",
      duration: 3000,
    });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSaveProfile(formData);
    } else {
      setFormData({...userData}); 
      setIsEditing(true);
    }
  };
  
  const handleOpenConnectWalletModal = () => {
    setIsConnectWalletModalOpen(true);
  };

  const handleOpenDepositModal = () => {
    setIsDepositModalOpen(true);
  };

  const handleOpenWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
  };

  const handleDepositSuccess = (amount) => {
    setUserData(prevData => ({
      ...prevData,
      balance: prevData.balance + amount,
      transactions: [{
        id: `t${Date.now()}`,
        type: 'deposit',
        amount: amount,
        description: 'Пополнение счета',
        date: new Date().toISOString()
      }, ...prevData.transactions]
    }));
    toast({
      title: "Успешно пополнено!",
      description: `Баланс пополнен на ${amount} ₽.`,
      duration: 3000,
    });
    setIsDepositModalOpen(false);
  };

  const handleWithdrawSuccess = (amount) => {
    setUserData(prevData => ({
      ...prevData,
      balance: prevData.balance - amount,
      transactions: [{
        id: `t${Date.now()}`,
        type: 'withdrawal',
        amount: amount,
        description: 'Вывод средств на карту',
        date: new Date().toISOString()
      }, ...prevData.transactions]
    }));
    toast({
      title: "Вывод средств",
      description: `Запрос на вывод ${amount} ₽ отправлен.`,
      duration: 3000,
    });
    setIsWithdrawModalOpen(false);
  };

  const handleAvatarClick = () => {
    if (!isEditing) return;
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Ошибка загрузки",
        description: "Пожалуйста, выберите файл изображения (JPEG, PNG, GIF).",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Ошибка загрузки",
        description: "Размер файла не должен превышать 5 МБ.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData(prevData => ({ ...prevData, profilePicture: reader.result }));
      setFormData(prevData => ({ ...prevData, profilePicture: reader.result }));
      toast({
        title: "Фото профиля обновлено",
        description: "Ваше фото профиля успешно загружено.",
        duration: 3000,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="pt-24 pb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Мой профиль</h1>
              <p className="text-muted-foreground">
                Управление личной информацией и настройками
              </p>
            </div>
            {activeTab === 'profile' && (
              <Button 
                onClick={handleEditToggle}
                className="flex items-center gap-2"
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4" />
                    Сохранить
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4" />
                    Редактировать
                  </>
                )}
              </Button>
            )}
          </div>
          
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-4">
                  <div 
                    className="flex flex-col items-center mb-6 pt-4 cursor-pointer relative"
                    onClick={handleAvatarClick}
                  >
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={userData.profilePicture || undefined} alt={userData.name} />
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {userData.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-sm">Загрузить фото</span>
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      accept="image/*" 
                      className="hidden" 
                    />
                    <h2 className="text-xl font-semibold text-center">{userData.name}</h2>
                    <p className="text-muted-foreground text-center">{userData.title}</p>
                  </div>
                  
                  <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-1">
                    <TabsTrigger value="profile" className="justify-start w-full">
                      <User className="mr-2 h-4 w-4" />
                      Профиль
                    </TabsTrigger>
                    <TabsTrigger value="balance" className="justify-start w-full">
                      <Wallet className="mr-2 h-4 w-4" />
                      Баланс
                    </TabsTrigger>
                    <TabsTrigger value="lessons" className="justify-start w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Занятия
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="justify-start w-full">
                      <Star className="mr-2 h-4 w-4" />
                      Отзывы
                    </TabsTrigger>
                    <TabsTrigger value="payment" className="justify-start w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Платежи
                    </TabsTrigger>
                    <TabsTrigger value="crypto" className="justify-start w-full">
                      <Bitcoin className="mr-2 h-4 w-4" />
                      Крипто
                    </TabsTrigger>
                    <TabsTrigger value="messages" className="justify-start w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Сообщения
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="justify-start w-full">
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Настройки
                    </TabsTrigger>
                  </TabsList>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <TabsContent value="profile" className="mt-0">
                <ProfileForm 
                  isEditing={isEditing} 
                  formData={formData} 
                  setFormData={setFormData} 
                  userData={userData}
                  onSave={handleSaveProfile}
                  categories={categories}
                />
              </TabsContent>
              
              <TabsContent value="balance" className="mt-0">
                <Balance 
                  balance={userData.balance}
                  transactions={userData.transactions}
                  onDepositClick={handleOpenDepositModal}
                  onWithdrawClick={handleOpenWithdrawModal}
                />
              </TabsContent>

              <TabsContent value="lessons" className="mt-0">
                <Lessons 
                  upcomingLessons={userData.upcomingLessons}
                  pastLessons={userData.pastLessons}
                />
              </TabsContent>

              <TabsContent value="reviews" className="mt-0">
                <Reviews 
                  reviews={userData.reviews}
                  averageRating={userData.averageRating}
                />
              </TabsContent>
              
              <TabsContent value="payment" className="mt-0">
                <PaymentMethods 
                  paymentMethods={userData.paymentMethods} 
                  setUserData={setUserData} 
                />
              </TabsContent>
              
              <TabsContent value="crypto" className="mt-0">
                <CryptoWallets 
                  cryptoWallets={userData.cryptoWallets} 
                  setUserData={setUserData}
                  onConnectWallet={handleOpenConnectWalletModal}
                />
              </TabsContent>

              <TabsContent value="messages" className="mt-0">
                <Messages conversations={userData.conversations} />
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <Settings />
              </TabsContent>
              
            </div>
          </Tabs>
        </div>
      </div>
      <ConnectWalletModal isOpen={isConnectWalletModalOpen} setIsOpen={setIsConnectWalletModalOpen} />
      <DepositModal isOpen={isDepositModalOpen} setIsOpen={setIsDepositModalOpen} onDepositSuccess={handleDepositSuccess} onConnectWallet={handleOpenConnectWalletModal} />
      <WithdrawModal isOpen={isWithdrawModalOpen} setIsOpen={setIsWithdrawModalOpen} onWithdrawSuccess={handleWithdrawSuccess} onConnectWallet={handleOpenConnectWalletModal} />
    </div>
  );
};

export default ProfilePage;