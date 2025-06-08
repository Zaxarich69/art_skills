import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, CreditCard, Bitcoin, Edit, Save
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ProfileForm from '@/components/profile/ProfileForm';
import PaymentMethods from '@/components/profile/PaymentMethods';
import CryptoWallets from '@/components/profile/CryptoWallets';
import ConnectWalletModal from '@/components/ConnectWalletModal';

const initialUserData = {
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  phone: '+1 (555) 987-6543',
  location: 'San Francisco, CA',
  bio: 'Software developer with a passion for teaching and mentoring. I specialize in web development and enjoy sharing my knowledge with others.',
  title: 'Senior Web Developer',
  hourlyRate: 85,
  acceptsCrypto: true,
  profilePicture: null, 
  skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'UI/UX Design'],
  education: [
    { id: 'edu1', degree: 'Master of Computer Science', institution: 'Stanford University', year: '2018' },
    { id: 'edu2', degree: 'Bachelor of Science in Computer Engineering', institution: 'UC Berkeley', year: '2016' }
  ],
  experience: [
    { id: 'exp1', title: 'Senior Web Developer', company: 'Tech Innovations Inc.', period: '2020 - Present', description: 'Leading frontend development for enterprise applications.' },
    { id: 'exp2', title: 'Web Developer', company: 'Digital Solutions', period: '2018 - 2020', description: 'Developed responsive web applications using React and Node.js.' }
  ],
  certifications: [
    { id: 'cert1', name: 'AWS Certified Developer' },
    { id: 'cert2', name: 'Google Cloud Professional Developer' },
    { id: 'cert3', name: 'React Advanced Certification' }
  ],
  paymentMethods: [
    { id: 'pm1', type: 'card', last4: '4242', expiry: '05/25', isDefault: true }
  ],
  cryptoWallets: [
    { id: 'cw1', type: 'bitcoin', name: 'My Bitcoin Wallet', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', isDefault: true },
    { id: 'cw2', type: 'ethereum', name: 'My Ethereum Wallet', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', isDefault: false }
  ]
};

const ProfilePage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [formData, setFormData] = useState({...initialUserData});
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] = useState(false);

  const handleSaveProfile = (updatedData) => {
    setUserData(updatedData);
    setFormData(updatedData); 
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
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

  return (
    <div className="pt-24 pb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Profile</h1>
              <p className="text-muted-foreground">
                Manage your personal information and settings
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
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center mb-6 pt-4">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={userData.profilePicture || undefined} alt={userData.name} />
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {userData.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold text-center">{userData.name}</h2>
                    <p className="text-muted-foreground text-center">{userData.title}</p>
                  </div>
                  
                  <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} orientation="vertical">
                    <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-1">
                      <TabsTrigger value="profile" className="justify-start w-full">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </TabsTrigger>
                      <TabsTrigger value="payment" className="justify-start w-full">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Payment Methods
                      </TabsTrigger>
                      <TabsTrigger value="crypto" className="justify-start w-full">
                        <Bitcoin className="mr-2 h-4 w-4" />
                        Crypto Wallets
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
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
            </div>
          </div>
        </div>
      </div>
      <ConnectWalletModal isOpen={isConnectWalletModalOpen} setIsOpen={setIsConnectWalletModalOpen} />
    </div>
  );
};

export default ProfilePage;