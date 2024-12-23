import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GroupsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Groups</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001f3d', // Navy background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffcd00', // Yellow text
  },
});

export default GroupsScreen;
