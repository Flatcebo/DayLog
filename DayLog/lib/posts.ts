import firestore from '@react-native-firebase/firestore';

const postsCollection = firestore().collection('posts');

export function createPost({user, photoURL, description}: any) {
  return postsCollection.add({
    user,
    photoURL,
    description,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

export const PAGE_SIZE: any = 12;

export async function getPosts({userId, mode, id}: any = {}) {
  let query = postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE);
  if (userId) {
    query = query.where('user.id', '==', userId);
  }
  if (id) {
    const cursorDoc = await postsCollection.doc(id).get();
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

export async function getOlderPosts(id: any, userId: any) {
  return getPosts({
    id,
    mode: 'older',
    userId,
  });
}

export async function getNewerPosts(id: any, userId: any) {
  return getPosts({
    id,
    mode: 'newer',
    userId,
  });
}

export function removePost(id: any) {
  return postsCollection.doc(id).delete();
}

export function updatePost({id, description}: any) {
  return postsCollection.doc(id).update({
    description,
  });
}
