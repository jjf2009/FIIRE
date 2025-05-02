import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import SignInModal from '../components/SigninModal'; // Make sure the path is correct

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    } else {
      setShowModal(true);
    }
  }, []);

  const handleSignIn = (userData) => {
    setUser(userData);
    setShowModal(false);
  };

  if (!user) {
    return (
      <>
        <SignInModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSignIn={handleSignIn}
        />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
