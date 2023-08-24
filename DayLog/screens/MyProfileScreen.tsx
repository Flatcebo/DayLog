import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import IconRightButton from '../components/IconRightButton';
import Profile from '../components/Profile';
import {useUserContext} from '../contexts/UserContext';
import {RootStackNavigationProp} from './RootStack';

const MyProfileScreen = () => {
  const {user} = useUserContext();
  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      title: user.displayName,
      headerRight: () => (
        <IconRightButton
          name="settings"
          onPress={() => navigation.push('Setting')}
        />
      ),
    });
  }, [navigation, user]);

  return <Profile userId={user.id} />;
};

export default MyProfileScreen;
