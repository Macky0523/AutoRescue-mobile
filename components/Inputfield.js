import React from 'react';
import { TextInput } from 'react-native';

const InputField = ({ placeholder, value, onChangeText, secureTextEntry = false }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      required
    />
  );
};

export default InputField;
