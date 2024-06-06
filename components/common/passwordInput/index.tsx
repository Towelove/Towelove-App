import { MaterialIcons } from '@expo/vector-icons';
import { Icon, Input, Pressable } from 'native-base';
import React, { useState } from 'react';

interface IProps {
  value?: string;
  onChange?: any;
  placeholder?: string;
}
const PasswordInput = (props: IProps) => {
  const { value, onChange, placeholder } = props;
  const [show, setShow] = useState(false);
  return (
    <Input
      type={show ? 'text' : 'password'}
      InputRightElement={
        <Pressable onPress={() => setShow(!show)}>
          <Icon
            as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
            size={5}
            mr="2"
            color="muted.400"
          />
        </Pressable>
      }
      placeholder={placeholder ? placeholder : 'password'}
      value={value}
      onChangeText={onChange}
    />
  );
};

export default PasswordInput;
