// IOS 글쓰기 추가하면 버튼 사라짐 (아마 렌더링이 일어나지 않아서 그런거 같음.)

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import FeedsScreen from './FeedsScreen';
import CalendarScreen from './CalendarScreen';
import SearchScreen from './SearchScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchHeader from '../components/SearchHeader';
import NewInScreen from './NewInScreen';
import CameraButton from '../components/CameraButton';
import MyProfileScreen from './MyProfileScreen';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {RootStackNavigationProp} from './RootStack';

type MainTabParamList = {
  Home: undefined;
  Account: undefined;
  Feeds: undefined;
  MyProfile: undefined;
};

export type MainTabNavigationProp = CompositeNavigationProp<
  RootStackNavigationProp,
  BottomTabNavigationProp<MainTabParamList>
>;

export type MainTabNavigationScreenParams =
  NavigatorScreenParams<MainTabParamList>;

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTab = () => {
  return (
    <>
      <View style={styles.block}>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#009688',
          }}>
          <Tab.Screen
            name="Feeds"
            component={FeedsScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="view-stream" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="MyProfile"
            component={MyProfileScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="view-stream" size={size} color={color} />
              ),
            }}
          />
          {/* <Tab.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="event" size={size} color={color} />
              ),
            }}
          /> */}
          {/* <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon name="search" size={size} color={color} />
              ),
              headerTitle: () => <SearchHeader />,
            }}
          /> */}
        </Tab.Navigator>
      </View>
      <CameraButton />
    </>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
  text: {
    fontSize: 24,
  },
});

export default MainTab;
