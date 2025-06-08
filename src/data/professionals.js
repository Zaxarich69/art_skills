export const mockProfessionalsData = [
  {
    id: 1,
    name: 'Dr. Emily Johnson',
    title: 'Mathematics Professor',
    category: 'Education',
    rating: 4.9,
    reviews: 128,
    location: 'New York, NY',
    hourlyRate: 75,
    acceptsCrypto: true,
    about: 'PhD in Mathematics with 10+ years of teaching experience at university level. Specializes in calculus and linear algebra. I believe in making complex mathematical concepts accessible to all students through clear explanations and practical examples.',
    image: null,
    tags: ['Mathematics', 'Calculus', 'University Level'],
    experience: [
      {
        title: 'Professor of Mathematics',
        company: 'New York University',
        period: '2015 - Present',
        description: 'Teaching advanced calculus and linear algebra to undergraduate and graduate students.'
      },
      {
        title: 'Assistant Professor',
        company: 'Columbia University',
        period: '2010 - 2015',
        description: 'Taught various mathematics courses and conducted research in applied mathematics.'
      }
    ],
    education: [
      {
        degree: 'PhD in Mathematics',
        institution: 'MIT',
        year: '2010'
      },
      {
        degree: 'Master of Science in Mathematics',
        institution: 'Stanford University',
        year: '2006'
      }
    ],
    certifications: [
      'Advanced Mathematical Modeling Certification',
      'Excellence in Teaching Award'
    ],
    socialLinks: {
      website: 'https://emilyjohnson.edu',
      linkedin: 'https://linkedin.com/in/emilyjohnson',
      twitter: 'https://twitter.com/emilyjohnson'
    },
    contactInfo: {
      email: 'emily.johnson@example.com',
      phone: '+1 (555) 123-4567'
    },
    availability: [
      { day: 'Monday', slots: ['9:00 AM - 12:00 PM', '2:00 PM - 5:00 PM'] },
      { day: 'Wednesday', slots: ['9:00 AM - 12:00 PM', '2:00 PM - 5:00 PM'] },
      { day: 'Friday', slots: ['9:00 AM - 12:00 PM'] }
    ],
    testimonials: [
      {
        name: 'Michael Chen',
        rating: 5,
        comment: 'Dr. Johnson is an exceptional teacher. She explained complex calculus concepts in a way that finally made sense to me.',
        date: '2023-04-15'
      },
      {
        name: 'Sarah Williams',
        rating: 5,
        comment: 'I was struggling with linear algebra until I started working with Dr. Johnson. Her teaching methods are clear and effective.',
        date: '2023-02-22'
      },
      {
        name: 'David Kim',
        rating: 4,
        comment: 'Very knowledgeable and patient. Helped me prepare for my calculus exam and I got an A!',
        date: '2022-12-10'
      }
    ]
  },
  {
    id: 2,
    name: 'Marcus Chen',
    title: 'Woodworking Craftsman',
    category: 'Crafts',
    rating: 4.8,
    reviews: 93,
    location: 'Portland, OR',
    hourlyRate: 65,
    acceptsCrypto: true,
    about: 'Master craftsman with 15 years of experience. Specializes in custom furniture and woodworking projects. I take pride in creating beautiful, functional pieces that will last for generations. My approach combines traditional techniques with modern design sensibilities.',
    image: null,
    tags: ['Woodworking', 'Furniture', 'Custom Projects'],
    experience: [
      {
        title: 'Master Craftsman',
        company: 'Chen Woodworks',
        period: '2012 - Present',
        description: 'Running my own woodworking studio, creating custom furniture and teaching woodworking skills.'
      },
      {
        title: 'Furniture Maker',
        company: 'Portland Fine Furniture',
        period: '2008 - 2012',
        description: 'Designed and built custom furniture pieces for high-end clients.'
      }
    ],
    education: [
      {
        degree: 'Master Craftsman Certification',
        institution: 'Guild of Oregon Woodworkers',
        year: '2010'
      },
      {
        degree: 'Bachelor of Fine Arts, Furniture Design',
        institution: 'Rhode Island School of Design',
        year: '2007'
      }
    ],
    certifications: [
      'Advanced Joinery Techniques Certification',
      'Sustainable Woodworking Practices'
    ],
    socialLinks: {
      website: 'https://chenwoodworks.com',
      instagram: 'https://instagram.com/chenwoodworks'
    },
    contactInfo: {
      email: 'marcus@chenwoodworks.com',
      phone: '+1 (555) 987-6543'
    },
    availability: [
      { day: 'Tuesday', slots: ['10:00 AM - 4:00 PM'] },
      { day: 'Thursday', slots: ['10:00 AM - 4:00 PM'] },
      { day: 'Saturday', slots: ['9:00 AM - 2:00 PM'] }
    ],
    testimonials: [
      {
        name: 'Jennifer Lopez',
        rating: 5,
        comment: 'Marcus created a beautiful dining table for our family. His craftsmanship is exceptional and the piece is exactly what we wanted.',
        date: '2023-05-20'
      },
      {
        name: 'Robert Johnson',
        rating: 5,
        comment: "I took a woodworking class with Marcus and learned so much. He's patient, knowledgeable, and very skilled.",
        date: '2023-03-15'
      },
      {
        name: 'Lisa Wong',
        rating: 4,
        comment: 'Marcus built custom shelving for my home office. The quality is outstanding and his attention to detail is impressive.',
        date: '2022-11-30'
      }
    ]
  },
  {
    id: 3,
    name: 'Sofia Rodriguez',
    title: 'Spanish Language Tutor',
    category: 'Education',
    rating: 4.7,
    reviews: 156,
    location: 'Miami, FL',
    hourlyRate: 45,
    acceptsCrypto: false,
    about: 'Native Spanish speaker with 8 years of teaching experience. Specializes in conversational Spanish and business Spanish.',
    image: null,
    tags: ['Spanish', 'Language', 'Conversation'],
     experience: [],
    education: [],
    certifications: [],
    socialLinks: {},
    contactInfo: {
      email: 'sofia.rodriguez@example.com',
      phone: '+1 (555) 234-5678'
    },
    availability: [],
    testimonials: []
  },
  {
    id: 4,
    name: 'James Wilson',
    title: 'Web Development Instructor',
    category: 'Technology',
    rating: 4.9,
    reviews: 201,
    location: 'San Francisco, CA',
    hourlyRate: 90,
    acceptsCrypto: true,
    about: 'Full-stack developer with 12 years of industry experience. Teaches React, Node.js, and modern web development practices.',
    image: null,
    tags: ['Web Development', 'React', 'JavaScript'],
     experience: [],
    education: [],
    certifications: [],
    socialLinks: {},
    contactInfo: {
      email: 'james.wilson@example.com',
      phone: '+1 (555) 345-6789'
    },
    availability: [],
    testimonials: []
  },
  {
    id: 5,
    name: 'Aisha Patel',
    title: 'Yoga Instructor',
    category: 'Fitness',
    rating: 4.8,
    reviews: 175,
    location: 'Austin, TX',
    hourlyRate: 55,
    acceptsCrypto: false,
    about: 'Certified yoga instructor with 7 years of experience. Specializes in Hatha and Vinyasa yoga for all levels.',
    image: null,
    tags: ['Yoga', 'Fitness', 'Wellness'],
     experience: [],
    education: [],
    certifications: [],
    socialLinks: {},
    contactInfo: {
      email: 'aisha.patel@example.com',
      phone: '+1 (555) 456-7890'
    },
    availability: [],
    testimonials: []
  },
  {
    id: 6,
    name: 'David Kim',
    title: 'Piano Teacher',
    category: 'Music',
    rating: 4.9,
    reviews: 112,
    location: 'Chicago, IL',
    hourlyRate: 60,
    acceptsCrypto: true,
    about: "Classical pianist with a Master's degree in Music. 10+ years teaching experience for all ages and skill levels.",
    image: null,
    tags: ['Piano', 'Classical Music', 'Music Theory'],
    experience: [],
    education: [],
    certifications: [],
    socialLinks: {},
    contactInfo: {
      email: 'david.kim@example.com',
      phone: '+1 (555) 567-8901'
    },
    availability: [],
    testimonials: []
  },
];
