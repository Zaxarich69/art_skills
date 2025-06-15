import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Tooltip from '@/components/ui/tooltip';

import { 
  Search, Users, BookOpen, Briefcase, 
  Palette, Code, Music, Camera, 
  CreditCard, Bitcoin, ArrowRight
} from 'lucide-react';

const HomePage = () => {
  const categories = [
    { 
      name: 'Education', 
      icon: <BookOpen className="h-6 w-6" />, 
      color: 'from-blue-500 to-indigo-600',
      subcategories: ['Language Tutor', 'Mathematics Professor', 'Other Education']
    },
    { 
      name: 'Business', 
      icon: <Briefcase className="h-6 w-6" />, 
      color: 'from-green-500 to-emerald-600',
      subcategories: ['Web Developer', 'UI/UX Designer', 'Business Consultant', 'Marketing Specialist']
    },
    { 
      name: 'Arts', 
      icon: <Palette className="h-6 w-6" />, 
      color: 'from-yellow-500 to-amber-600',
      subcategories: ['Art Tutor', 'Crafts Master', 'Chef']
    },
    { 
      name: 'Technology', 
      icon: <Code className="h-6 w-6" />, 
      color: 'from-purple-500 to-violet-600',
      subcategories: ['Web Developer', 'UI/UX Designer', 'Software Engineer']
    },
    { 
      name: 'Music', 
      icon: <Music className="h-6 w-6" />, 
      color: 'from-red-500 to-rose-600',
      subcategories: ['Musician', 'Music Tutor']
    },
    { 
      name: 'Photography', 
      icon: <Camera className="h-6 w-6" />, 
      color: 'from-pink-500 to-fuchsia-600',
      subcategories: ['Photographer', 'Videographer']
    },
  ];

  const features = [
    {
      title: 'Find Skilled Professionals',
      description: 'Connect with teachers, tutors, craftsmen, and experts in various fields.',
      icon: <Search className="h-10 w-10" />,
    },
    {
      title: 'Build Your Network',
      description: 'Share contacts, social networks, and build meaningful professional relationships.',
      icon: <Users className="h-10 w-10" />,
    },
    {
      title: 'Flexible Payments',
      description: 'Pay with traditional methods like credit cards or use cryptocurrency.',
      icon: <CreditCard className="h-10 w-10" />,
    },
    {
      title: 'Crypto Payments',
      description: 'Support for Bitcoin, Ethereum, and other popular cryptocurrencies.',
      icon: <Bitcoin className="h-10 w-10" />,
    },
  ];

  const testimonials = [
    {
      quote: "SkillConnect helped me find the perfect tutor for my daughter. The platform is intuitive and the payment options are flexible.",
      author: "Sarah Johnson",
      role: "Parent",
      image: null,
    },
    {
      quote: "As a craftsman, I've been able to expand my client base significantly through SkillConnect. The crypto payment option is a game-changer!",
      author: "Michael Chen",
      role: "Woodworker",
      image: null,
    },
    {
      quote: "I love how easy it is to connect with students on this platform. The interface is clean and the messaging system works flawlessly.",
      author: "Elena Rodriguez",
      role: "Language Teacher",
      image: null,
    },
  ];

  return (
    <div className="flex flex-col h-full pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-4">
                Connect with Skilled Professionals
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Find <span className="text-primary">Experts</span> & Build Your <span className="text-primary">Network</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                Connect with teachers, tutors, craftsmen, and experts in various fields. 
                Share contacts and build your professional network with Art Skills.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/explore">
                    Explore Professionals
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                {/* Кнопка "Learn More" удалена */}
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                <img  alt="Diverse group of professionals networking" className="w-full h-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1700995577988-81c9550aa64b" />
                
                
                <motion.div 
                  className="absolute bottom-6 left-6 glass-card p-4 rounded-lg max-w-[280px]"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Active Professionals</p>
                      <p className="text-sm text-muted-foreground">10,000+ experts</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute top-6 right-6 glass-card p-4 rounded-lg"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Bitcoin className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="font-medium">Crypto Payments</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find professionals across various categories to help you learn, grow, and accomplish your goals.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                variants={{
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Tooltip content={category.name}>
                  <Link to={`/explore?category=${encodeURIComponent(category.name)}`} className="block">
                    <Card className="h-full overflow-hidden border-none bg-gradient-to-br hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                          {category.icon}
                        </div>
                        <h3 className="font-medium">{category.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                </Tooltip>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SkillConnect</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers unique features designed to make finding and connecting with professionals seamless.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                variants={{
                  visible: { opacity: 1, y: 0 },
                }}
                className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
              >
                <div className="mb-4 text-primary">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from people who have found success using SkillConnect.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                variants={{
                  visible: { opacity: 1, y: 0 },
                }}
                className="glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
              >
                <div className="mb-4 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                <p className="mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                    {testimonial.image ? (
                      <img src={testimonial.image} alt={testimonial.author} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-xl font-bold">{testimonial.author.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Connect with Skilled Professionals?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join SkillConnect today and start building your professional network.
            </p>
            <Button size="lg" asChild>
              <Link to="/explore">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
