import {httpsCallable} from 'firebase/functions';
import {functions} from '../firebase';

export function invoicesMarkAsPending() {
  return httpsCallable<{invoiceId: string}, {invoiceId: string}>(functions, 'invoices-markaspending');
}
