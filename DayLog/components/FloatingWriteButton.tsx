import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FloatingWriteButton = ({hidden}: any) => {
  const navigation: any = useNavigation();
  const onPress = () => {
    navigation.navigate('Write');
  };
  const animation: any = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   // ios 글쓰기 추가하면 버튼이 사라짐 | 뷰에 리스트가 꽉차면 버튼이 나옴
  //   Animated.spring(animation, {
  //     toValue: hidden ? 1 : 0,
  //     useNativeDriver: true,
  //     tension: 45,
  //     friction: 5,
  //   }).start();
  // }, [animation, hidden]);

  return (
    <SafeAreaView>
      <Animated.View
        style={[
          styles.wrapper,
          {
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 88],
                }),
              },
            ],
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}>
        <Pressable
          style={({pressed}: any) => [
            styles.button,
            Platform.OS === 'ios' && {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
          android_ripple={{color: 'white'}}
          onPress={onPress}>
          <Icon name="add" size={24} style={styles.icon} />
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    // IOS 전용 그림자 설정
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // 안드로이드 전용 그림자 설정
    elevation: 5,
    // 안드로이드에서 물결 효과가 영역 박으로 나가지 않도록 설정
    // IOS에서는 overflow가 hidden일 경우 그림자가 보여지지 않음
    overflow: Platform.select({android: 'hidden'}),
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#009688',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
  },
});

export default FloatingWriteButton;
