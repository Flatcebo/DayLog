import React, {useRef, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SignButtons from '../components/SignButtons';
import SignForm from '../components/SignForm';
import {useUserContext} from '../contexts/UserContext';
import {signIn, signUp} from '../lib/auth';
import {getUser} from '../lib/users';

function SignInScreen({navigation, route}: any) {
  const {isSignUp}: any = route.params || {};
  const [form, setForm]: any = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading]: any = useState();
  const {setUser}: any = useUserContext();
  const createChangeTextHandler: any = (name: any) => (value: any) => {
    setForm({...form, [name]: value});
  };
  const onSubmit = async () => {
    Keyboard.dismiss();
    const {email, password, confirmPassword}: any = form;
    if (isSignUp && password !== confirmPassword) {
      Alert.alert('실패', '비밀번호가 일치하지 않습니다.');

      return;
    }
    const info: any = {email, password};
    setLoading(true);
    try {
      const {user}: any = isSignUp ? await signUp(info) : await signIn(info);
      const profile: any = await getUser(user.uid);
      if (!profile) {
        navigation.navigate('Welcome', {uid: user.uid});
      } else {
        setUser(profile);
      }
    } catch (e: any) {
      const messages: any = {
        'auth/email-already-in-use': '이미 가입된 이메일입니다.',
        'auth/wrong-password': '잘못된 비밀번호입니다.',
        'auth/user-not-found': '존재하지 않는 계정입니다.',
        'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
      };
      const msg: any =
        messages[e.code] || `${isSignUp ? '가입' : '로그인'} 실패`;
      Alert.alert('실패', msg);
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.select({ios: 'padding'})}>
      <SafeAreaView style={styles.fullscreen}>
        <Text style={styles.text}>DayLog</Text>
        <View style={styles.form}>
          <SignForm
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignButtons
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            loading={loading}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },

  keyboardAvoidingView: {
    flex: 1,
  },
});

export default SignInScreen;
