import {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import events from '../lib/events';
import {getUser} from '../lib/users';
import Avatar from './Avatar';
import usePosts from './hooks/usePosts';
import PostGridItem from './PostGridItem';

const Profile = ({userId}: any) => {
  const [user, setUser]: any = useState(null);
  const {posts, refreshing, renderFooter, onLoadMore, onRefresh, removePost} =
    usePosts(userId);

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  if (!user || !posts) {
    return (
      <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
    );
  }
  return (
    <>
      <FlatList
        data={posts}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={(item: any) => item.id}
        style={styles.block}
        ListHeaderComponent={
          <View style={styles.userInfo}>
            <Avatar source={user.photoURL && {uri: user.photoURL}} size={128} />
            <Text style={styles.username}>{user.displayName}</Text>
          </View>
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.25}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      />
    </>
  );
};

const renderItem = ({item}: any) => <PostGridItem post={item} />;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
  block: {
    flex: 1,
  },
  userInfo: {
    paddingTop: 80,
    paddingBottom: 64,
    alignItems: 'center',
  },

  username: {
    marginTop: 8,
    fontSize: 24,
    color: '#424242',
  },
  bottomSpinner: {
    height: 128,
  },
});

export default Profile;
