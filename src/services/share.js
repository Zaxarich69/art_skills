import { toast } from '@/components/ui/use-toast';

export const shareService = {
  shareProfile: async (professionalId, professionalName) => {
    const shareData = {
      title: `Profile of ${professionalName}`,
      text: `Check out the profile of ${professionalName} on Art Skills!`,
      url: `${window.location.origin}/professional/${professionalId}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully",
          description: "Profile has been shared successfully",
        });
      } else {
        // Fallback for browsers without Web Share API
        const url = shareData.url;
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link copied",
          description: "Profile link copied to clipboard",
        });
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        toast({
          title: "Error",
          description: "Failed to share profile",
          variant: "destructive"
        });
      }
    }
  }
}; 