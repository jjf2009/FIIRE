import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

/**
 * Custom hook to manage user data from cookies
 * 
 * This hook handles:
 * - Loading user data from cookies
 * - Providing user data to components
 * - Updating user data as needed
 * 
 * @returns {Object} User data and related functions
 */
export const useUserData = () => {
  // Initialize state with data from cookies if available
  const [user, setUser] = useState(() => {
    try {
      const cookieData = Cookies.get('user');
      return cookieData ? JSON.parse(cookieData) : null;
    } catch (error) {
      console.error('Error parsing user data from cookie:', error);
      return null;
    }
  });
  
  // Function to update user data
  const updateUser = useCallback((userData) => {
    try {
      // Set in state
      setUser(userData);
      
      // Update cookie
      if (userData) {
        Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // 7-day expiry
      } else {
        Cookies.remove('user');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  }, []);
  
  // Function to log user out
  const logoutUser = useCallback(() => {
    Cookies.remove('user');
    setUser(null);
  }, []);
  
  // Listen for cookie changes from other tabs/windows
  useEffect(() => {
    const checkCookieChange = () => {
      try {
        const cookieData = Cookies.get('user');
        const newUserData = cookieData ? JSON.parse(cookieData) : null;
        
        // Compare stringified objects to check for actual changes
        const currentUserStr = JSON.stringify(user);
        const newUserStr = JSON.stringify(newUserData);
        
        if (currentUserStr !== newUserStr) {
          setUser(newUserData);
        }
      } catch (error) {
        console.error('Error checking cookie changes:', error);
      }
    };
    
    // Check periodically for cookie changes
    const interval = setInterval(checkCookieChange, 5000);
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [user]);
  
  return {
    user,
    updateUser,
    logoutUser,
    isLoggedIn: !!user?.email
  };
};

export default useUserData;