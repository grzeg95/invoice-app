import {httpsCallable} from 'firebase/functions';
import {functions} from '../firebase';

export function invoicesMarkAsPaid() {
  return httpsCallable<{invoiceId: string}, {invoiceId: string}>(functions, 'invoices-markaspaid');
}
