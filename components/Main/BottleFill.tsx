
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Svg, { Path, Defs, ClipPath } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

type PropTypes = {
  value: number;
};

const BottleFill: React.FC<PropTypes> = React.memo(({ value }) => {
  const bottleHeight = scale(250); 
  const fillLevel = useSharedValue(0); 
  const sliderY = useSharedValue(bottleHeight-70); // Положение ползунка (0 - верх, bottleHeight - низ)

  useEffect(() => {
    const newSliderY = interpolate(value, [0, 100], [bottleHeight-70, 0]);
    sliderY.value = withSpring(newSliderY); // Позиция ползунка
    fillLevel.value = withDelay(500, withSpring(value / 100)); // Уровень заливки с задержкой

    // fillLevel.value = withDelay(500, withSpring(1 - value / 100)); // Уровень заливки с задержкой
  }, [value]);


  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      const newY = Math.min(Math.max(sliderY.value + e.translationY, 0), bottleHeight-70);
      sliderY.value = newY; 
      
      fillLevel.value = withDelay(500, withSpring(1 - newY / bottleHeight)); 
    })
    .onEnd(() => {
      sliderY.value = withSpring(sliderY.value); 
    });

  // Анимация заливки бутылки
  const animatedFillStyle = useAnimatedStyle(() => ({
  
    height: interpolate(fillLevel.value, [0, 1], [0, bottleHeight]),
    transform: [{ translateY: interpolate(fillLevel.value, [0, 1], [bottleHeight, 0]) }],
    // height: interpolate(fillLevel.value, [0, 1], [0, bottleHeight-50]),
    // transform: [{ translateY: interpolate(fillLevel.value, [0, 1], [bottleHeight-50, 0]) }],
  }));

  // Анимация положения ползунка
  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: sliderY.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.bottleWrapper}>
        <Svg width="120" height={bottleHeight} > 
            {/* viewBox="0 0 120 250" */}
          <Path
            d="M50 10 Q60 0 70 10 V50 H85 Q100 50 100 70 V220 Q100 240 85 240 H35 Q20 240 20 220 V70 Q20 50 35 50 H50 V10 Z"
            stroke="#000"
            strokeWidth="2"
            fill="none"
          />
        
          <Defs>
            <ClipPath id="clipBottle">
              <Path d="M50 10 Q60 0 70 10 V50 H85 Q100 50 100 70 V220 Q100 240 85 240 H35 Q20 240 20 220 V70 Q20 50 35 50 H50 V10 Z" />
            </ClipPath>
          </Defs>
         
          <Animated.View
            style={[
              styles.fill,
              animatedFillStyle,
              { clipPath: 'url(#clipBottle)'
              }, 
            ]}
          />
        </Svg>

        {/* ползунок для управления заполнением */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.slider, sliderStyle]} />
        </GestureDetector>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop:scale(-100),
  },
  bottleWrapper: {
    position: 'relative',
    height: scale(240),
    width: scale(100),
  },
  fill: {
    position: 'absolute',
    // top: scale(-50),
    width: scale(78),
    backgroundColor: 'teal', 
    opacity: 0.5,
    left:15,
    maxHeight:240,
    borderRadius:scale(10),
  },
  slider: {
    width: 50,
    height: 50,
    backgroundColor: '#00BFA5',
    borderRadius: 25,
    position: 'absolute',
    left: 130, 
  },
});

export default BottleFill;


