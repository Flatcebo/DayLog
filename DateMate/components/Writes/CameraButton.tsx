import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActionSheetIOS,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootStackNavigationProp} from '../../screens/RootStack';
import ActionSheetModal from '../ActionSheetModal';
// import UploadModeModal from './UploadModeModal';

const TABBAR_HEIGHT = 49;

// const imagePickerOption: any = {
//   mediaType: 'photo',
//   maxWidth: 768,
//   maxHeight: 768,
//   includeBase64: Platform.OS === 'android',
// };

const CameraButton = () => {
  const insets: any = useSafeAreaInsets();
  const [modalVisible, setModalVisible]: any = useState(false);
  const navigation = useNavigation<RootStackNavigationProp>();

  const bottom: any = Platform.select({
    android: TABBAR_HEIGHT / 2,
    ios: TABBAR_HEIGHT / 2 + insets.bottom - 4,
  });

  const onMoveWrite = () => {
    navigation.push('Write');
  };

  // const onPickImage = (res: any) => {
  //   if (res.didCancel || !res) {
  //     return;
  //   }
  //   navigation.push('Upload', {res});
  // };
  // const onLaunchCamera = () => {
  //   launchCamera(imagePickerOption, onPickImage);
  // };

  // const onLaunchImageLibrary = () => {
  //   launchImageLibrary(imagePickerOption, onPickImage);
  // };

  // const onPress: any = () => {
  //   if (Platform.OS === 'android') {
  //     setModalVisible(true);
  //     return;
  //   }

  //   ActionSheetIOS.showActionSheetWithOptions(
  //     {
  //       options: ['카메라로 촬영하기', '사진 선택하기', '취소'],
  //       cancelButtonIndex: 2,
  //     },
  //     (buttonIndex: number) => {
  //       if (buttonIndex === 0) {
  //         onLaunchCamera();
  //       } else if (buttonIndex === 1) {
  //         onLaunchImageLibrary();
  //       }
  //     },
  //   );
  // };

  return (
    <>
      <View style={[styles.wrapper, {bottom}]}>
        <Pressable
          android_ripple={{
            color: '#ffffff',
          }}
          style={styles.circle}
          onPress={onMoveWrite}>
          <Icon name="camera-alt" color="white" size={24} />
        </Pressable>
      </View>
      {/* <ActionSheetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        actions={[
          {
            icon: 'camera-alt',
            text: '글쓰기',
            onPress: onMoveWrite,
          },
        ]}
      /> */}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5,
    borderRadius: 27,
    height: 54,
    width: 54,
    position: 'absolute',
    left: '50%',
    transform: [
      {
        translateX: -27,
      },
    ],
    ...Platform.select({
      ios: {
        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
        overflow: 'hidden',
      },
    }),
  },
  circle: {
    backgroundColor: '#6200ee',
    borderRadius: 27,
    height: 54,
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CameraButton;
