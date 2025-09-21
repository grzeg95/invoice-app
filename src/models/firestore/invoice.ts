import {
  collection,
  doc,
  Firestore,
  type FirestoreDataConverter,
  type PartialWithFieldValue, Timestamp,
  type WithFieldValue
} from 'firebase/firestore';
import type {InvoiceState} from './InvoiceState';
import {Collections} from './collections';

export type InvoiceDoc = {
  readonly createdAt: Timestamp;
  readonly issueDate: Timestamp;
  readonly paymentDue: Timestamp;
  readonly description: string;
  readonly clientName: string;
  readonly clientEmail: string;
  readonly state: InvoiceState;
  readonly senderAddress: {
    readonly street: string;
    readonly city: string;
    readonly postCode: string;
    readonly country: string;
  };
  readonly clientAddress: {
    readonly street: string;
    readonly city: string;
    readonly postCode: string;
    readonly country: string;
  };
  readonly items: {
    readonly name: string;
    readonly quantity: number;
    readonly price: number;
  }[];
}

export type Invoice = {
  readonly id: string,
} & InvoiceDoc;

const converter = {
  toFirestore: invoiceToFirestore,
  fromFirestore: (snapshot) => ({
    id: snapshot.id,
    ...snapshot.data()
  })
} as FirestoreDataConverter<Invoice, InvoiceDoc>;

export function getInvoiceRef(firestore: Firestore, id?: string) {

  const invoiceCollectionRef = collection(firestore, Collections.invoices);

  let invoiceRef;

  if (id) {
    invoiceRef = doc(invoiceCollectionRef, id);
  } else {
    invoiceRef = doc(invoiceCollectionRef);
  }

  return invoiceRef.withConverter(converter);
}

export function invoiceToFirestore(invoice: Invoice | PartialWithFieldValue<Invoice> | WithFieldValue<Invoice> | undefined) {
  return {
    createdAt: invoice?.createdAt,
    issueDate: invoice?.issueDate,
    paymentDue: invoice?.paymentDue,
    description: invoice?.description,
    clientName: invoice?.clientName,
    clientEmail: invoice?.clientEmail,
    state: invoice?.state,
    senderAddress: invoice?.senderAddress,
    clientAddress: invoice?.clientAddress,
    items: invoice?.items
  };
}
