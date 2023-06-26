import React from 'react';
import { Button } from 'react-native';

const SubmitButton = ({ title, onPress, buttonStyle }) => {
  return (
    <Button style={[styles.button, buttonStyle]} title={title} onPress={onPress} />
  );
};

export default SubmitButton;
