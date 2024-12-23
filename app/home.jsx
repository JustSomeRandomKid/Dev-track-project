import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const targetDate = new Date('2025-01-05T00:00:00');

    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(intervalId);
        setTimeLeft('The time has come!');
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Countdown to the event!!!</Text>
      <Text style={styles.timeLeft}>{timeLeft}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001f3d', // Navy
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffcd00', // Yellow
    marginBottom: 20,
  },
  timeLeft: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffcd00', // Yellow
  },
});

export default HomeScreen;
