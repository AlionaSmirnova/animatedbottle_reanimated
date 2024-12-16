import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Image,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottleFill from './BottleFill';
import styles from './styles';
import FloatingInput from '../FloatingInput/FloatingInput';
import KeyboardImg from '../src/img/keyboard.png';

export default function App() {
  const [inputValue, setInputValue] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const onChangeValue = React.useCallback(text => {
 
    const value = Math.min(Math.max(Number(text), 0), 100);
    setInputValue(value);
  }, []);

  const keyboardDismiss = useCallback(() => {
    if (Keyboard) {
      Keyboard.dismiss();
    }
  }, []);

  const activateKeyboard = useCallback(() => {
    setIsFocused(!isFocused);

  }, [isFocused]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar
        barStyle={'dark-content'}
        animated
        translucent
        backgroundColor="transparent"
      />
      <TouchableWithoutFeedback onPress={() => keyboardDismiss()}>
        <SafeAreaView style={styles.container}>
          <View style={styles.inputBlock}>
            <FloatingInput
              label={'lb'}
              value={inputValue.toString()}
              onChange={text => {
                onChangeValue(text);
              }}
              isFocused={isFocused}
            />
          </View>
          <Pressable
            style={[isFocused ? styles.kboardBox : styles.kboardDisable]}
            onPress={() => activateKeyboard()}>
            <Image source={KeyboardImg} style={styles.kboard} />
          </Pressable>

          <BottleFill value={inputValue} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
}
