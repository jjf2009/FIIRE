import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const ALERT_DELAY = 1 * 60 * 1000; // 2 minutes

// Newsletter Alert Component
const NewsletterSubscribeAlert = ({ onClose }) => {
  const handleSubscribe = () => {
    window.open("https://techjeeva.substack.com", "_blank");
    onClose();
  };

  return (
    <AlertDialog open onOpenChange={onClose}>
      <AlertDialogTrigger asChild>
        <div />
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <div className="flex justify-between items-center">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">Stay Updated!</AlertDialogTitle>
          </AlertDialogHeader>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8" aria-label="Close">
            <X size={18} />
          </Button>
        </div>
        
        <AlertDialogDescription className="pt-2 pb-4">
  <span className="text-base mb-3 block">
    Subscribe to our newsletter for all the latest funding updates for first-time founders.
  </span>
  <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mt-2">
    <p className="font-medium text-blue-800">
      All about funding-related updates for first-time founders.
    </p>
  </div>
</AlertDialogDescription>

        
        <AlertDialogFooter className="flex gap-3 sm:justify-end">
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={onClose}>Not Now</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleSubscribe} className="bg-blue-600 hover:bg-blue-700">
              Subscribe
            </Button>
          </AlertDialogAction>
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
    // Avoid running the effect twice in development (React Strict Mode)
    if (showAlert) return;

    const userCookie = Cookies.get('user');
    const alertShown = Cookies.get('newsletter_alert_shown');

    console.log("User Cookie:", userCookie);
    console.log("Newsletter Alert Shown:", alertShown);

    // If the alert has already been shown, exit
    if (!userCookie || alertShown) return;

    try {
      const userData = JSON.parse(userCookie);
      const signUpTime = userData.signUpTime || Date.now();

      const timeElapsed = Date.now() - signUpTime;
      const remainingTime = ALERT_DELAY - timeElapsed;

      // Show alert immediately if the delay has already passed
      if (remainingTime <= 0) {
        setShowAlert(true);
      } else {
        // Show alert after the remaining time
        const timeout = setTimeout(() => setShowAlert(true), remainingTime);
        return () => clearTimeout(timeout);
      }
    } catch (error) {
      console.error('Error processing user cookie:', error);
    }
  }, [showAlert]);

  // Render the alert if the state indicates so
  if (!showAlert) return null;
  return <NewsletterSubscribeAlert onClose={closeAlert} />;
};

export default NewsletterAlertManager;
