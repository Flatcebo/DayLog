import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import React, {useState, useReducer} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TransparantCircleButton from '../TransparantCircleButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {RootStackNavigationProp} from '../../screens/RootStack';

const initialState = {mode: 'date', visible: false};
function reducer(state: any, action: any) {
  switch (action.type) {
    case 'open':
      return {
        mode: action.mode,
        visible: true,
      };
    case 'close':
      return {
        ...state,
        visible: false,
      };
    default:
      throw new Error('Unhandled action type');
  }
}

const WriteHeader = ({
  onSave,
  onAskRemove,
  isEditing,
  date,
  onChangeDate,
}: any) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const onGoBack = () => {
    navigation.pop();
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const open = (mode: any) => dispatch({type: 'open', mode});
  const close = () => dispatch({type: 'close'});

  const onConfirm = (selectedDate: any) => {
    close();
    onChangeDate(selectedDate);
  };

  return (
    <SafeAreaView>
      <View style={styles.block}>
        <View style={styles.iconButtonWrapper}>
          <TransparantCircleButton
            name="arrow-back"
            onPress={onGoBack}
            color="#424242"
          />
        </View>
        <View style={styles.buttons}>
          {isEditing && (
            <TransparantCircleButton
              color="#ef5350"
              name="delete-forever"
              hasMarginRight
              onPress={onAskRemove}
            />
          )}

          <TransparantCircleButton
            name="check"
            color="#0066968d"
            onPress={onSave}
          />
        </View>
        <View style={styles.center}>
          <Pressable onPress={() => open('date')}>
            <Text>
              {format(new Date(date), 'PPP', {
                locale: ko,
              })}
            </Text>
          </Pressable>
          <View style={styles.separator} />
          <Pressable onPress={() => open('time')}>
            <Text>{format(new Date(date), 'p', {locale: ko})}</Text>
          </Pressable>
        </View>
        <DateTimePickerModal
          isVisible={state.visible}
          mode={'date'}
          onConfirm={onConfirm}
          onCancel={close}
          date={date}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButtonWrapper: {
    widht: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 8,
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    flexDirection: 'row',
  },
  separator: {
    width: 8,
  },
});

export default WriteHeader;
