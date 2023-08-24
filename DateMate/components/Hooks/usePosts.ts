import {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
// import {useUserContext} from '../../contexts/UserContext';
import {
  getNewerPosts,
  getOlderPosts,
  getPosts,
  PAGE_SIZE,
} from '../../lib/posts';
// import usePostsEventEffect from './usePostsEventEffect';

export default function usePosts(userId: any) {
  const [posts, setPosts]: any = useState(null);
  const [noMorePost, setNoMorePost] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // const {user} = useUserContext();

  const onLoadMore = async () => {
    if (noMorePost || !posts || posts.length < PAGE_SIZE) {
      return;
    }
    const lastPost = posts[posts.length - 1];
    const olderPosts = await getOlderPosts(lastPost.id, userId);
    if (olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true);
    }
    setPosts(posts.concat(olderPosts));
  };

  const onRefresh = useCallback(async () => {
    if (!posts || posts.length === 0 || refreshing) {
      return;
    }

    const firstPost = posts[0];
    setRefreshing(true);
    const newerPosts = await getNewerPosts(firstPost.id, userId);
    setRefreshing(false);
    if (newerPosts.length === 0) {
      return;
    }
    setPosts(newerPosts.concat(posts));
  }, [posts, userId, refreshing]);

  // const renderFooter: any = () => {
  //   return (
  //     !noMorePost && (
  //       <ActivityIndicator
  //         style={styles.bottomSpinner}
  //         size={32}
  //         color="#6200ee"
  //       />
  //     )
  //   );
  // };

  useEffect(() => {
    getPosts({userId}).then(_posts => {
      setPosts(_posts);
      if (_posts.length < PAGE_SIZE) {
        setNoMorePost(true);
      }
    });
  }, [userId]);

  const removePost = useCallback(
    (postId: any) => {
      setPosts(posts.filter((post: any) => post.id !== postId));
    },
    [posts],
  );

  const updatePost = useCallback(
    ({postId, description}: any) => {
      // id가 일치하는 포스트를 찾아서 description 변경
      const nextPosts = posts.map((post: any) =>
        post.id === postId
          ? {
              ...post,
              description,
            }
          : post,
      );
      setPosts(nextPosts);
    },
    [posts],
  );

  // usePostsEventEffect({
  //   refresh: onRefresh,
  //   removePost,
  //   enabled: !userId || userId === user.id,
  //   updatePost,
  // });

  return {
    posts,
    noMorePost,
    refreshing,
    // renderFooter,
    onLoadMore,
    onRefresh,
    removePost,
  };
}

const styles = StyleSheet.create({
  bottomSpinner: {
    height: 128,
  },
});
