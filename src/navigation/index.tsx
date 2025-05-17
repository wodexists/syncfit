import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../hooks/useAuth';

// Import screens
import Login from '../screens/Login';
import HomeScreen from '../screens/HomeScreen';

// Define navigation types
export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  CalendarDemo: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
};

// Create stack navigators
const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();

// Auth stack navigator
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={Login} />
  </AuthStack.Navigator>
);

// Main stack navigator
const MainNavigator = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    <MainStack.Screen name="Home" component={HomeScreen} />
  </MainStack.Navigator>
);

// Root navigator - switches between auth and main flows
const Navigation = () => {
  const { user, isLoading } = useAuth();
  
  // Show a loading screen
  if (isLoading) {
    return null;
  }
  
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation; 