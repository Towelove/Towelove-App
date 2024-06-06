// src/components/FormItem/index.tsx
import React from 'react';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  GlobalError,
  UseControllerProps,
} from 'react-hook-form';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

type FormItemProps<T extends FieldValues, TName extends FieldPath<T>> = {
  label?: string;
  required?: boolean;
  errors?: GlobalError;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  border?: boolean;
  className?: string;
  hiddenRequired?: boolean;
} & ControllerProps<T, TName> &
  UseControllerProps<T, TName>;

const FormItem = <T extends FieldValues, TName extends FieldPath<T>>(
  props: FormItemProps<T, TName>
) => {
  const {
    name,
    control,
    rules,
    label,
    required,
    errors,
    style = {},
    labelStyle = {},
    border = true,
    render,
    className,
    hiddenRequired,
  } = props;

  return (
    <View key={name} className={className ? className : 'relative'} style={style}>
      {label && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              marginBottom: 5,
              fontWeight: '700',
              ...labelStyle,
            }}
          >
            {label}
          </Text>
          {required && <Text style={{ marginLeft: 4, color: 'red', fontSize: 20 }}>*</Text>}
        </View>
      )}

      <View
        style={{
          ...(!errors
            ? {
                borderColor: border ? '#B3BAC1' : 'transparent',
              }
            : {
                borderColor: border ? '#D52D0B' : 'transparent',
              }),
        }}
      >
        <Controller name={name} control={control} rules={rules} render={render} />
      </View>
      {required && !label && !hiddenRequired && (
        <Text className="absolute top-[-2px] left-1 text-[#D52D0B]">*</Text>
      )}
      {rules && errors && errors?.message && (
        <View
          style={{
            marginTop: 4,
          }}
        >
          <Text
            style={{
              color: 'red',
              fontSize: 10,
            }}
          >
            {errors?.message}
          </Text>
        </View>
      )}
    </View>
  );
};

export default FormItem;
