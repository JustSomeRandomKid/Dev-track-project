import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Switch,} from 'react-native';
import { auth } from '../firebaseConfig';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,updatePassword,} from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  // Sign Up
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Account created successfully!');
      setIsLoggedIn(true);
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Logged in successfully!');
      setIsLoggedIn(true);
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMessage('Logged out successfully!');
      setIsLoggedIn(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Update Password
  const handleUpdatePassword = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        setMessage('Password updated successfully!');
      } else {
        setMessage('You need to be logged in to update your password.');
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Toggle Notifications
  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    setMessage(
      notificationsEnabled
        ? 'Notifications disabled'
        : 'Notifications enabled'
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {isLoggedIn ? (
        <>
          <Text style={styles.loggedInText}>Welcome, {email}!</Text>

          {/* Update Password Section */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="lock-closed" size={24} color="#ffcd00" />
              <Text style={styles.cardTitle}>Update Password</Text>
            </View>
            <TextInput
              placeholder="Enter new password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#ccc"
            />
            <TouchableOpacity
              style={styles.cardButton}
              onPress={handleUpdatePassword}
            >
              <Text style={styles.cardButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Notifications Toggle */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="notifications" size={24} color="#ffcd00" />
              <Text style={styles.cardTitle}>Notifications</Text>
            </View>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleText}>
                {notificationsEnabled ? 'Enabled' : 'Disabled'}
              </Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={notificationsEnabled ? '#ffcd00' : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#ffcd00" // Yellow
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#ffcd00" // Yellow
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#001f3d', // Navy
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffcd00', // Yellow
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#001f3d', // Navy
    color: '#fff', // White
  },
  card: {
    backgroundColor: '#002f5c',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '90%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffcd00',
    marginLeft: 10,
  },
  cardButton: {
    backgroundColor: '#ffcd00',// Yellow
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cardButtonText: {
    color: '#001f3d',
    fontWeight: 'bold',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleText: {
    fontSize: 16,
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    marginTop: 20,
    color: 'red',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  button: {
    backgroundColor: '#ffcd00',// Yellow
    color: '#001f3d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    color: '#001f3d',
    fontWeight: 'bold',
  },
  loggedInText: {
    marginBottom: 15,
    color: '#fff',//White
  },
});

export default Settings;
