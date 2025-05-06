
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type UserType = "regular" | "creator";

interface UserContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Check URL param on initial load
  const getInitialUserType = (): UserType => {
    // Check if we have a type parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    
    // Check localStorage for any saved preference
    const savedType = localStorage.getItem('userType');
    
    if (typeParam === 'creator') return 'creator';
    if (typeParam === 'regular') return 'regular';
    if (savedType === 'creator') return 'creator';
    return 'regular';
  };

  const [userType, setUserType] = useState<UserType>(getInitialUserType());
  
  // Persist user type to localStorage when it changes
  const updateUserType = (type: UserType) => {
    localStorage.setItem('userType', type);
    setUserType(type);
  };

  // Monitor URL params for changes
  useEffect(() => {
    const handleUrlChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const typeParam = urlParams.get('type');
      
      if (typeParam === 'creator') {
        updateUserType('creator');
      } else if (typeParam === 'regular') {
        updateUserType('regular');
      }
    };

    // Check on mount
    handleUrlChange();

    // Listen for URL changes
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  return (
    <UserContext.Provider value={{ userType, setUserType: updateUserType }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
