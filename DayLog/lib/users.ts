import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('users');

export function createUser({id, displayName, photoURL}: any) {
  return usersCollection.doc(id).set({
    id,
    displayName,
    photoURL,
  });
}

export async function getUser(id: any) {
  const doc = await usersCollection.doc(id).get();
  return doc.data();
}
