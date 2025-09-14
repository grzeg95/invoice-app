import {
  Firestore,
  FirestoreDataConverter,
  PartialWithFieldValue,
  Timestamp,
  WithFieldValue
} from 'firebase-admin/firestore';
import {Collections} from './collections';

export type InvoiceDoc = {
  readonly createdAt: Timestamp;
  readonly issueDate: Timestamp;
  readonly paymentDue: Timestamp;
  readonly paymentDueDays: number;
  readonly description: string;
  readonly clientName: string;
  readonly clientEmail: string;
  readonly state: 'draft' | 'pending' | 'paid';
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

  const invoiceCollectionRef = firestore.collection(Collections.invoices);

  let invoiceRef;

  if (id) {
    invoiceRef = invoiceCollectionRef.doc(id);
  } else {
    invoiceRef = invoiceCollectionRef.doc();
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
