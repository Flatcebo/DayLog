import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getUser} from '../lib/users';
import usePosts from './Hooks/usePosts';
import PostGridItem from './PostGridItem';

const Profile = ({userId}: any) => {
  const [user, setUser]: any = useState(null);
  const {posts} = usePosts(userId);

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  if (!user || !posts) {
    return (
      <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
    );
  }
  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      ListHeaderComponent={
        <View>
          <Text>{user.name}</Text>
        </View>
      }
    />
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
