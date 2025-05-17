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
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false);
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

    if (!subscribe) {
      onClose();
    }
    setIsSubmitting(false);
  }, [name, email, subscribe, onSignIn, onClose]);

  const handleNext = useCallback((e) => {
    e.preventDefault();
    setError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setShowSubscriptionForm(true);
  }, [email]);

  const handleCancel = useCallback((e) => {
    e.preventDefault();
    onClose();
    navigate('/');
  }, [onClose, navigate]);

  const handleFinalSubmit = useCallback(() => {
    Cookies.set('user', JSON.stringify({ name, email }), { expires: 7 });
    onSignIn({ name, email });
    onClose();
  }, [name, email, onSignIn, onClose]);

  const iframeStyle = {
    border: '1px solid #EEE',
    background: 'white'
  };

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
        {!showSubscriptionForm ? (
          <form onSubmit={subscribe ? handleNext : handleSubmit} className="space-y-4">
            <TextInput id="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
            <TextInput id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" type="email" />
            <div className="flex items-center space-x-2">
              <input id="subscribe" type="checkbox" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} className="h-4 w-4" />
              <Label htmlFor="subscribe" className="text-sm">Subscribe to newsletter</Label>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <AlertDialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : subscribe ? 'Next' : 'Submit'}
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
            </AlertDialogFooter>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Please confirm your subscription below:</p>
            <iframe
              src="https://techjeeva.substack.com/embed"
              width="100%"
              height="320"
              style={iframeStyle}
              scrolling="no"
              title="Substack Subscription"
              className="border border-gray-300"
            />
            <AlertDialogFooter>
              <Button onClick={handleFinalSubmit}>Submit</Button>
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            </AlertDialogFooter>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
});

export default SignInModal;