import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get('window');

// Web client ID for Google Sign-In
const WEB_CLIENT_ID = '420251650017-8m2jn4h1a4urskdfhn2v687art4u2cs5.apps.googleusercontent.com';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  offlineAccess: true,
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Get the user ID token
      const { idToken } = await GoogleSignin.signIn();
      
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Avatar.Text 
          size={100} 
          label="SF" 
          style={styles.logoAvatar} 
        />
        <Text style={styles.appName}>SyncFit</Text>
        <Text style={styles.tagline}>Your Intelligent Fitness Companion</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>Intelligent workout scheduling</Text>
        </View>
        
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>Google Calendar integration</Text>
        </View>
        
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>Track your progress and stats</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <Button
          mode="contained"
          onPress={handleGoogleLogin}
          style={styles.googleButton}
          disabled={isLoading}
          loading={isLoading}
        >
          Sign in with Google
        </Button>
        
        <Text style={styles.disclaimer}>
          By signing in, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.1,
  },
  logoAvatar: {
    backgroundColor: '#4F46E5',
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#F3F4F6',
    padding: 16,
    borderRadius: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 16,
  },
  buttonContainer: {
    padding: 24,
    marginBottom: 24,
  },
  googleButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 8,
    marginBottom: 12,
  },
  disclaimer: {
    marginTop: 16,
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 16,
    textAlign: 'center',
  },
}); 