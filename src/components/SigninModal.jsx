import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

const SignInModal = ({ isOpen, onClose, onSignIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
  
    setIsSubmitting(true);
    
    const sheetURL = 'https://script.google.com/macros/s/AKfycbyuXbixSl4nOE_QAOOyKGZ0oJt3ghptZtcdMz8xyo2U5pytwNNU45fWrT5BCp7CJbN-ZA/exec';
    const body = `Name=${encodeURIComponent(name)}&Email=${encodeURIComponent(email)}`;
  
    try {
      await fetch(sheetURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
  
      Cookies.set('user', JSON.stringify({ name, email }), { expires: 7 });
      onSignIn({ name, email });
      onClose();
    } catch (err) {
      console.error('Submission failed:', err);
      setError('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <AlertDialogTrigger asChild>
        <div />
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md w-full p-6 m-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <AlertDialogHeader className="p-0 space-y-1">
            <AlertDialogTitle className="text-xl font-semibold">Sign In</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500">
              Enter your details to continue
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="h-8 w-8 rounded-full"
            aria-label="Close"
          >
            <X size={16} />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm font-medium">{error}</div>
          )}
          
          <AlertDialogFooter className="pt-4">
  <Button type="submit" disabled={isSubmitting}>
    {isSubmitting ? 'Submitting...' : 'Sign In'}
  </Button>
  <Button 
    variant="outline" 
    type="button" 
    onClick={onClose} 
    disabled={isSubmitting}
  >
    Cancel
  </Button>
</AlertDialogFooter>

        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignInModal;