import {getDocs, limit, orderBy, query, QueryDocumentSnapshot, startAfter, where} from 'firebase/firestore';
import {firestore} from '../firebase';
import {getUserRef} from '../../models/firestore/user';
import {getUserInvoiceCollectionRef, type UserInvoice} from '../../models/firestore/user-invoice';
import type {InvoiceState} from '../../models/firestore/InvoiceState';

export async function getInvoices(
  pageParam: QueryDocumentSnapshot<UserInvoice> | null,
  selectedOptions: InvoiceState[],
  limitOfItems: number,
  userUid?: string
) {

  if (selectedOptions.length === 0 || !userUid) {
    return {
      invoices: [],
      lastDocSnap: null
    };
  }

  const userRef = getUserRef(firestore, userUid);
  const userInvoiceCollectionRef = getUserInvoiceCollectionRef(userRef);

  let q;

  if (pageParam) {
    q = query(
      userInvoiceCollectionRef,
      where('state', 'in', selectedOptions),
      orderBy('createdAt', 'desc'),
      orderBy('paymentDue', 'desc'),
      limit(limitOfItems + 1),
      startAfter(pageParam)
    );
  } else {
    q = query(
      userInvoiceCollectionRef,
      where('state', 'in', selectedOptions),
      orderBy('createdAt', 'desc'),
      orderBy('paymentDue', 'desc'),
      limit(limitOfItems + 1)
    );
  }

  const invoicesQuerySnap = await getDocs(q);
  let invoices = invoicesQuerySnap.docs;
  let lastDocSnap;

  if (invoices.length > limitOfItems) {
    invoices = invoicesQuerySnap.docs.slice(0, -1);
    lastDocSnap = invoicesQuerySnap.docs[limitOfItems - 1]
  } else {
    lastDocSnap = null;
  }

  return {invoices, lastDocSnap};
}
