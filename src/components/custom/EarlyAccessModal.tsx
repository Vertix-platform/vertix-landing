import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface EarlyAccessModalProps {
  trigger?: React.ReactNode;
  className?: string;
  onJoin?: (email: string, name: string, country: string) => void;
}

export function EarlyAccessModal({
  trigger,
  className = "",
  onJoin
}: EarlyAccessModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    setIsSubmitting(true);
    try {
      if (onJoin) {
        await onJoin(email, name, country);
      } else {
        // Default behavior - you can customize this
        console.log('Joining early access with email:', email);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setEmail('');
      setIsOpen(false);
    } catch (error) {
      console.error('Error joining early access:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            className={`bg-accent border border-border/20 px-4 py-2 rounded-full w-fit text-white font-semibold hover:bg-accent/50 transition-colors ${className}`}
          >
            Join Early Access
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Join Early Access
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Be among the first to experience the future of digital identity.
            Get exclusive access to Vertix Market before anyone else.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    autoComplete='off'
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
            </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="country" className="text-sm font-medium">
                Country
            </label>
            <input
                id="country"
                type="text"
                value={country}
                autoComplete='off'
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter your country"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="w-full sm:w-auto bg-accent hover:bg-accent/50"
            >
              {isSubmitting ? 'Joining...' : 'Join Early Access'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 