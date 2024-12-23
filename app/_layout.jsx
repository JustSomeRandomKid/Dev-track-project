import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import screens
import HomeScreen from './home';
import GroupsScreen from './groups';
import SettingsScreen from './settings';


const Tab = createBottomTabNavigator();

export default function RootLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#001f3d', // Navy
          borderColor: '#ffcd00', // Yellow
          height: 55,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#ffcd00', // Yellow
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size}/>
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupsScreen}
        options={{
          tabBarLabel: 'Groups',
          tabBarIcon: ({ color, size }) => (
            <Icon name="users" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cogs" color={color} size={size}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}