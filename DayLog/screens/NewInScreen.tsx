import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';

const NewInScreen = () => {
  const {user}: any = useUserContext();
  const navigation: any = useNavigation();

  return (
    <View style={styles.block}>
      {user.photoURL && (
        <Image
          source={{uri: user.photoURL}}
          style={{width: 128, height: 128, marginBottom: 16, borderRadius: 100}}
          resizeMode="cover"
        />
      )}
      <Text style={styles.text}>Hello, {user.displayName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 24,
  },
  block: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewInScreen;
