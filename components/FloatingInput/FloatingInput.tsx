import React from 'react';
import {
  Text,
  TextInput,
  View,
  TextInputProps,
  Animated,
  useAnimatedValue,
  Easing,
  Keyboard,
} from 'react-native';
import styles from './styles';

type PropTypes = {
  value?: any;
  setValue?: (val: number) => void;
  label: string;
  onChange:(text) => void;
  isFocused:boolean;
};

const FloatingInput = React.forwardRef<TextInput, PropTypes & TextInputProps>(
  (
    {label,value, onChange, isFocused=false,...props}: PropTypes & TextInputProps, 
    ref: React.ForwardedRef<TextInput>,
  ): JSX.Element => {
    // const [isFocused, setIsFocused] = React.useState(false);
    // const [keybValue, setValue] = React.useState(0);
    const floatingLabelAnimation = React.useRef(
      new Animated.Value(0),
    ).current;



    const handleFocus = () => {
       if (isFocused) { 
     
      Animated.timing(floatingLabelAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start();
    }
    };

    const handleBlur = () => {
      if (value > 0) return;
      Animated.timing(floatingLabelAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start();
    };
    const floatingLabelStyle = {
      top: floatingLabelAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [30, -5], 
      }),
      fontSize: floatingLabelAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 12], 
      }),
    };

    return (
      <View>
        <Animated.Text style={[styles.label, floatingLabelStyle]}>
          {label}
        </Animated.Text>
        <TextInput
          onChangeText={onChange}
          value={value}
          inputMode={'numeric'}
          style={[isFocused ? styles.input : styles.inputDisabled]}
          keyboardType={'default'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
          submitBehavior={'blurAndSubmit'}
          editable={isFocused}
        />
      </View>
    );
  },
);

export default FloatingInput;
