import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X, Mail } from "lucide-react";

// Constants
const ALERT_DELAY = 10 * 1000; // 1 minute

// Newsletter Alert Component
const NewsletterSubscribeAlert = ({ open, onClose }) => {
  const handleSubscribe = () => {
    window.open("https://techjeeva.substack.com", "_blank");
    onClose();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <span style={{ display: 'none' }} />
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <div className="flex justify-between items-center">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              Stay Updated!
            </AlertDialogTitle>
          </AlertDialogHeader>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="h-8 w-8 rounded-full" 
            aria-label="Close"
          >
            <X size={18} />
          </Button>
        </div>
        
        <AlertDialogDescription className="pt-2 pb-4">
  Stay updated with our newsletter for the latest funding updates for first-time founders.
</AlertDialogDescription>
<div className="bg-blue-50 p-4 rounded-md border border-blue-100 mt-2">
  <p className="font-medium text-blue-800">
    All about funding-related updates for first-time founders.
  </p>
</div>

        
        <AlertDialogFooter className="flex gap-3 sm:justify-end">
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Not Now
          </Button>
          <Button 
            onClick={handleSubscribe} 
            className="bg-blue-600 hover:bg-blue-700"
          >
            Subscribe
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Newsletter Alert Manager Component
const NewsletterAlertManager = () => {
  const [showAlert, setShowAlert] = useState(false);

  // Close the alert and set a cookie to remember the user's choice
  const closeAlert = () => {
    setShowAlert(false);
    Cookies.set('newsletter_alert_shown', 'true', { expires: 365 }); // Set for 1 year
  };

  useEffect(() => {
    // Check if alert is already shown or the cookie is already set
    const alertShown = Cookies.get('newsletter_alert_shown');
    if (alertShown) return;

    // Try to get the user cookie
    const userCookie = Cookies.get('user');
    if (!userCookie) return;

    try {
      const userData = JSON.parse(userCookie);
      const signUpTime = userData.signUpTime || Date.now();
      const timeElapsed = Date.now() - signUpTime;
      
      // Calculate when to show the alert
      if (timeElapsed >= ALERT_DELAY) {
        // Show immediately if enough time has passed
        setShowAlert(true);
      } else {
        // Otherwise, set a timeout for the remaining time
        // const remainingTime = ALERT_DELAY - timeElapsed;
        const timeout = setTimeout(() => setShowAlert(true), ALERT_DELAY);
        return () => clearTimeout(timeout);
      }
    } catch (error) {
      console.error('Error processing user cookie:', error);
    }
  }, []);

  return <NewsletterSubscribeAlert open={showAlert} onClose={closeAlert} />;
};

export default NewsletterAlertManager;