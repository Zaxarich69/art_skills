// Mock user profile data in English
const mockUserProfile = {
  name: 'Alexey Morozov',
  email: 'alex.morozov@example.com',
  phone: '+7 (999) 123-45-67',
  location: 'Moscow',
  bio: 'Experienced teacher with 5 years of experience. Specializing in web development and happy to share my knowledge with students.',
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
    { id: 'exp1', title: 'Senior Web Developer', company: 'Future Technologies', period: '2020 - Present', description: 'Leading frontend development for enterprise applications.' },
    { id: 'exp2', title: 'Web Developer', company: 'Digital Solutions', period: '2018 - 2020', description: 'Developing responsive web applications using React and Node.js.' }
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
      description: 'Account Top-up',
      date: '2024-03-15T10:30:00'
    },
    {
      id: 't2',
      type: 'withdrawal',
      amount: 3000,
      description: 'Withdrawal to Card',
      date: '2024-03-10T15:45:00'
    },
    {
      id: 't3',
      type: 'deposit',
      amount: 8000,
      description: 'Payment for Lessons',
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
      status: 'Pending',
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
      status: 'Pending',
      jitsiLink: 'https://meet.jit.si/ProdvinutiyJavaScript-MariaIvanova',
      hasRecording: false,
      recordUrl: null,
      feedbackLeft: false,
      hasChat: false,
    },
    {
      id: 'l5',
      title: 'Tailwind CSS Basics',
      teacher: 'Petr Smirnov',
      date: new Date(new Date().getTime() - 30 * 60 * 1000).toISOString(),
      location: 'Online',
      status: 'Ongoing',
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
      title: 'TypeScript Basics',
      teacher: 'Anna Sidorova',
      date: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Online',
      status: 'Completed',
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
      status: 'Completed',
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
      status: 'Recorded',
      jitsiLink: null,
      hasRecording: true,
      recordUrl: 'https://example.com/recordings/figma_elena.mp4',
      feedbackLeft: false,
      hasChat: false,
    },
    {
      id: 'l7',
      title: 'UI/UX Design Basics',
      teacher: 'Irina Novikova',
      date: new Date(new Date().getTime() - 28 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Online',
      status: 'Canceled',
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
      comment: 'Excellent teacher! Explains complex things in simple language. Highly recommended!',
      date: '2024-03-15T16:30:00'
    },
    {
      id: 'r2',
      student: { name: 'Dmitry Smirnov', avatar: null },
      rating: 4,
      comment: 'Good lessons, lots of practice. Thanks for helping me master Node.js!',
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
      lastMessage: 'Thanks for the lesson! Very useful.',
      lastMessageTime: '2024-03-19T15:30:00',
      messages: [
        {
          id: 'm1',
          text: 'Hello! I would like to sign up for a React lesson.',
          time: '2024-03-19T14:00:00',
          isOwn: false
        },
        {
          id: 'm2',
          text: 'Hello! Of course, I can help you with React. When is it convenient for you?',
          time: '2024-03-19T14:05:00',
          isOwn: true
        },
        {
          id: 'm3',
          text: 'Maybe tomorrow at 3 PM?',
          time: '2024-03-19T14:10:00',
          isOwn: false
        },
        {
          id: 'm4',
          text: 'Yes, tomorrow at 3 PM works. I will send you the conference link.',
          time: '2024-03-19T14:15:00',
          isOwn: true
        },
        {
          id: 'm5',
          text: 'Thanks for the lesson! Very useful.',
          time: '2024-03-19T15:30:00',
          isOwn: false
        }
      ]
    },
    {
      id: 'c2',
      user: {
        name: 'Maria Ivanova',
        avatar: null,
        online: false
      },
      lastMessage: 'See you in the next lesson!',
      lastMessageTime: '2024-03-18T16:45:00',
      messages: [
        {
          id: 'm6',
          text: 'Hello! I would like to discuss the homework.',
          time: '2024-03-18T16:00:00',
          isOwn: false
        },
        {
          id: 'm7',
          text: 'Hello! Of course, what exactly are you interested in?',
          time: '2024-03-18T16:05:00',
          isOwn: true
        },
        {
          id: 'm8',
          text: 'I had difficulties with async functions.',
          time: '2024-03-18T16:10:00',
          isOwn: false
        },
        {
          id: 'm9',
          text: 'Let\'s go over this in the next lesson. I will prepare additional materials.',
          time: '2024-03-18T16:15:00',
          isOwn: true
        },
        {
          id: 'm10',
          text: 'See you in the next lesson!',
          time: '2024-03-18T16:45:00',
          isOwn: false
        }
      ]
    }
  ],
  category: 'web_developer',
};

export default mockUserProfile; 