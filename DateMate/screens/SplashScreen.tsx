import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SplashScreen = () => {
  const [ready, setReady] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setReady(false);
    }, 2000);
  }, []);
  return (
    <>
      {ready ? (
        <View style={styles.block}>
          <Text style={styles.text}>DateMate</Text>
        </View>
      ) : null}
    </>
  );
};

export default SplashScreen;

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
