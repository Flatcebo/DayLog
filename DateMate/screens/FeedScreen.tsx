import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import CameraButton from '../components/Writes/CameraButton';
import CustomButton from '../components/CustomButton';
import PostCard from '../components/Feeds/PostCard';
import usePosts from '../components/Hooks/usePosts';
import WriteEditor from '../components/Writes/WriteEditor';

const FeedScreen = () => {
  const {posts} = usePosts('');
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    fetch('http://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(res => setData(res));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.container}
        onEndReachedThreshold={0.75}
      />
      <CameraButton />
    </>
  );
};

const renderItem = ({item}: any) => {
  return (
    <View>
      <View>
        <Text>user.Id : {item.userId}</Text>
      </View>
    </View>
  );
  // <PostCard
  //   id={item.id}
  //   title={item.title}
  //   decription={item.description}
  //   createdAt={item.createdAt}
  //   style={styles.text}
  // />;
};

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

export default FeedScreen;
