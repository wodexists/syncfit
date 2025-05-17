import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import RNBootSplash from 'react-native-bootsplash';
import firebase from '@react-native-firebase/app';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Navigation from './src/navigation';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCwyP5qmKd21QgIv7cJfzQpu8z8DrnwqSg',
  authDomain: 'syncfit-503fd.firebaseapp.com',
  projectId: 'syncfit-503fd',
  storageBucket: 'syncfit-503fd.firebasestorage.app',
  messagingSenderId: '420251650017',
  appId: '1:420251650017:android:52701c2ec7688f798bb4a0'
};

// Define custom theme
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4F46E5',
    accent: '#10B981',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    error: '#EF4444',
    text: '#1F2937',
    onSurface: '#1F2937',
    disabled: '#9CA3AF',
    placeholder: '#6B7280',
  },
};

function App(): React.JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Initialize Firebase
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  // Handle user state changes
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  useEffect(() => {
    const init = async () => {
      // Perform any initialization tasks here
      
      // Hide the splash screen when ready
      await RNBootSplash.hide({ fade: true });
    };

    init();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
