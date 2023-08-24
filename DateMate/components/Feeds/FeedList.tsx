import {FlatList, StyleSheet, View} from 'react-native';
import FeedListItem from './FeedListItem';

interface FeedListProps {
  logs: any;
}

const FeedList = ({logs}: FeedListProps) => {
  return (
    <FlatList
      data={logs}
      style={styles.block}
      renderItem={({item}) => <FeedListItem log={item} />}
      keyExtractor={log => log.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      // onScroll={onScroll}
      // ListHeaderComponent={ListHeaderComponent}
    />
  );
};

const styles = StyleSheet.create({
  block: {flex: 1},
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    width: '100%',
  },
});

export default FeedList;
