import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Star, MapPin, Clock, MessageSquare, 
  Heart, Share2, Globe,
  Award, BookOpen, Briefcase, CreditCard, Bitcoin,
  AlertCircle, Phone, Mail, Linkedin, Twitter, Instagram, Facebook
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { mockProfessionalsData } from '@/data/professionals';
import BookingModal from '@/components/BookingModal';
import ReviewModal from '@/components/reviews/ReviewModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useReviewsStore } from '@/data/reviewsStore';

const defaultProfessional = {
  id: null,
  name: '',
  title: '',
  category: '',
  rating: 0,
  reviews: 0,
  location: '',
  hourlyRate: 0,
  acceptsCrypto: false,
  about: '',
  image: null,
  tags: [],
  experience: [],
  education: [],
  certifications: [],
  socialLinks: {
    website: '',
    linkedin: '',
    twitter: '',
    instagram: '',
    facebook: ''
  },
  contactInfo: {
    email: '',
    phone: ''
  },
  availability: [],
  testimonials: []
};

const ProfileHeader = ({ professional, onFavorite, onShare, isFavorited }) => (
  <div className="relative rounded-xl overflow-hidden mb-6">
    <div className="h-48 md:h-64 bg-gradient-to-r from-primary/30 to-secondary/30">
      <img alt={`${String(professional.name || '')} cover image`} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1607615896122-6c919f897e55" />
    </div>
    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background to-transparent">
      <div className="flex items-end gap-4">
        <div className="relative">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={String(professional.image || '')} alt={String(professional.name || '')} />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
              {(String(professional.name || '')).charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1">
            <Badge variant={(professional.acceptsCrypto === true || professional.acceptsCrypto === false) ? (professional.acceptsCrypto ? "default" : "secondary") : "secondary"} className="h-6 flex items-center">
              {(professional.acceptsCrypto === true || professional.acceptsCrypto === false) ? (
                professional.acceptsCrypto ? (<Bitcoin className="h-3 w-3 mr-1" />) : (<CreditCard className="h-3 w-3 mr-1" />)
              ) : (<CreditCard className="h-3 w-3 mr-1" />)}
              {(professional.acceptsCrypto === true || professional.acceptsCrypto === false) ? (professional.acceptsCrypto ? "Accepts Crypto" : "Card Only") : "Card Only"}
            </Badge>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold">{String(professional.name || '')}</h1>
          <p className="text-muted-foreground">{String(professional.title || '')}</p>
          <div className="flex items-center mt-1">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="font-medium mr-1">{Number(professional.rating || 0)}</span>
            <span className="text-muted-foreground text-sm">({Number(professional.reviews || 0)} reviews)</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onFavorite}
            className="h-9 w-9 rounded-full"
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'text-red-500 fill-current' : ''}`} />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onShare}
            className="h-9 w-9 rounded-full"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const ProfileDetails = ({ professional }) => (
  <>
    <div className="flex items-center mb-6 text-sm">
      <div className="flex items-center mr-4">
        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
        <span>{professional.location || ''}</span>
      </div>
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
        <span>${professional.hourlyRate || 0}/hour</span>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mb-6">
      {(professional.tags || []).map((tag, i) => (
        <Badge key={i} variant="secondary">
          {tag || ''}
        </Badge>
      ))}
    </div>
  </>
);

const AboutSection = ({ professional }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-semibold mb-3">About {professional.name}</h3>
      <p className="text-muted-foreground whitespace-pre-line">
        {professional.about || ''}
      </p>
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-3">Education</h3>
      <div className="space-y-4">
        {(professional.education || []).map((edu, i) => (
          <div key={i} className="flex">
            <div className="mr-4 mt-1">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">{edu.degree || ''}</h4>
              <p className="text-muted-foreground">{edu.institution || ''}, {edu.year || ''}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-3">Certifications</h3>
      <div className="space-y-2">
        {(professional.certifications || []).map((cert, i) => (
          <div key={i} className="flex items-start">
            <Award className="h-5 w-5 text-primary mr-2 mt-0.5" />
            <span>{typeof cert === 'object' && cert.name ? cert.name : (cert || '')}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ExperienceSection = ({ experience }) => (
  <div>
    <h3 className="text-xl font-semibold mb-4">Work Experience</h3>
    <div className="space-y-6">
      {(experience || []).map((exp, i) => (
        <div key={i} className="relative pl-6 pb-6 border-l border-border">
          <div className="absolute top-0 left-0 w-3 h-3 -translate-x-1.5 rounded-full bg-primary"></div>
          <div className="mb-1">
            <h4 className="text-lg font-medium">{exp.title || ''}</h4>
            <div className="flex items-center text-muted-foreground">
              <Briefcase className="h-4 w-4 mr-1" />
              <span>{exp.company || ''}</span>
              <span className="mx-2">•</span>
              <span>{exp.period || ''}</span>
            </div>
          </div>
          <p className="text-muted-foreground mt-2">{exp.description || ''}</p>
        </div>
      ))}
    </div>
  </div>
);

const CollapsibleAvailabilitySection = ({ availability, name }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <h3
        className="text-xl font-semibold mb-4 cursor-pointer select-none"
        onClick={() => setOpen(v => !v)}
        title={open ? 'Hide availability' : 'Show availability'}
      >
        Availability
      </h3>
      {open && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {availability && availability.length > 0 ? (
              availability.map((avail, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">{avail.day}</h4>
                    <div className="space-y-2">
                      {avail.slots && avail.slots.length > 0 ? (
                        avail.slots.map((slot, j) => (
                          <div key={j} className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{slot}</span>
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">No availability</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2">
                <span className="text-sm text-muted-foreground">No availability hours set. Please contact the professional to arrange a session.</span>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            These are {name}'s regular availability hours. Contact directly to confirm specific times or request alternative arrangements.
          </p>
        </div>
      )}
    </div>
  );
};

const ReviewsSection = ({ professionalId }) => {
  const { getReviews, getAverageRating, getReviewsCount } = useReviewsStore();
  const [showReviews, setShowReviews] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const REVIEWS_PER_PAGE = 3;
  const reviews = getReviews(professionalId);
  const total = getReviewsCount(professionalId);
  const average = getAverageRating(professionalId);
  const paginated = reviews.slice(0, page * REVIEWS_PER_PAGE);
  const canShowMore = paginated.length < reviews.length;

  return (
    <div>
      <div
        className="flex items-center justify-between mb-6 cursor-pointer select-none"
        onClick={() => setShowReviews((prev) => !prev)}
        title="Show reviews"
      >
        <h3 className="text-xl font-semibold">
          Reviews ({total})
        </h3>
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-500 mr-1" />
          <span className="font-medium text-lg">{average}</span>
        </div>
      </div>
      <AnimatePresence>
        {showReviews && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-6">
              {paginated.length === 0 && (
                <div className="text-muted-foreground">No reviews yet</div>
              )}
              {paginated.map((review, i) => (
                <div key={i} className="border-b border-border pb-6 last:border-0">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{review.name || review.student?.name || ''}</h4>
                    <span className="text-sm text-muted-foreground">
                      {review.date ? new Date(review.date).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star 
                        key={j} 
                        className={`h-4 w-4 ${j < (review.rating || 0) ? 'text-yellow-500' : 'text-muted'}`} 
                        fill={j < (review.rating || 0) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{review.comment || ''}</p>
                </div>
              ))}
              {canShowMore && (
                <button className="text-sm text-blue-600 mt-2" onClick={() => setPage(p => p + 1)}>Show more</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactCard = ({ professional, toast }) => {
  const [message, setMessage] = useState('');
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      toast({
        title: "Message sent",
        description: `Your message to ${professional.name} has been sent successfully.`, 
      });
      setMessage('');
      setIsMessageDialogOpen(false);
    } else {
      toast({
        title: "Error",
        description: "Please enter a message.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="sticky top-24 glass-card">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">Contact & Booking</h3>
        <div className="space-y-4 mb-6">
          <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Write to {professional.name}</DialogTitle>
                <DialogDescription>
                  Start a conversation with {professional.name}.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Textarea
                  placeholder="Your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="resize-none"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSendMessage}>Send</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button onClick={() => setIsBookingModalOpen(true)} className="w-full mb-2">
            Book a Session
          </Button>
        </div>
        <Separator className="my-6" />
        <div className="space-y-4">
          <h4 className="font-medium mb-3">Contact Information</h4>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Show email
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contact Information</DialogTitle>
                <DialogDescription>
                  Here's how you can contact {professional.name}.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-md mb-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-primary" />
                    <span>{professional.contactInfo?.email}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => {
                    navigator.clipboard.writeText(professional.contactInfo?.email);
                    toast({ title: "Email copied", description: "Email address copied to clipboard" });
                  }}>Copy</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-md">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-primary" />
                    <span>{professional.contactInfo?.phone}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => {
                    navigator.clipboard.writeText(professional.contactInfo?.phone);
                    toast({ title: "Phone copied", description: "Phone number copied to clipboard" });
                  }}>Copy</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Phone className="mr-2 h-4 w-4" />
                Show phone number
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contact Information</DialogTitle>
                <DialogDescription>
                  Here's how you can contact {professional.name}.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-md mb-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-primary" />
                    <span>{professional.contactInfo?.email}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => {
                    navigator.clipboard.writeText(professional.contactInfo?.email);
                    toast({ title: "Email copied", description: "Email address copied to clipboard" });
                  }}>Copy</Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-md">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-primary" />
                    <span>{professional.contactInfo?.phone}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => {
                    navigator.clipboard.writeText(professional.contactInfo?.phone);
                    toast({ title: "Phone copied", description: "Phone number copied to clipboard" });
                  }}>Copy</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Separator className="my-6" />
        <div>
          <h4 className="font-medium mb-3">Social Links</h4>
          <div className="flex flex-wrap gap-2">
            {professional.socialLinks?.website && (
              <Button variant="outline" size="icon" asChild>
                <a href={professional.socialLinks.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4" />
                </a>
              </Button>
            )}
            {professional.socialLinks?.linkedin && (
              <Button variant="outline" size="icon" asChild>
                <a href={professional.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            )}
            {professional.socialLinks?.twitter && (
              <Button variant="outline" size="icon" asChild>
                <a href={professional.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            )}
            {professional.socialLinks?.instagram && (
              <Button variant="outline" size="icon" asChild>
                <a href={professional.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
            )}
            {professional.socialLinks?.facebook && (
              <Button variant="outline" size="icon" asChild>
                <a href={professional.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
        <Separator className="my-6" />
        <div className="text-sm text-muted-foreground">
          <p className="mb-2">Member since 2021</p>
          <p>Last active: 2 days ago</p>
        </div>
        {isBookingModalOpen && (
          <BookingModal
            open={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
            professional={professional}
          />
        )}
      </CardContent>
    </Card>
  );
};

const ProfessionalPage = () => {
  const { id } = useParams();
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const [isFavorited, setIsFavorited] = useState(false);
  const { toast } = useToast();
  const [showBooking, setShowBooking] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [hasLeftReview, setHasLeftReview] = useState(false);

  const canReview = !hasLeftReview && professional && professional.id !== 'user-profile';

  useEffect(() => {
    setLoading(true);
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorited(favorites.includes(id));

    if (id === 'user-profile') {
      const savedUserProfile = localStorage.getItem('userProfile');
      if (savedUserProfile) {
        const userData = JSON.parse(savedUserProfile);
        const userProfessional = {
          ...defaultProfessional,
          id: String(userData.id || 'user-profile'),
          name: String(userData.name || 'Your Profile'),
          title: String(userData.title || 'User'),
          category: String(userData.category || 'other'),
          rating: Number(userData.averageRating || 5.0),
          reviews: Number(userData.reviews ? userData.reviews.length : 0),
          location: String(userData.location || 'Not specified'),
          hourlyRate: Number(userData.hourlyRate || 0),
          acceptsCrypto: (userData.acceptsCrypto === true || userData.acceptsCrypto === false) ? userData.acceptsCrypto : false,
          about: String(userData.bio || 'About me'),
          image: String(userData.profilePicture || ''),
          tags: userData.skills || [],
          education: userData.education || [],
          experience: userData.experience || [],
          certifications: userData.certifications || [],
          contactInfo: {
            email: String(userData.email || ''),
            phone: String(userData.phone || '')
          },
          socialLinks: {
            website: String(userData.socialLinks?.website || ''),
            linkedin: String(userData.socialLinks?.linkedin || ''),
            twitter: String(userData.socialLinks?.twitter || ''),
            instagram: String(userData.socialLinks?.instagram || ''),
            facebook: String(userData.socialLinks?.facebook || '')
          },
        };
        setProfessional(userProfessional);
      } else {
        setProfessional(null);
      }
      setLoading(false);
    } else {
      setTimeout(() => {
        const foundProfessional = mockProfessionalsData.find(p => String(p.id) === id);
        if (foundProfessional) {
          const processedProfessional = {
            ...defaultProfessional,
            ...foundProfessional,
            id: String(foundProfessional.id),
            name: String(foundProfessional.name),
            title: String(foundProfessional.title),
            category: String(foundProfessional.category),
            rating: Number(foundProfessional.rating),
            reviews: Number(foundProfessional.reviews),
            location: String(foundProfessional.location),
            hourlyRate: Number(foundProfessional.hourlyRate),
            acceptsCrypto: (foundProfessional.acceptsCrypto === true || foundProfessional.acceptsCrypto === false) ? foundProfessional.acceptsCrypto : false,
            about: String(foundProfessional.about),
            image: String(foundProfessional.image || ''),
            tags: foundProfessional.tags || [],
            education: foundProfessional.education || [],
            experience: foundProfessional.experience || [],
            certifications: foundProfessional.certifications || [],
            contactInfo: {
              email: String(foundProfessional.contactInfo?.email || ''),
              phone: String(foundProfessional.contactInfo?.phone || '')
            },
            socialLinks: {
              website: String(foundProfessional.socialLinks?.website || ''),
              linkedin: String(foundProfessional.socialLinks?.linkedin || ''),
              twitter: String(foundProfessional.socialLinks?.twitter || ''),
              instagram: String(foundProfessional.socialLinks?.instagram || ''),
              facebook: String(foundProfessional.socialLinks?.facebook || '')
            },
          };
          setProfessional(processedProfessional);
        } else {
          setProfessional(null);
        }
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;
    if (isFavorited) {
      updatedFavorites = favorites.filter(favId => favId !== id);
      toast({
        title: "Removed from favorites",
        description: `${professional.name} removed from your favorites list.`, 
        duration: 3000,
      });
    } else {
      updatedFavorites = [...favorites, id];
      toast({
        title: "Added to favorites",
        description: `${professional.name} added to your favorites list.`, 
        duration: 3000,
      });
    }
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/professional/${professional.id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast({
          title: "Share link copied",
          description: "Profile link has been copied to your clipboard.",
          duration: 3000,
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to copy link. Try again.",
          duration: 3000,
          variant: "destructive",
        });
      });
  };
  
  if (loading) {
    return (
      <div className="pt-24 pb-10 container mx-auto px-4">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Professional Not Found</h2>
        <p className="text-muted-foreground mb-6">The professional you're looking for doesn't exist or has been removed.</p>
        <Button asChild><a href="/explore">Back to Explore</a></Button>
      </div>
    );
  }

  const displayProfessional = {
    ...professional,
    id: String(professional.id || ''),
    name: String(professional.name || ''),
    title: String(professional.title || ''),
    rating: Number(professional.rating || 0),
    reviews: Number(professional.reviews || 0),
    image: String(professional.image || ''),
    acceptsCrypto: (professional.acceptsCrypto === true || professional.acceptsCrypto === false) ? professional.acceptsCrypto : false,
  };

  return (
    <div className="pt-24 pb-10 container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProfileHeader professional={displayProfessional} onFavorite={handleFavorite} onShare={handleShare} isFavorited={isFavorited} />
          {canReview && (
            <Button className="mb-4" onClick={() => setReviewModalOpen(true)}>
              Оставить отзыв
            </Button>
          )}
          <ProfileDetails professional={displayProfessional} />
          <AboutSection professional={displayProfessional} />
          <ExperienceSection experience={displayProfessional.experience || []} />
          <CollapsibleAvailabilitySection availability={displayProfessional.availability || []} name={displayProfessional.name} />
          <ReviewsSection professionalId={displayProfessional.id} />
        </div>
        <div>
          <ContactCard professional={displayProfessional} toast={toast} />
        </div>
      </div>
      {showBooking && (
        <BookingModal open={showBooking} onClose={() => setShowBooking(false)} professional={professional} />
      )}
      <ReviewModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={async (review) => {
          setHasLeftReview(true);
          toast({ title: 'Спасибо за отзыв!', description: 'Ваш отзыв отправлен на модерацию.' });
        }}
        professional={displayProfessional}
        sessionId={null}
      />
    </div>
  );
};

export default ProfessionalPage;
