import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import axios from '../../plugins/axios';
import { useNavigation } from '@react-navigation/native';

export default function Activate() {
  const [uid, setUid] = useState('');
  const [token, setToken] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('accounts/users/activation/', {
        uid: uid,
        token: token,
      });
      console.log(response.data);
      // Redirect the user to the homepage or the page you want to show after login
      navigation.navigate('Login');
    } catch (error) {
      console.error('Invalid UID or TOKEN');
      console.error(error);
      setErrorMessage('Invalid UID or TOKEN');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Activate</Text>
        <TextInput
          style={styles.input}
          placeholder="Uid"
          value={uid}
          onChangeText={(text) => setUid(text)}
          required
        />
        <TextInput
          style={styles.input}
          placeholder="Token"
          value={token}
          onChangeText={(text) => setToken(text)}
          required
        />
        <Button style={styles.button} title="Activate" onPress={handleSubmit} />
        <Text>
          Already have an account?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </View>
      {open && (
        <Text style={styles.error}>{errorMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    position: 'relative',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(245, 69, 69, 0.8)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
