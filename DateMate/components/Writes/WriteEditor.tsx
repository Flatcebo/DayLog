import React, {useRef} from 'react';
import {View, StyleSheet, TextInput, Text, Button} from 'react-native';
import AddPersonButton from './Add/AddPersonButton';

const WriteEditor = ({title, body, onChangeTitle, onChangeBody}: any) => {
  const bodyRef: any = useRef();
  return (
    <View style={styles.mainBlock}>
      <TextInput
        placeholder="제목을 입력하세요."
        style={styles.titleInput}
        returnKeyType="next"
        onChangeText={onChangeTitle}
        value={title}
        onSubmitEditing={() => {
          bodyRef.current.focus();
        }} //네비게이트 오류 발생 Write 스크린 이름을 찾을수 없음.
      />
      <View style={styles.subBlock}>
        <AddPersonButton />
      </View>
      <TextInput
        placeholder="내용을 입력해주세요."
        style={styles.bodyInput}
        multiline
        textAlignVertical="top"
        onChangeText={onChangeBody}
        value={body}
        ref={bodyRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainBlock: {flex: 1, padding: 16},
  subBlock: {
    flex: 0.2,
    padding: 0,
    borderTopWidth: 2,
    borderColor: '#00669661',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleInput: {
    paddingVertical: 0,
    fontSize: 18,
    marginBottom: 16,
    color: '#263238',
    fontWeight: 'bold',
  },
  bodyInput: {
    paddingTop: 10,
    borderTopWidth: 2,
    borderColor: '#00669661',
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: '#263238',
  },
});

export default WriteEditor;
