import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeedsScreen from './FeedsScreen';
import ProfileScreen from './ProfileScreen';
import PostScreen from './PostScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <>
        {/* <Stack.Screen name="Feeds" component={FeedsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />

        <Stack.Screen
          name="Post"
          component={PostScreen}
          options={{title: '게시물'}}
        /> */}
      </>
    </Stack.Navigator>
  );
};

export default HomeStack;
