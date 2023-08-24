import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import {signOut} from '../lib/auth';

const SettingScreen = () => {
  const {setUser} = useUserContext();

  const onLogout = async () => {
    await signOut();
    setUser(null);
  };
  return (
    <View style={styles.block}>
      <Pressable
        onPress={onLogout}
        style={({pressed}: any) => [
          styles.item,
          pressed && Platform.select({ios: {opacity: 0.5}}),
        ]}
        android_ripple={{
          color: '#eee',
        }}>
        <Text>로그아웃</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingTop: 32,
  },
  item: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  itemText: {
    fontSize: 16,
  },
});

export default SettingScreen;
