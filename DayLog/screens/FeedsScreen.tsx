import React, {useEffect} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import PostCard from '../components/PostCard';
import usePosts from '../components/hooks/usePosts';
import events from '../lib/events';
import SplashScreen from 'react-native-splash-screen';

const FeedsScreen = () => {
  const {posts, refreshing, renderFooter, onLoadMore, onRefresh, removePost} =
    usePosts('');

  const postsReady = posts !== null;
  useEffect(() => {
    if (postsReady) {
      SplashScreen.hide();
    }
  }, [postsReady]);

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item: any) => item.id}
      contentContainerStyle={styles.container}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.75}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
  );
};

const renderItem = ({item}: any) => (
  <PostCard
    createdAt={item.createdAt}
    description={item.description}
    id={item.id}
    user={item.user}
    photoURL={item.photoURL}
    style={styles.text}
  />
);

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  text: {
    color: '#000',
  },
  container: {
    paddingBottom: 48,
  },
  spinner: {
    height: 64,
  },
});

export default FeedsScreen;
