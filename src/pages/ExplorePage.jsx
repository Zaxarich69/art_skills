import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { 
  Search, Filter, Star, MapPin, Briefcase, 
  BookOpen, MessageSquare, Heart, Share2, 
  ChevronDown, ChevronUp, Bitcoin, CreditCard
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock data for professionals
const mockProfessionals = [
  {
    id: 1,
    name: 'Dr. Emily Johnson',
    title: 'Mathematics Professor',
    category: 'language_tutor',
    rating: 4.9,
    reviews: 128,
    location: 'New York, NY',
    hourlyRate: 75,
    acceptsCrypto: true,
    about: 'PhD in Mathematics with 10+ years of teaching experience at university level. Specializes in calculus and linear algebra.',
    image: null,
    tags: ['Mathematics', 'Calculus', 'University Level'],
  },
  {
    id: 2,
    name: 'Marcus Chen',
    title: 'Woodworking Craftsman',
    category: 'craftsman',
    rating: 4.8,
    reviews: 93,
    location: 'Portland, OR',
    hourlyRate: 65,
    acceptsCrypto: true,
    about: 'Master craftsman with 15 years of experience. Specializes in custom furniture and woodworking projects.',
    image: null,
    tags: ['Woodworking', 'Furniture', 'Custom Projects'],
  },
  {
    id: 3,
    name: 'Sofia Rodriguez',
    title: 'Spanish Language Tutor',
    category: 'language_tutor',
    rating: 4.7,
    reviews: 156,
    location: 'Miami, FL',
    hourlyRate: 45,
    acceptsCrypto: false,
    about: 'Native Spanish speaker with 8 years of teaching experience. Specializes in conversational Spanish and business Spanish.',
    image: null,
    tags: ['Spanish', 'Language', 'Conversation'],
  },
  {
    id: 4,
    name: 'James Wilson',
    title: 'Web Development Instructor',
    category: 'web_developer',
    rating: 4.9,
    reviews: 201,
    location: 'San Francisco, CA',
    hourlyRate: 90,
    acceptsCrypto: true,
    about: 'Full-stack developer with 12 years of industry experience. Teaches React, Node.js, and modern web development practices.',
    image: null,
    tags: ['Web Development', 'React', 'JavaScript'],
  },
  {
    id: 5,
    name: 'Aisha Patel',
    title: 'Yoga Instructor',
    category: 'fitness_coach',
    rating: 4.8,
    reviews: 175,
    location: 'Austin, TX',
    hourlyRate: 55,
    acceptsCrypto: false,
    about: 'Certified yoga instructor with 7 years of experience. Specializes in Hatha and Vinyasa yoga for all levels.',
    image: null,
    tags: ['Yoga', 'Fitness', 'Wellness'],
  },
  {
    id: 6,
    name: 'David Kim',
    title: 'Piano Teacher',
    category: 'musician',
    rating: 4.9,
    reviews: 112,
    location: 'Chicago, IL',
    hourlyRate: 60,
    acceptsCrypto: true,
    about: 'Classical pianist with a Master\'s degree in Music. 10+ years teaching experience for all ages and skill levels.',
    image: null,
    tags: ['Piano', 'Classical Music', 'Music Theory'],
  },
];

const categories = [
  {
    value: 'All Categories',
    label: 'All Categories'
  },
  // Education
  {
    value: 'language_tutor',
    label: 'Language Tutor',
    parent: 'Education'
  },
  {
    value: 'mathematics_professor',
    label: 'Mathematics Professor',
    parent: 'Education'
  },
  {
    value: 'other_education',
    label: 'Other Education',
    parent: 'Education'
  },
  // Business
  {
    value: 'web_developer',
    label: 'Web Developer',
    parent: 'Business'
  },
  {
    value: 'ui_ux_designer',
    label: 'UI/UX Designer',
    parent: 'Business'
  },
  {
    value: 'business_consultant',
    label: 'Business Consultant',
    parent: 'Business'
  },
  {
    value: 'marketing_specialist',
    label: 'Marketing Specialist',
    parent: 'Business'
  },
  // Arts
  {
    value: 'art_tutor',
    label: 'Art Tutor',
    parent: 'Arts'
  },
  {
    value: 'crafts_master',
    label: 'Crafts Master',
    parent: 'Arts'
  },
  {
    value: 'chef',
    label: 'Chef',
    parent: 'Arts'
  },
  // Technology
  {
    value: 'software_engineer',
    label: 'Software Engineer',
    parent: 'Technology'
  },
  // Music
  {
    value: 'musician',
    label: 'Musician',
    parent: 'Music'
  },
  {
    value: 'music_tutor',
    label: 'Music Tutor',
    parent: 'Music'
  },
  // Photography
  {
    value: 'photographer',
    label: 'Photographer',
    parent: 'Photography'
  },
  {
    value: 'videographer',
    label: 'Videographer',
    parent: 'Photography'
  }
];

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState('all');
  const [acceptsCrypto, setAcceptsCrypto] = useState(false);
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // If this is a main category, show all subcategories
      if (categories.some(cat => cat.parent === categoryParam)) {
        setSelectedCategory(categoryParam);
      } else {
        // If a subcategory is selected, show only it
        const category = categories.find(cat => cat.value === categoryParam);
        if (category) {
          setSelectedCategory(category.value);
        } else {
          setSelectedCategory('All Categories');
        }
      }
    } else {
      setSelectedCategory('All Categories');
    }
  }, [searchParams]);

  useEffect(() => {
    // Simulate loading data from an API
    setTimeout(() => {
      const savedUserProfile = localStorage.getItem('userProfile');
      let userProfessional = null;
      if (savedUserProfile) {
        const userData = JSON.parse(savedUserProfile);
        userProfessional = {
          id: userData.id || 'user-profile', // Assign a unique ID for the user's profile
          name: userData.name || 'Your Profile',
          title: userData.title || 'User',
          category: userData.category || 'other',
          rating: userData.averageRating || 5.0,
          reviews: userData.reviews ? userData.reviews.length : 0,
          location: userData.location || 'Not specified',
          hourlyRate: userData.hourlyRate || 0,
          acceptsCrypto: userData.acceptsCrypto || false,
          about: userData.bio || 'About me',
          image: userData.profilePicture || null,
          tags: userData.skills || [],
        };
      }

      let combinedProfessionals = [...mockProfessionals];
      if (userProfessional) {
        // Check if userProfessional is already in the list to prevent duplicates
        if (!combinedProfessionals.some(pro => pro.id === userProfessional.id)) {
          combinedProfessionals.unshift(userProfessional); // Add user profile to the beginning
        }
      }

      setProfessionals(combinedProfessionals);
      setFilteredProfessionals(combinedProfessionals);
    }, 500);
  }, []);

  useEffect(() => {
    let results = [...professionals];
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(
        pro => 
          pro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pro.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pro.about.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pro.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All Categories') {
      const category = categories.find(cat => cat.value === selectedCategory);
      if (category) {
        if (category.parent) {
          // If a subcategory is selected, show only it
          results = results.filter(pro => pro.category === selectedCategory);
        } else {
          // If a main category is selected, show all its subcategories
          const subcategories = categories
            .filter(cat => cat.parent === selectedCategory)
            .map(cat => cat.value);
          results = results.filter(pro => subcategories.includes(pro.category));
        }
      }
    }
    
    // Apply price range filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        results = results.filter(pro => pro.hourlyRate >= min && pro.hourlyRate <= max);
      } else {
        results = results.filter(pro => pro.hourlyRate >= min);
      }
    }
    
    // Apply crypto filter
    if (acceptsCrypto) {
      results = results.filter(pro => pro.acceptsCrypto);
    }
    
    setFilteredProfessionals(results);
  }, [searchTerm, selectedCategory, priceRange, acceptsCrypto, professionals]);

  const handleFavorite = (id) => {
    toast({
      title: "Added to favorites",
      description: "Professional has been added to your favorites list",
      duration: 3000,
    });
  };

  const handleShare = (id) => {
    toast({
      title: "Share link copied",
      description: "Link has been copied to your clipboard",
      duration: 3000,
    });
  };

  return (
    <div className="pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Explore Professionals</h1>
          <p className="text-muted-foreground">
            Find and connect with skilled teachers, tutors, craftsmen, and experts in various fields.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by name, skill, or keyword..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select 
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  {['Education', 'Business', 'Arts', 'Technology', 'Music', 'Photography'].map((mainCategory) => (
                    <SelectItem key={mainCategory} value={mainCategory}>
                      {mainCategory}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {isFilterOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-secondary/10 rounded-lg p-4 mb-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="price-all"
                        name="price-range"
                        value="all"
                        checked={priceRange === 'all'}
                        onChange={() => setPriceRange('all')}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="price-all">All Prices</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="price-0-50"
                        name="price-range"
                        value="0-50"
                        checked={priceRange === '0-50'}
                        onChange={() => setPriceRange('0-50')}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="price-0-50">$0 - $50 per hour</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="price-50-100"
                        name="price-range"
                        value="50-100"
                        checked={priceRange === '50-100'}
                        onChange={() => setPriceRange('50-100')}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="price-50-100">$50 - $100 per hour</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="price-100"
                        name="price-range"
                        value="100"
                        checked={priceRange === '100'}
                        onChange={() => setPriceRange('100')}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="price-100">$100+ per hour</Label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Payment Options</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="accepts-crypto" 
                      checked={acceptsCrypto}
                      onCheckedChange={setAcceptsCrypto}
                    />
                    <Label htmlFor="accepts-crypto" className="flex items-center">
                      Accepts Cryptocurrency
                      <Bitcoin className="ml-1 h-4 w-4" />
                    </Label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results count */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredProfessionals.length} professionals
          </div>
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionals.map((professional, index) => (
            <motion.div
              key={professional.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative h-48 bg-background">
                    <img 
                      alt={`${professional.name}, ${professional.title}`} 
                      className="w-full h-full object-cover"
                      src={professional.image || "https://images.unsplash.com/photo-1586732711591-12c04655338f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                        onClick={() => handleFavorite(professional.id)}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                        onClick={() => handleShare(professional.id)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold">{professional.name}</h3>
                        <p className="text-muted-foreground">{professional.title}</p>
                      </div>
                      <Badge variant={professional.acceptsCrypto ? "default" : "secondary"}>
                        {professional.acceptsCrypto ? (
                          <span className="flex items-center">
                            <Bitcoin className="mr-1 h-3 w-3" />
                            Crypto
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <CreditCard className="mr-1 h-3 w-3" />
                            Card
                          </span>
                        )}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium mr-1">{professional.rating}</span>
                      <span className="text-muted-foreground text-sm">({professional.reviews} reviews)</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {professional.location}
                    </div>
                    
                    <p className="text-sm mb-4 line-clamp-2">{professional.about}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {professional.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="bg-secondary/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-lg">${professional.hourlyRate}</span>
                        <span className="text-muted-foreground text-sm"> /hour</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/messages?id=${professional.id}`}>
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link to={`/professional/${professional.id}`}>
                            View Profile
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No professionals found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria to find more results.
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All Categories');
              setPriceRange('all');
              setAcceptsCrypto(false);
            }}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
