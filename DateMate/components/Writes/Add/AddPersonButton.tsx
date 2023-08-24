import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootStackNavigationProp} from '../../../screens/RootStack';
import UploadModeModal from './UploadModeModal';

const AddPersonButton = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [visibleModal, setVisibleModal] = useState(false);
  const onModal = () => {
    setVisibleModal(true);
    return;
  };
  return (
    <>
      <View style={styles.wrapper}>
        <Pressable style={styles.circle} onPress={onModal}>
          <Icon name="add" style={styles.icons} size={24} />
          <Text style={styles.text}>추가</Text>
        </Pressable>
      </View>
      <UploadModeModal
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5,
    borderRadius: 20,
    height: 34,
    width: 80,
    position: 'absolute',
    paddingHorizontal: 0,
    left: '86%',
    transform: [
      {
        translateX: -27,
      },
    ],
    ...Platform.select({
      ios: {
        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
        overflow: 'hidden',
      },
    }),
  },
  circle: {
    backgroundColor: '#006696a4',
    borderRadius: 20,
    height: 34,
    width: 80,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 0,
    padding: 0,
  },
  icons: {
    color: 'white',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default AddPersonButton;
