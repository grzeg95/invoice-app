import {getDoc} from 'firebase/firestore';
import {getInvoiceRef} from '../../models/firestore/invoice';
import {firestore} from '../firebase';

export async function getInvoice(
  invoiceId?: string
) {

  if (!invoiceId) {
    return null;
  }

  try {

    const invoiceRef = getInvoiceRef(firestore, invoiceId);
    const invoiceDocSnap = await getDoc(invoiceRef);

    return invoiceDocSnap.data() || null;
  } catch {
    return null;
  }
}
