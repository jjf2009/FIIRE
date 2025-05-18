import React, { useState, useCallback, memo } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
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

// Reusable Input Component
const TextInput = memo(({ id, label, value, onChange, type = 'text', placeholder }) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
    <Input id={id} name={id} type={type} placeholder={placeholder} value={value} onChange={onChange} className="w-full" required />
  </div>
));

const SignInModal = memo(({ isOpen, onClose, onSignIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    Cookies.set('user', JSON.stringify({ name, email }), { expires: 7 });
    onSignIn({ name, email });
    onClose();

    if (subscribe) {
      const sheetURL = 'https://script.google.com/macros/s/AKfycbyuXbixSl4nOE_QAOOyKGZ0oJt3ghptZtcdMz8xyo2U5pytwNNU45fWrT5BCp7CJbN-ZA/exec';
      const body = `Name=${encodeURIComponent(name)}&Email=${encodeURIComponent(email)}`;
      console.log(body);

      try {
        const response = await fetch(sheetURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        });

        if (!response.ok) {
          throw new Error('Failed to subscribe to the newsletter.');
        }

        console.log("Successfully subscribed to Google Sheet");
      } catch (err) {
        setError(err.message);
        console.error("Subscription Error:", err);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  }, [name, email, subscribe, onSignIn, onClose]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    onClose();
    navigate('/');
  }, [onClose, navigate]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogTrigger asChild><div /></AlertDialogTrigger>
      <AlertDialogContent className="max-w-md w-full p-6 m-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Sign In</AlertDialogTitle>
            <AlertDialogDescription>Enter your details to continue</AlertDialogDescription>
          </AlertDialogHeader>
          <Button variant="ghost" size="icon" onClick={handleCancel} aria-label="Close">
            <X size={16} />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput id="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
          <TextInput id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" type="email" />
          {/* <div className="flex items-center space-x-2">
            <input id="subscribe" type="checkbox" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} className="h-4 w-4" />
            <Label htmlFor="subscribe" className="text-sm">Subscribe to newsletter</Label>
          </div> */}

          {error && <div className="text-red-500">{error}</div>}
          <AlertDialogFooter>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Signing In...' : 'Sign In'}</Button>
            <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default SignInModal;
