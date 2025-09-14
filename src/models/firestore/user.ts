import {
  doc,
  Firestore,
  type FirestoreDataConverter,
  type PartialWithFieldValue,
  type WithFieldValue
} from 'firebase/firestore';
import {Collections} from './collections';

export type UserDoc = {
  readonly initialized?: boolean;
  readonly isDarkMode?: boolean;
  readonly numberOfInvoices?: number;
}

export type User = {
  readonly uid: string;
} & UserDoc;

const converter = {
  toFirestore: userToFirestore,
  fromFirestore: (snapshot) => ({
    uid: snapshot.id,
    ...snapshot.data()
  })
} as FirestoreDataConverter<User, UserDoc>;

export function getUserRef(firestore: Firestore, id: string) {
  const userRef = doc(firestore, Collections.users, id);
  return userRef.withConverter(converter);
}

export function userToFirestore(user: User | PartialWithFieldValue<User> | WithFieldValue<User> | undefined) {
  return {
    initialized: user?.initialized,
    isDarkMode: user?.isDarkMode,
    numberOfInvoices: user?.numberOfInvoices
  };
}
