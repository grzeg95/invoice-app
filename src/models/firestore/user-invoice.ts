import {
  collection,
  doc,
  DocumentReference,
  type FirestoreDataConverter,
  type PartialWithFieldValue,
  Timestamp,
  type WithFieldValue
} from 'firebase/firestore';
import type {InvoiceState} from './InvoiceState';
import {Collections} from './collections';
import type {User, UserDoc} from './user';

export type UserInvoiceDoc = {
  readonly paymentDue: Timestamp;
  readonly clientName: string;
  readonly clientEmail: string;
  readonly state: InvoiceState;
  readonly createdAt: Timestamp;
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
  return doc(userRef, Collections.userInvoices, id).withConverter(converter);
}

export function getUserInvoiceCollectionRef(userRef: DocumentReference<User, UserDoc>) {
  return collection(userRef, Collections.userInvoices).withConverter(converter);
}

export function userInvoiceToFirestore(user: UserInvoice | PartialWithFieldValue<UserInvoice> | WithFieldValue<UserInvoice> | undefined) {
  return {
    paymentDue: user?.paymentDue,
    clientName: user?.clientName,
    clientEmail: user?.clientEmail,
    state: user?.state,
    createdAt: user?.createdAt,
    totalPrice: user?.totalPrice
  };
}
