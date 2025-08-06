import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useClipboard() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, message?: string) => {
    if (!text) {
      toast({
        title: "Nothing to copy",
        description: "The text field is empty.",
        variant: "destructive"
      });
      return false;
    }

    try {
      setIsLoading(true);
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: message || "Text copied to clipboard.",
      });
      return true;
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy text to clipboard.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { copyToClipboard, isLoading };
}
