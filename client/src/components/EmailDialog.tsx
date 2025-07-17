import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { insertUserSchema } from '@shared/schema';
import { setCookie } from '@/utils/cookies';
import { z } from 'zod';

interface EmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address')
});

export function EmailDialog({ isOpen, onClose }: EmailDialogProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const createUserMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, isActive: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to save email');
      }

      return response.json();
    },
    onSuccess: (user) => {
      // Set cookie to remember user - compatible with production
      setCookie('user_id', user.id.toString(), 365);
      
      console.log('User created and cookie set:', {
        userId: user.id,
        cookieSet: document.cookie.includes('user_id=')
      });
      
      toast({
        title: "Welcome to End Times Tracker! 🙏",
        description: "Your email has been saved. You can now explore biblical prophecy.",
      });
      
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save your email. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      emailSchema.parse({ email });
      setIsSubmitting(true);
      await createUserMutation.mutateAsync(email);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Welcome to End Times Tracker
          </DialogTitle>
          <DialogDescription className="text-center">
            Stay informed about biblical prophecy fulfillment and current events. 
            Enter your email to continue exploring.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting || !email}
          >
            {isSubmitting ? 'Saving...' : 'Continue to App'}
          </Button>
        </form>
        
        <p className="text-xs text-muted-foreground text-center">
          We'll only use your email to notify you about significant prophetic events.
        </p>
      </DialogContent>
    </Dialog>
  );
}