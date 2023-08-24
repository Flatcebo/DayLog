import React, {useEffect, useState} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MainTab, {MainTabNavigationScreenParams} from './MainTab';
import WriteScreen from './WriteScreen';
import SignInScreen from './SignInScreen';
import WelcomeScreen from './WelcomeScreen';
import {useUserContext} from '../contexts/UserContext';
import NewInScreen from './NewInScreen';
import {subscribeAuth} from '../lib/auth';
import {getUser} from '../lib/users';
import UploadScreen from './UploadScreen';
import FeedsScreen from './FeedsScreen';
import ProfileScreen from './ProfileScreen';
import PostScreen from './PostScreen';
import ModifyScreen from './ModifyScreen';
import SettingScreen from './SettingScreen';
import SplashScreen from 'react-native-splash-screen';

type RootStackParamList = {
  MainTab: MainTabNavigationScreenParams;
  Detail: {
    id: number;
  };
  NewIn: any;
  SignIn: any;
  Welcome: any;
  Upload: any;
  Post: any;
  Feed: any;
  Setting: any;
  Modify: any;
  Profile: any;
  MyProfile: any;
};
export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const {user, setUser}: any = useUserContext();

  useEffect(() => {
    // 컴포넌트 첫 로딩 시 로그인 상태를 확인하고 UserContext에 적용
    const unsubscribe = subscribeAuth(async (currentUser: any) => {
      // 여기에 등록한 함수는 사용자 정보가 바뀔 때마다 호출되는데
      // 처음 호출될 때 바로 unsubscribe해 한 번 호출된 후에는 더 이상 호출되지 않게 설정
      unsubscribe();
      if (!currentUser) {
        SplashScreen.hide();
        return;
      }
      const profile = await getUser(currentUser.uid);
      if (!profile) {
        return;
      }
      setUser(profile);
    });
  }, [setUser]);

  const [ready, setReady] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setReady(false);
    }, 2000);
  }, []);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          {ready ? (
            <Stack.Screen
              name="NewIn"
              component={NewInScreen}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="MainTab"
              component={MainTab}
              options={{headerShown: false}}
            />
          )}

          <Stack.Screen
            name="Upload"
            component={UploadScreen}
            options={{
              title: '새 게시물',
              headerBackTitle: '뒤로가기',
            }}
          />
          <Stack.Screen
            name="Modify"
            component={ModifyScreen}
            options={{title: '설명 수정', headerBackTitle: '뒤로가기'}}
          />
          <Stack.Screen name="Feed" component={FeedsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen
            name="Setting"
            component={SettingScreen}
            options={{title: '설정', headerBackTitle: '뒤로가기'}}
          />

          <Stack.Screen
            name="Post"
            component={PostScreen}
            options={{title: '게시물'}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
