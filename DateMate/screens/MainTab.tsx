import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {NativeSyntheticEvent, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeedScreen from './FeedScreen';
import CalendarScreen from './CalendarScreen';
import ProfileScreen from './ProfileScreen';
import MemberScreen from './MemberScreen';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {RootStackNavigationProp} from './RootStack';

type MainTabParamList = {
  Home: undefined;
  Account: undefined;
  작업내역: undefined;
  캘린더: undefined;
  인력관리: undefined;
  프로필: undefined;
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
            tabBarActiveTintColor: '#006696',
          }}>
          <Tab.Screen
            name="작업내역"
            component={FeedScreen}
            options={{
              tabBarIcon: ({color, size}): any => (
                <Text>
                  <Icon name="article" color={color} size={size} />
                </Text>
              ),
            }}
          />
          <Tab.Screen
            name="캘린더"
            component={CalendarScreen}
            options={{
              tabBarIcon: ({color, size}): any => (
                <Text>
                  <Icon name="event" color={color} size={size} />
                </Text>
              ),
            }}
          />
          <Tab.Screen
            name="인력관리"
            component={MemberScreen}
            options={{
              tabBarIcon: ({color, size}): any => (
                <Text>
                  <Icon name="people-alt" color={color} size={size} />
                </Text>
              ),
            }}
          />
          <Tab.Screen
            name="프로필"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({color, size}): any => (
                <Text>
                  <Icon name="person" color={color} size={size} />
                </Text>
              ),
            }}
          />
        </Tab.Navigator>
      </View>
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
