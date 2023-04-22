import React, {useState} from 'react';
import {TextInput} from 'react-native';

interface Props {
  value: string;
  onChange: (text: string) => void;
  style?: object;
}

const MyTextInput: React.FC<Props> = ({value, onChange, style}) => {
  return (
    <TextInput
      style={style}
      value={value}
      onChangeText={onChange}
    />
  );
};

export default MyTextInput