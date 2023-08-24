import {useState} from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useStaffs from '../../Hooks/useStaffs';

export default function UploadModeModal({visible, onClose, userId}: any) {
  const {staffs} = useStaffs(userId);
  const renderItem = () => {
    return (
      <View>
        <Text>hI</Text>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.whiteBox}>
          <Pressable>
            <Text>{staffs.name}</Text>
          </Pressable>
          {/* <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={() => {
              onLaunchCamera();
              onClose();
            }}>
            <Icon
              name="camera-alt"
              color="#757575"
              size={24}
              style={styles.icon}
            />
            <Text style={styles.actionText}>카메라로 촬영하기</Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={() => {
              onLaunchImageLibrary();
              onClose();
            }}>
            <Icon name="photo" color="#757575" size={24} style={styles.icon} />
            <Text style={styles.actionText}>사진 선택하기</Text>
          </Pressable> */}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    color: 'black',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
  actionText: {},
  scrollView: {
    width: 100,
    height: 400,
  },
});
