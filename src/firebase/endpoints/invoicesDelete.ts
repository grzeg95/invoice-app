import {httpsCallable} from 'firebase/functions';
import {functions} from '../firebase';

export function invoicesDelete() {
  return httpsCallable<{invoiceId: string}, {invoiceId: string}>(functions, 'invoices-delete');
}
