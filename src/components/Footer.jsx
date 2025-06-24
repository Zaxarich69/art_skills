import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Twitter, Instagram, Mail
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Facebook, LinkedIn и телефон удалены, добавлен Mail
  const socialLinks = [
    { icon: <Twitter size={18} />, href: 'https://twitter.com/artskillsapp', label: 'Twitter' },
    { icon: <Instagram size={18} />, href: 'https://instagram.com/artskillsapp', label: 'Instagram' },
    { icon: <Mail size={18} />, href: 'mailto:contact@artskills.com', label: 'Email' },
  ];

  // Blog, Press, Safety Center, Community Guidelines — удалены
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about', tooltip: 'Learn more about our mission, vision, and the team behind Art Skills.' },
        { name: 'Careers', href: '/careers', tooltip: 'Explore career opportunities and become part of our growing team.' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help', tooltip: 'Find answers to frequently asked questions and get support.' },
        { name: 'Contact Us', href: 'mailto:contact@artskills.com', tooltip: 'Reach out to our team for assistance and inquiries.' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', href: '/terms', tooltip: 'Read our user agreement and terms of use.' },
        { name: 'Privacy Policy', href: '/privacy', tooltip: 'Learn how we protect and use your data.' },
        { name: 'Cookie Policy', href: '/cookies', tooltip: 'Understand how we use cookies and tracking technologies.' },
      ],
    },
  ];

  return (
    <footer className="bg-background/50 backdrop-blur-sm border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-2">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-primary">Art Skills</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Connect with skilled professionals, teachers, tutors, and craftsmen. 
              Share contacts and build your network with Art Skills.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  target={social.label === 'Email' ? undefined : "_blank"}
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <p className="font-medium mb-4">{section.title}</p>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith('/') ? (
                      <Link 
                        to={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                        title={link.tooltip}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a 
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                        title={link.tooltip}
                        target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 mb-6 p-4 bg-secondary/30 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-lg font-semibold mb-2">Support the Platform</h2>
          <p className="mb-2">Art Skills thrives thanks to the support of our community. If you would like to help us grow, you can contribute by making a donation or becoming a sponsor.</p>
          <p className="mb-2">Crypto donations and Stripe payments will be available soon.</p>
          <p className="font-medium">For partnership or sponsorship, contact: <a href="mailto:sponsor@artskills.com" className="text-primary underline">sponsor@artskills.com</a></p>
        </div>

        {/* Внизу футера ничего нет, кроме копирайта */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Art Skills. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
