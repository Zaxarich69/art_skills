import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, CreditCard, Bitcoin, Edit, Save, MessageSquare,
  Calendar, Wallet, Star, Settings as SettingsIcon, BookOpen, PlusCircle, MinusCircle, ArrowUpCircle, ArrowDownCircle, Clock, Trash2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ProfileForm from '@/components/profile/ProfileForm';
import PaymentMethods from '@/components/profile/PaymentMethods';
import CryptoWallets from '@/components/profile/CryptoWallets';
import Balance from '@/components/profile/Balance';
import Reviews from '@/components/profile/Reviews';
import Lessons from '@/components/profile/Lessons';
import ChatInterface from '@/components/profile/ChatInterface';
import DepositModal from '@/components/DepositModal';
import WithdrawModal from '@/components/WithdrawModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import FavoritesTab from '@/components/profile/FavoritesTab';
import { daysOfWeek } from "@/utils/daysOfWeek";
import AvailabilityBlock from "@/components/profile/AvailabilityBlock";

const initialUserData = {
  name: 'Alexey Morozov',
  email: 'alex.morozov@example.com',
  phone: '+7 (999) 123-45-67',
  location: 'Moscow',
  bio: 'Experienced teacher with 5 years of practice. I specialize in web development and enjoy sharing my knowledge with students.',
  title: 'Senior Web Developer',
  hourlyRate: 2500,
  acceptsCrypto: true,
  profilePicture: null,
  skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'UI/UX Design'],
  education: [
    { id: 'edu1', degree: 'Master of Computer Science', institution: 'MSU', year: '2018' },
    { id: 'edu2', degree: 'Bachelor of Computer Engineering', institution: 'MIPT', year: '2016' }
  ],
  experience: [
    { id: 'exp1', title: 'Senior Web Developer', company: 'Future Technologies', period: '2020 - Present', description: 'Led frontend development for enterprise applications.' },
    { id: 'exp2', title: 'Web Developer', company: 'Digital Solutions', period: '2018 - 2020', description: 'Developed responsive web apps using React and Node.js.' }
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
      description: 'Account top-up',
      date: '2024-03-15T10:30:00'
    },
    {
      id: 't2',
      type: 'withdrawal',
      amount: 3000,
      description: 'Withdrawal to card',
      date: '2024-03-10T15:45:00'
    },
    {
      id: 't3',
      type: 'deposit',
      amount: 8000,
      description: 'Payment for lessons',
      date: '2024-03-05T09:15:00'
    }
  ],
  upcomingLessons: [
    {
      id: 'l1',
      title: 'Introduction to React',
      teacher: 'Ivan Petrov',
      date: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toISOString(),
      location: 'Online',
      status: 'pending',
      jitsiLink: 'https://meet.jit.si/VvedenieVReact-IvanPetrov',
      hasRecording: false,
      recordUrl: null,
      feedbackLeft: false,
      hasChat: true,
    },
    {
      id: 'l2',
      title: 'Advanced JavaScript',
      teacher: 'Maria Ivanova',
      date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
      location: 'Online',
      status: 'pending',
      jitsiLink: 'https://meet.jit.si/ProdvinutiyJavaScript-MariaIvanova',
      hasRecording: false,
      recordUrl: null,
      feedbackLeft: false,
      hasChat: false,
    },
    {
      id: 'l5',
      title: 'Basics of Tailwind CSS',
      teacher: 'Petr Smirnov',
      date: new Date(new Date().getTime() - 30 * 60 * 1000).toISOString(),
      location: 'Online',
      status: 'online',
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
      title: 'Basics of TypeScript',
      teacher: 'Anna Sidorova',
      date: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Online',
      status: 'completed',
      jitsiLink: null,
      hasRecording: true,
      recordUrl: 'https://example.com/recordings/typescript_anna.mp4',
      feedbackLeft: true,
      hasChat: true,
    },
    {
      id: 'l4',
      title: 'Node.js for Beginners',
      teacher: 'Dmitry Smirnov',
      date: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Online',
      status: 'completed',
      jitsiLink: null,
      hasRecording: true,
      recordUrl: 'https://example.com/recordings/nodejs_dmitry.mp4',
      feedbackLeft: false,
      hasChat: false,
    },
    {
      id: 'l6',
      title: 'Introduction to Figma',
      teacher: 'Elena Kozlova',
      date: new Date(new Date().getTime() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Online',
      status: 'recorded',
      jitsiLink: null,
      hasRecording: true,
      recordUrl: 'https://example.com/recordings/figma_elena.mp4',
      feedbackLeft: false,
      hasChat: false,
    },
    {
      id: 'l7',
      title: 'Basics of UI/UX Design',
      teacher: 'Irina Novikova',
      date: new Date(new Date().getTime() - 28 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Online',
      status: 'cancelled',
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
      student: { name: 'Anna Sidorova', avatar: null },
      rating: 5,
      comment: 'Great teacher! Explains complex things in simple terms. Highly recommend!',
      date: '2024-03-15T16:30:00'
    },
    {
      id: 'r2',
      student: { name: 'Dmitry Smirnov', avatar: null },
      rating: 4,
      comment: 'Good lessons, lots of practice. Thanks for helping me learn Node.js!',
      date: '2024-03-14T18:00:00'
    }
  ],
  averageRating: 4.5,
  paymentMethods: [
    { id: 'pm1', type: 'card', last4: '4242', expiry: '05/25', isDefault: true }
  ],
  cryptoWallets: [
    { id: 'cw1', type: 'bitcoin', name: 'My Bitcoin Wallet', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', isDefault: true },
    { id: 'cw2', type: 'ethereum', name: 'My Ethereum Wallet', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', isDefault: false }
  ],
  conversations: [
    {
      id: 'c1',
      user: {
        name: 'Ivan Petrov',
        avatar: null,
        online: true
      },
      lastMessage: 'Thank you for the lesson! Very useful.',
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
    value: 'education',
    label: 'Education'
  },
  {
    value: 'business',
    label: 'Business'
  },
  {
    value: 'arts',
    label: 'Arts'
  },
  {
    value: 'technology',
    label: 'Technology'
  },
  {
    value: 'music',
    label: 'Music'
  },
  {
    value: 'photography',
    label: 'Photography'
  },
];

function AvailabilityEditor({ availability, onChange }) {
  const [editData, setEditData] = useState(() =>
    daysOfWeek.map(day => ({
      day,
      slots: availability.find(a => a.day === day)?.slots || []
    }))
  );
  const [newSlot, setNewSlot] = useState({ day: daysOfWeek[0], start: '', end: '' });

  const handleSlotChange = (day, idx, field, value) => {
    setEditData(prev => prev.map(a =>
      a.day === day ? {
        ...a,
        slots: a.slots.map((slot, i) =>
          i === idx ? { ...slot, [field]: value } : slot
        )
      } : a
    ));
  };

  const handleAddSlot = () => {
    if (!newSlot.start || !newSlot.end) return;
    setEditData(prev => prev.map(a =>
      a.day === newSlot.day ? {
        ...a,
        slots: [...a.slots, `${newSlot.start} – ${newSlot.end}`]
      } : a
    ));
    setNewSlot({ day: daysOfWeek[0], start: '', end: '' });
  };

  const handleRemoveSlot = (day, idx) => {
    setEditData(prev => prev.map(a =>
      a.day === day ? {
        ...a,
        slots: a.slots.filter((_, i) => i !== idx)
      } : a
    ));
  };

  const handleSave = () => {
    onChange(editData.filter(a => a.slots.length > 0));
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {editData.map((a, i) => (
          <Card key={a.day}>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">{a.day}</h4>
              <div className="space-y-2">
                {a.slots.length === 0 && <span className="text-sm text-muted-foreground">No availability</span>}
                {a.slots.map((slot, idx) => (
                  <div key={idx} className="flex items-center text-sm gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{slot}</span>
                    <button type="button" className="ml-2 text-red-500 hover:text-red-700" onClick={() => handleRemoveSlot(a.day, idx)}><Trash2 className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap items-end gap-2 mt-4">
        <label>
          Day:
          <select className="ml-2" value={newSlot.day} onChange={e => setNewSlot(s => ({ ...s, day: e.target.value }))}>
            {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
          </select>
        </label>
        <label>
          Start:
          <input type="time" className="ml-2" value={newSlot.start} onChange={e => setNewSlot(s => ({ ...s, start: e.target.value }))} />
        </label>
        <label>
          End:
          <input type="time" className="ml-2" value={newSlot.end} onChange={e => setNewSlot(s => ({ ...s, end: e.target.value }))} />
        </label>
        <button type="button" className="ml-2 px-3 py-1 bg-primary text-white rounded hover:bg-primary/80 flex items-center" onClick={handleAddSlot}>
          <PlusCircle className="h-4 w-4 mr-1" />Add time slot
        </button>
        <button type="button" className="ml-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center" onClick={handleSave}>
          <Save className="h-4 w-4 mr-1" />Save availability
        </button>
      </div>
    </div>
  );
}

const ProfilePage = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState(initialUserData);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const fileInputRef = useRef(null);
  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  const [availability, setAvailability] = useState(userData.availability || []);

  useEffect(() => {
    // Simulate fetching user data from backend
    const storedUserData = localStorage.getItem('userProfile');
    let dataToUse;
    if (storedUserData) {
      dataToUse = JSON.parse(storedUserData);
    } else {
      dataToUse = initialUserData;
    }

    // Ensure all lesson statuses are strings, defaulting if undefined
    dataToUse.upcomingLessons = dataToUse.upcomingLessons.map(lesson => ({
      ...lesson,
      status: lesson.status || 'pending' // Default status if missing
    }));
    dataToUse.pastLessons = dataToUse.pastLessons.map(lesson => ({
      ...lesson,
      status: lesson.status || 'completed' // Default status if missing
    }));

    setUserData(dataToUse);
    localStorage.setItem('userProfile', JSON.stringify(dataToUse));

  }, []);

  // Convert initialUserData's Russian fields to English on load if they are still in Russian
  useEffect(() => {
    setUserData(prevData => {
      const updatedData = { ...prevData };
      if (updatedData.name === 'Алексей Морозов') updatedData.name = 'Alexey Morozov';
      if (updatedData.location === 'Москва') updatedData.location = 'Moscow';
      if (updatedData.bio === 'Опытный преподаватель с 5-летним стажем. Специализируюсь на веб-разработке и с удовольствием делюсь своими знаниями с учениками.') updatedData.bio = 'Experienced teacher with 5 years of practice. I specialize in web development and enjoy sharing my knowledge with students.';
      if (updatedData.title === 'Старший веб-разработчик') updatedData.title = 'Senior Web Developer';
      
      updatedData.education = updatedData.education.map(edu => {
        if (edu.degree === 'Магистр компьютерных наук') edu.degree = 'Master of Computer Science';
        if (edu.institution === 'МГУ') edu.institution = 'MSU';
        if (edu.degree === 'Бакалавр компьютерной инженерии') edu.degree = 'Bachelor of Computer Engineering';
        if (edu.institution === 'МФТИ') edu.institution = 'MIPT';
        return edu;
      });

      updatedData.experience = updatedData.experience.map(exp => {
        if (exp.title === 'Старший веб-разработчик') exp.title = 'Senior Web Developer';
        if (exp.company === 'Технологии будущего') exp.company = 'Future Technologies';
        if (exp.period === '2020 - Настоящее время') exp.period = '2020 - Present';
        if (exp.description === 'Руководство фронтенд-разработкой для корпоративных приложений.') exp.description = 'Led frontend development for enterprise applications.';
        if (exp.title === 'Веб-разработчик') exp.title = 'Web Developer';
        if (exp.company === 'Цифровые решения') exp.company = 'Digital Solutions';
        if (exp.period === '2018 - 2020') exp.period = '2018 - 2020';
        if (exp.description === 'Разработка адаптивных веб-приложений с использованием React и Node.js.') exp.description = 'Developed responsive web apps using React and Node.js.';
        return exp;
      });

      updatedData.transactions = updatedData.transactions.map(transaction => {
        if (transaction.description === 'Пополнение счета') transaction.description = 'Account top-up';
        if (transaction.description === 'Вывод средств на карту') transaction.description = 'Withdrawal to card';
        if (transaction.description === 'Оплата за уроки') transaction.description = 'Payment for lessons';
        return transaction;
      });
      
      updatedData.upcomingLessons = updatedData.upcomingLessons.map(lesson => {
        if (lesson.title === 'Введение в React') lesson.title = 'Introduction to React';
        if (lesson.teacher === 'Иван Петров') lesson.teacher = 'Ivan Petrov';
        if (lesson.location === 'Онлайн') lesson.location = 'Online';
        lesson.status = lesson.status || 'pending';
        if (lesson.status === 'ожидается') lesson.status = 'pending';
        if (lesson.title === 'Продвинутый JavaScript') lesson.title = 'Advanced JavaScript';
        if (lesson.teacher === 'Мария Иванова') lesson.teacher = 'Maria Ivanova';
        if (lesson.title === 'Основы Tailwind CSS') lesson.title = 'Basics of Tailwind CSS';
        if (lesson.teacher === 'Петр Смирнов') lesson.teacher = 'Petr Smirnov';
        if (lesson.status === 'онлайн') lesson.status = 'online';
        return lesson;
      });

      updatedData.pastLessons = updatedData.pastLessons.map(lesson => {
        if (lesson.title === 'Основы TypeScript') lesson.title = 'Basics of TypeScript';
        if (lesson.teacher === 'Анна Сидорова') lesson.teacher = 'Anna Sidorova';
        if (lesson.location === 'Онлайн') lesson.location = 'Online';
        lesson.status = lesson.status || 'completed';
        if (lesson.status === 'завершено') lesson.status = 'completed';
        if (lesson.title === 'Node.js для начинающих') lesson.title = 'Node.js for Beginners';
        if (lesson.teacher === 'Дмитрий Смирнов') lesson.teacher = 'Dmitry Smirnov';
        if (lesson.title === 'Введение в Figma') lesson.title = 'Introduction to Figma';
        if (lesson.teacher === 'Елена Козлова') lesson.teacher = 'Elena Kozlova';
        if (lesson.status === 'в записи') lesson.status = 'recorded';
        if (lesson.title === 'Основы UI/UX Дизайна') lesson.title = 'UI/UX Design Basics';
        if (lesson.teacher === 'Ирина Новикова') lesson.teacher = 'Irina Novikova';
        if (lesson.status === 'отмена') lesson.status = 'cancelled';
        return lesson;
      });

      updatedData.reviews = updatedData.reviews.map(review => {
        if (review.student.name === 'Анна Сидорова') review.student.name = 'Anna Sidorova';
        if (review.comment === 'Отличный преподаватель! Объясняет сложные вещи простым языком. Рекомендую!') review.comment = 'Great teacher! Explains complex things in simple terms. Highly recommend!';
        if (review.student.name === 'Дмитрий Смирнов') review.student.name = 'Dmitry Smirnov';
        if (review.comment === 'Хорошие уроки, много практики. Спасибо за помощь в освоении Node.js!') review.comment = 'Good lessons, lots of practice. Thanks for helping me learn Node.js!';
        return review;
      });

      updatedData.cryptoWallets = updatedData.cryptoWallets.map(wallet => {
        if (wallet.name === 'Мой Bitcoin кошелек') wallet.name = 'My Bitcoin Wallet';
        if (wallet.name === 'Мой Ethereum кошелек') wallet.name = 'My Ethereum Wallet';
        return wallet;
      });
      
      updatedData.conversations = updatedData.conversations.map(conv => {
        if (conv.user.name === 'Иван Петров') conv.user.name = 'Ivan Petrov';
        if (conv.lastMessage === 'Спасибо за урок! Очень полезно.') conv.lastMessage = 'Thank you for the lesson! Very useful.';
        conv.messages = conv.messages.map(msg => {
          if (msg.text === 'Здравствуйте! Я хотел бы записаться на урок по React.') msg.text = 'Hello! I would like to sign up for a React lesson.';
          if (msg.text === 'Здравствуйте! Конечно, я могу помочь вам с React. Когда вам удобно?') msg.text = 'Hello! Of course, I can help you with React. When is it convenient for you?';
          if (msg.text === 'Может быть завтра в 15:00?') msg.text = 'Maybe tomorrow at 3 PM?';
          if (msg.text === 'Да, завтра в 15:00 подходит. Я отправлю вам ссылку на конференцию.') msg.text = 'Yes, tomorrow at 3 PM works. I will send you the conference link.';
          if (msg.text === 'Спасибо за урок! Очень полезно.') msg.text = 'Thanks for the lesson! Very useful.';
          return msg;
        });
        if (conv.user.name === 'Мария Иванова') conv.user.name = 'Maria Ivanova';
        if (conv.lastMessage === 'До встречи на следующем уроке!') conv.lastMessage = 'See you in the next lesson!';
        if (conv.messages[0] && conv.messages[0].text === 'Здравствуйте! Я хотела бы обсудить домашнее задание.') conv.messages[0].text = 'Hello! I would like to discuss the homework.';
        return conv;
      });

      return updatedData;
    });
  }, []);

  const handleSaveProfile = (updatedData) => {
    setUserData(prevData => {
      const newData = { ...prevData, ...updatedData };
      localStorage.setItem('userProfile', JSON.stringify(newData));
      return newData;
    });
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleEditToggle = () => setIsEditing(prev => !prev);

  const handleOpenDepositModal = () => setShowDepositModal(true);
  const handleCloseDepositModal = () => setShowDepositModal(false);

  const handleOpenWithdrawModal = () => setShowWithdrawModal(true);
  const handleCloseWithdrawModal = () => setShowWithdrawModal(false);

  const handleDepositSuccess = (amount) => {
    setUserData(prevData => {
      const newBalance = prevData.balance + amount;
      const newTransactions = [
        { id: `t${Date.now()}`, type: 'deposit', amount, description: 'Account top-up', date: new Date().toISOString() },
        ...prevData.transactions
      ];
      const newData = { ...prevData, balance: newBalance, transactions: newTransactions };
      localStorage.setItem('userProfile', JSON.stringify(newData));
      return newData;
    });
    toast({
      title: "Deposit Successful",
      description: `Successfully deposited ${amount} ₽.`,
      duration: 3000,
    });
    handleCloseDepositModal();
  };

  const handleWithdrawSuccess = (amount) => {
    setUserData(prevData => {
      const newBalance = prevData.balance - amount;
      const newTransactions = [
        { id: `t${Date.now()}`, type: 'withdrawal', amount, description: 'Withdrawal Pending', date: new Date().toISOString(), status: 'pending' },
        ...prevData.transactions
      ];
      const newData = { ...prevData, balance: newBalance, transactions: newTransactions };
      localStorage.setItem('userProfile', JSON.stringify(newData));
      return newData;
    });
    toast({
      title: "Withdrawal Initiated",
      description: `Withdrawal of ${amount} ₽ initiated. Status: pending.`,
      duration: 3000,
    });
    handleCloseWithdrawModal();
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prevData => ({
          ...prevData,
          profilePicture: reader.result
        }));
        localStorage.setItem('userProfile', JSON.stringify({ ...userData, profilePicture: reader.result }));
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been successfully updated.",
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
            id: `m${Date.now()}`,
            text,
            time: new Date().toISOString(),
            isOwn: true
          };
          return { ...conv, messages: [...conv.messages, newMessage], lastMessage: text, lastMessageTime: newMessage.time };
        }
        return conv;
      });
      const newData = { ...prevData, conversations: updatedConversations };
      localStorage.setItem('userProfile', JSON.stringify(newData));
      return newData;
    });
  };

  const handleLeaveReview = (lessonId, rating, comment) => {
    setUserData(prevData => {
      const updatedLessons = prevData.pastLessons.map(lesson => 
        lesson.id === lessonId ? { ...lesson, feedbackLeft: true } : lesson
      );
      const newReview = {
        id: `r${Date.now()}`,
        student: { name: 'Current User', avatar: userData.profilePicture }, // Replace with actual current user data
        rating,
        comment,
        date: new Date().toISOString()
      };
      const newData = { 
        ...prevData, 
        pastLessons: updatedLessons, 
        reviews: [...prevData.reviews, newReview], 
        averageRating: parseFloat(((prevData.averageRating * prevData.reviews.length + rating) / (prevData.reviews.length + 1)).toFixed(1))
      };
      localStorage.setItem('userProfile', JSON.stringify(newData));
      return newData;
    });
    toast({
      title: "Review Submitted",
      description: "Your review has been successfully submitted.",
      duration: 3000,
    });
  };

  // Новый обработчик для сохранения availability
  const handleSaveAvailability = (newAvailability) => {
    setAvailability(newAvailability);
    setUserData(prev => {
      const updated = { ...prev, availability: newAvailability };
      localStorage.setItem('userProfile', JSON.stringify(updated));
      return updated;
    });
    toast({
      title: "Availability updated",
      description: "Your availability has been successfully saved.",
    });
  };

  return (
    <div className="container mx-auto px-4 pt-16 pb-8 max-w-7xl">
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
                <div className="flex items-center gap-4">
                  <User className="h-5 w-5 text-muted-foreground" />
                  Profile
                </div>
              </Button>
              <Button
                variant={activeTab === 'balance' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('balance')}
              >
                <div className="flex items-center gap-4">
                  <Wallet className="h-5 w-5 text-muted-foreground" />
                  Balance
                </div>
              </Button>
              <Button
                variant={activeTab === 'lessons' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('lessons')}
              >
                <div className="flex items-center gap-4">
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  Lessons
                </div>
              </Button>
              <Button
  variant={activeTab === 'reviews' ? 'default' : 'ghost'}
  className="w-full justify-start"
  onClick={() => setActiveTab('reviews')}
>
  <div className="flex items-center gap-4">
    <Star className="h-5 w-5 text-muted-foreground" />
    Reviews
  </div>
</Button>

<Button
  variant={activeTab === 'favorites' ? 'default' : 'ghost'}
  className="w-full justify-start"
  onClick={() => setActiveTab('favorites')}
>
  <div className="flex items-center gap-4">
    <Star className="h-5 w-5 text-purple-500" />
    Favorites
  </div>
</Button>

<Button
  variant={activeTab === 'payments' ? 'default' : 'ghost'}
  className="w-full justify-start"
  onClick={() => setActiveTab('payments')}
>
  <div className="flex items-center gap-4">
    <CreditCard className="h-5 w-5 text-muted-foreground" />
    Payments
  </div>
</Button>

<Button
  variant={activeTab === 'availability' ? 'default' : 'ghost'}
  className="w-full justify-start"
  onClick={() => setActiveTab('availability')}
>
  <div className="flex items-center gap-4">
    <Clock className="h-5 w-5 text-muted-foreground" />
    Availability
  </div>
</Button>

              <Button
                variant={activeTab === 'chat' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('chat')}
              >
                <div className="flex items-center gap-4">
                  <MessageSquare className="h-5 w-5 text-muted-foreground" />
                  Chat
                </div>
              </Button>
              <Button
                variant={activeTab === 'settings' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveTab('settings')}
              >
                <div className="flex items-center gap-4">
                  <SettingsIcon className="h-5 w-5 text-muted-foreground" />
                  Settings
                </div>
              </Button>
            </div>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="profile">
              <div className="mt-12">
                <ProfileForm 
                  userData={userData} 
                  onSave={handleSaveProfile} 
                  isEditing={isEditing} 
                  onEditToggle={handleEditToggle}
                  categories={categories}
                />
              </div>
            </TabsContent>
            <TabsContent value="balance">
              <div className="mt-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-4">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(userData.balance)} available
                    </div>
                    <div className="flex gap-4 mb-8">
                      <Button onClick={handleOpenDepositModal} className="flex-1">
                        <PlusCircle className="mr-2 h-4 w-4" /> Top Up
                      </Button>
                      <Button onClick={handleOpenWithdrawModal} className="flex-1" variant="outline">
                        <MinusCircle className="mr-2 h-4 w-4" /> Withdraw
                      </Button>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">Transaction History</h3>
                    <div className="space-y-4">
                      {userData.transactions.length > 0 ? (
                        userData.transactions.map(transaction => (
                          <div key={transaction.id} className="flex items-center justify-between bg-muted p-4 rounded-md">
                            <div className="flex items-center gap-3">
                              {transaction.type === 'deposit' ? (
                                <ArrowUpCircle className="h-6 w-6 text-green-500" />
                              ) : (
                                <ArrowDownCircle className="h-6 w-6 text-red-500" />
                              )}
                              <div>
                                <p className="font-medium">{transaction.description}</p>
                                <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className={`font-bold ${transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`}>
                              {transaction.type === 'deposit' ? '+' : '-'}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.amount)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">No transactions yet.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="lessons">
              <div className="mt-12">
                <Lessons 
                  upcomingLessons={userData.upcomingLessons} 
                  pastLessons={userData.pastLessons} 
                  onLeaveReview={handleLeaveReview} 
                />
              </div>
            </TabsContent>
            <TabsContent value="reviews">
              <div className="mt-12">
                <Reviews reviews={userData.reviews} averageRating={userData.averageRating} />
              </div>
            </TabsContent>
            <TabsContent value="favorites">
              <div className="mt-12">
                <FavoritesTab />
              </div>
            </TabsContent>

            <TabsContent value="payments">
              <div className="mt-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Placeholder for payment methods content */}
                    <p className="text-muted-foreground">No payment methods added.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="chat">
              <div className="mt-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userData.conversations && userData.conversations.length > 0 ? (
                      <div className="flex h-[600px] max-h-[600px]">
                        <div className="flex flex-col w-1/3 border-r pr-4 space-y-2 overflow-y-auto">
                          {userData.conversations.map(conv => (
                            <div
                              key={conv.id}
                              className={`flex items-center gap-3 p-3 rounded-md cursor-pointer ${
                                selectedConversationId === conv.id ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
                              }`}
                              onClick={() => setSelectedConversationId(conv.id)}
                            >
                              <Avatar>
                                <AvatarImage src={conv.user.avatar} />
                                <AvatarFallback>{conv.user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{conv.user.name}</p>
                                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col w-2/3 pl-4">
                          {selectedConversationId ? (
                            <ChatWindow 
                              conversation={userData.conversations.find(c => c.id === selectedConversationId)}
                              onSendMessage={handleSendMessage}
                            />
                          ) : (
                            <div className="flex-1 flex items-center justify-center text-muted-foreground">
                              Select a chat to start messaging
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-muted-foreground">
                        No conversations yet.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="settings">
              <div className="mt-12">
                {/* Settings content (previously Settings component) */}
              </div>
            </TabsContent>
            <TabsContent value="availability">
              <div className="mt-12">
                <AvailabilityBlock
                  availability={userData.availability || []}
                  onSave={handleSaveAvailability}
                />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <DepositModal
        isOpen={showDepositModal}
        setIsOpen={setShowDepositModal}
        onDepositSuccess={handleDepositSuccess}
        walletConnected={userData.cryptoWallets.length > 0}
      />

      <WithdrawModal
        isOpen={showWithdrawModal}
        setIsOpen={setShowWithdrawModal}
        onWithdrawSuccess={handleWithdrawSuccess}
        balance={userData.balance}
        bankCardConnected={userData.paymentMethods.length > 0}
        walletConnected={userData.cryptoWallets.length > 0}
      />
    </div>
  );
};

export default ProfilePage;