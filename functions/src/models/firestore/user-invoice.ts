import {
  DocumentReference,
  FirestoreDataConverter,
  PartialWithFieldValue,
  Timestamp,
  WithFieldValue
} from 'firebase-admin/firestore';
import {Collections} from './collections';
import {User, UserDoc} from './user';

export type UserInvoiceDoc = {
  readonly createdAt: Timestamp;
  readonly paymentDue: Timestamp;
  readonly clientName: string;
  readonly clientEmail: string;
  readonly state: 'draft' | 'pending' | 'paid';
  readonly totalPrice: number;
}

export type UserInvoice = {
  readonly id: string;
} & UserInvoiceDoc;

const converter = {
  toFirestore: userInvoiceToFirestore,
  fromFirestore: (snapshot) => ({
    id: snapshot.id,
    ...snapshot.data()
  })
} as FirestoreDataConverter<UserInvoice, UserInvoiceDoc>;

export function getUserInvoiceRef(userRef: DocumentReference<User, UserDoc>, id: string) {
  return userRef.collection(Collections.userInvoices).doc(id).withConverter(converter);
}

export function userInvoiceToFirestore(userInvoice: UserInvoice | PartialWithFieldValue<UserInvoice> | WithFieldValue<UserInvoice> | undefined) {
  return {
    createdAt: userInvoice?.createdAt,
    paymentDue: userInvoice?.paymentDue,
    clientName: userInvoice?.clientName,
    clientEmail: userInvoice?.clientEmail,
    state: userInvoice?.state,
    totalPrice: userInvoice?.totalPrice
  };
}
