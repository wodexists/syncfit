import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import { Platform } from 'react-native';

// Firebase configuration from google-services.json
// Web client ID found in the Firebase console under Authentication > Sign-in method > Google
const WEB_CLIENT_ID = '420251650017-8m2jn4h1a4urskdfhn2v687art4u2cs5.apps.googleusercontent.com';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCwyP5qmKd21QgIv7cJfzQpu8z8DrnwqSg',
  authDomain: 'syncfit-503fd.firebaseapp.com',
  projectId: 'syncfit-503fd',
  storageBucket: 'syncfit-503fd.firebasestorage.app',
  messagingSenderId: '420251650017',
  appId: '1:420251650017:android:52701c2ec7688f798bb4a0'
};

/**
 * Firebase Authentication Service
 */
class FirebaseAuthService {
  constructor() {
    // Initialize Firebase if it hasn't been initialized yet
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    
    this.configureGoogleSignIn();
  }

  /**
   * Configure GoogleSignin with web client ID
   */
  configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: true, // If you need to access Google API on behalf of the user
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
        'profile',
        'email'
      ],
    });
  }

  /**
   * Sign in with Google
   * @returns Firebase user object
   */
  async signInWithGoogle() {
    try {
      // Check if device supports Google Play Services
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Get user ID token
      const { idToken } = await GoogleSignin.signIn();
      
      // Create Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Sign in with credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      
      return userCredential.user;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  }

  /**
   * Sign out from both Firebase and Google
   */
  async signOut() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
      return true;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  /**
   * Get the current user
   * @returns Current Firebase user
   */
  getCurrentUser() {
    return auth().currentUser;
  }

  /**
   * Listen for auth state changes
   * @param callback Function to call on auth state change
   * @returns Unsubscribe function
   */
  onAuthStateChanged(callback: (user: FirebaseAuthTypes.User | null) => void) {
    return auth().onAuthStateChanged(callback);
  }
}

export const firebaseAuth = new FirebaseAuthService(); 