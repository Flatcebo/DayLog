import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import IconRightButton from '../components/IconRightButton';
import {useUserContext} from '../contexts/UserContext';
import storage from '@react-native-firebase/storage';
import {v4} from 'uuid';
import {createPost} from '../lib/posts';
import events from '../lib/events';

const UploadScreen = () => {
  const route: any = useRoute();
  const {res}: any = route.params || {};
  const {width}: any = useWindowDimensions();
  const animation: any = useRef(new Animated.Value(width)).current;
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [description, setDescription] = useState('');
  const navigation: any = useNavigation();
  const {user}: any = useUserContext();

  const onSubmit: any = useCallback(async () => {
    navigation.pop();

    const asset: any = res.assets[0];

    const extension: any = asset.fileName.split('.').pop();
    const reference: any = storage().ref(
      `/photo/${user.id}/${v4()}.${extension}`,
    );
    if (Platform.OS === 'android') {
      await reference.putString(asset.base64, 'base64', {
        contentType: asset.type,
      });
    } else {
      await reference.putFile(asset.uri);
    }k
    const photoURL: any = await reference.getDownloadURL();
    await createPost({description, photoURL, user});
    events.emit('refresh');
    // TODO: 포스트 목록 새로고침
  }, [res, user, description, navigation]);

  useEffect(() => {
    const didShow: any = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardOpen(true),
    );
    const didHide: any = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardOpen(false),
    );

    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isKeyboardOpen ? 0 : width,
      useNativeDriver: false,
      duration: 150,
      delay: 100,
    }).start();
  }, [isKeyboardOpen, width, animation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={onSubmit} name="send" />,
    });
  }, [navigation, onSubmit]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})}
      style={styles.block}
      keyboardVerticalOffset={Platform.select({
        ios: 180,
      })}>
      <View style={styles.block}>
        <Animated.Image
          source={{uri: res.assets[0]?.uri}}
          style={[styles.image, {height: animation}]}
          resizeMode="cover"
        />
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="이 사진에 대한 설명을 입력하세요..."
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  image: {
    width: '100%',
  },
  input: {
    color: 'black',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    fontSize: 16,
  },
});

export default UploadScreen;
