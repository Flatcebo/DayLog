import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {useEffect} from 'react';
import Profile from '../components/Profile';

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {userId, displayName}: any = route.params ?? {};

  useEffect(() => {
    navigation.setOptions({
      title: displayName,
    });
  }, [navigation, displayName]);

  return <Profile userId={userId} />;
};

export default ProfileScreen;
