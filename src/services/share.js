import { toast } from '@/components/ui/use-toast';

export const shareService = {
  shareProfile: async (professionalId, professionalName) => {
    const shareData = {
      title: `Профиль ${professionalName}`,
      text: `Посмотрите профиль ${professionalName} на Art Skills!`,
      url: `${window.location.origin}/professional/${professionalId}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Успешно поделились",
          description: "Профиль успешно отправлен",
        });
      } else {
        // Fallback для браузеров без Web Share API
        const url = shareData.url;
        await navigator.clipboard.writeText(url);
        toast({
          title: "Ссылка скопирована",
          description: "Ссылка на профиль скопирована в буфер обмена",
        });
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        toast({
          title: "Ошибка",
          description: "Не удалось поделиться профилем",
          variant: "destructive"
        });
      }
    }
  }
}; 