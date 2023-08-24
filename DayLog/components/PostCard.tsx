import {useNavigation, useNavigationState} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import Avatar from './Avatar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import usePostActions from './hooks/usePostActions';
import ActionSheetModal from './ActionSheetModal';
import {RootStackNavigationProp} from '../screens/RootStack';

const PostCard = ({user, photoURL, description, createdAt, id}: any) => {
  const date = useMemo(
    () => (createdAt ? new Date(createdAt._seconds * 1000) : new Date()),
    [createdAt],
  );

  const navigation = useNavigation<RootStackNavigationProp>();
  const routeNames = useNavigationState((state: any) => state.routeNames);
  const {user: me} = useUserContext();
  const isMyPost = me.id === user.id;

  const onOpenProfile = () => {
    // MyProfile이 존재하는지 확인
    if (routeNames.find((routeName: any) => routeName === 'MyProfile')) {
      navigation.navigate('MyProfile');
    } else {
      navigation.navigate('Profile', {
        userId: user.id,
        displayName: user.displayName,
      });
    }
  };

  const {isSelecting, onPressMore, onClose, actions} = usePostActions({
    id,
    description,
  });

  return (
    <>
      <View style={styles.block}>
        <View style={[styles.head, styles.paddingBlock]}>
          <Pressable style={styles.profile} onPress={onOpenProfile}>
            <Avatar source={user.photoURL && {uri: user.photoURL}} size={40} />
            <Text style={styles.displayName}>{user.displayName}</Text>
          </Pressable>
          {isMyPost && (
            <Pressable hitSlop={8} onPress={onPressMore}>
              <Icon name="more-vert" size={20} color="black" />
            </Pressable>
          )}
        </View>
        <Image
          source={{uri: photoURL}}
          style={styles.image}
          resizeMethod="resize"
          resizeMode="cover"
        />
        <View style={styles.paddingBlock}>
          <Text style={styles.description}>{description}</Text>
          <Text
            style={styles.date}
            //   date={date}
          >
            {date.toLocaleString()}
          </Text>
        </View>
      </View>
      <ActionSheetModal
        visible={isSelecting}
        actions={actions}
        onClose={onClose}
      />
    </>
  );
};

const styles = StyleSheet.create({
  block: {
    paddingTop: 16,
    paddingBottom: 16,
  },

  paddingBlock: {
    paddingHorizontal: 16,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    // color: 'black',
  },
  displayName: {
    lineHeight: 16,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
    color: 'black',
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    aspectRatio: 1,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    color: 'black',
  },
  date: {
    color: '#757575',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default PostCard;
