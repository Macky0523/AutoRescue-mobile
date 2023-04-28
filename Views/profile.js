import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import {AsyncStorage} from 'react-native';
import axios from '../plugins/axios';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const [user, setUser] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('authToken').then(token => {
      axios.get('accounts/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
        }).then(response => {
        setUser(response.data);
        }).catch(error => {
        console.error(error);
        });
        });
        }, []);
        
        const handleLogout = async () => {
        try {
        await AsyncStorage.removeItem('authToken');
        navigation.navigate('Login');
        } catch (error) {
        console.error(error);
        }
        };
        
        return (
        <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
        <Text style={styles.text}>First Name: {user.first_name}</Text>
        <Text style={styles.text}>Last Name: {user.last_name}</Text>
        <Text style={styles.text}>Username: {user.username}</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
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
        text: {
        fontSize: 18,
        marginBottom: 20
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
