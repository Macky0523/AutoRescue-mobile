import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput,Text,TouchableOpacity, View} from 'react-native';
import {AsyncStorage} from 'react-native';
import axios from '../plugins/axios';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
  
    const handleLogin = async (event) => {
        event.preventDefault();
      try {
        const response = await axios.post('accounts/token/login/', {
          username: username,
          password: password
        });
        const token = response.data.access;
        await AsyncStorage.setItem('authToken', token); // Store the token in local storage
        navigation.navigate('Profile');
      } catch (error) {
        console.error(error);
      }
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={text => setUsername(text)}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30
      },
      input: {
        width: '80%',
        height: 50,
        backgroundColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
        fontSize: 18
      },
      button: {
        width: '80%',
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
      }
    });
