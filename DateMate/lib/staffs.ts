import firestore from '@react-native-firebase/firestore';

const staffsCollection = firestore().collection('staffs');

export const PAGE_SIZE: any = 12;

export function createStaffs({
  name,
  phoneNumber,
  country,
  description,
  address,
}: any) {
  return staffsCollection.add({
    name,
    phoneNumber,
    country,
    description,
    address,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getStaffs({userId, id, mode}: any) {
  let query = staffsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE);
  if (userId) {
    query = query.where('user.id', '==', userId);
  }
  if (id) {
    const cursorDoc = await staffsCollection.doc(id).get();
    query =
      mode === 'older'
        ? query.startAfter(cursorDoc)
        : query.endBefore(cursorDoc);
  }

  const snapshot: any = await query.get();

  const posts: any = snapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return posts;
}
