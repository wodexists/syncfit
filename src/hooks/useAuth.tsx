import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { firebaseAuth } from '../services/firebase';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  error: string | null;
  login: () => Promise<boolean>;
  signOut: () => Promise<boolean>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  login: async () => false,
  signOut: async () => false,
});

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  // Sign in with Google
  const login = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const user = await firebaseAuth.signInWithGoogle();
      setUser(user);
      return true;
    } catch (error) {
      setError('Failed to sign in');
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await firebaseAuth.signOut();
      setUser(null);
      return true;
    } catch (error) {
      setError('Failed to sign out');
      console.error('Sign out error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for components to get auth context
export function useAuth() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsLoading(false);
    });
    
    return subscriber; // unsubscribe on unmount
  }, []);

  return { 
    user, 
    isLoading,
    isAuthenticated: !!user
  };
} 