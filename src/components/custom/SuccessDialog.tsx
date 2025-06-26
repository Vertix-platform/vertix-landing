import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export function SuccessDialog({ isOpen, onClose, userName }: SuccessDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">
            Welcome to Vertix!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Hi {userName}, you've successfully joined our early access program! 
            We'll notify you as soon as Vertix Market launches with exclusive 
            early adopter benefits.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">What's next?</h4>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Follow us on social media for updates</li>
              <li>• You'll be among the first to access Vertix Market</li>
              <li>• Exclusive early adopter rewards await</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={onClose}
            className="w-full bg-accent hover:bg-accent/50"
          >
            Got it!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 