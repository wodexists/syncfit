import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, Title, Paragraph, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

export default function HomeScreen() {
  const user = auth().currentUser;
  
  const handleSignOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SyncFit</Text>
        <Button mode="outlined" onPress={handleSignOut}>Sign Out</Button>
      </View>
      
      <ScrollView style={styles.content}>
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Title>Welcome, {user?.displayName?.split(' ')[0] || 'User'}!</Title>
            <Paragraph>Your fitness journey awaits. Let's get started.</Paragraph>
          </Card.Content>
        </Card>
        
        <Text style={styles.sectionTitle}>Upcoming Workouts</Text>
        
        <Card style={styles.workoutCard}>
          <Card.Content>
            <Title>Morning Cardio</Title>
            <Paragraph>Tomorrow, 7:00 AM</Paragraph>
            <Paragraph>30 min run + 15 min HIIT</Paragraph>
          </Card.Content>
        </Card>
        
        <Card style={styles.workoutCard}>
          <Card.Content>
            <Title>Upper Body Strength</Title>
            <Paragraph>Wednesday, 6:30 PM</Paragraph>
            <Paragraph>45 min resistance training</Paragraph>
          </Card.Content>
        </Card>
        
        <Text style={styles.sectionTitle}>Your Stats</Text>
        
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content>
              <Title>8</Title>
              <Paragraph>Workouts this month</Paragraph>
            </Card.Content>
          </Card>
          
          <Card style={styles.statCard}>
            <Card.Content>
              <Title>12h</Title>
              <Paragraph>Total active time</Paragraph>
            </Card.Content>
          </Card>
          
          <Card style={styles.statCard}>
            <Card.Content>
              <Title>3</Title>
              <Paragraph>Workouts planned</Paragraph>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  welcomeCard: {
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 24,
    color: '#1F2937',
  },
  workoutCard: {
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 4,
    borderLeftColor: '#4F46E5',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statCard: {
    width: '30%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
});
