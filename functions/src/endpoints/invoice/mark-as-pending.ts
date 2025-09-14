import {getFirestore} from 'firebase-admin/firestore';
import {CallableRequest} from 'firebase-functions/https';
import z from 'zod';
import {getInvoiceRef} from '../../models/firestore/invoice';
import {getUserRef} from '../../models/firestore/user';
import {getUserInvoiceRef} from '../../models/firestore/user-invoice';
import {testRequirement} from '../../utils/test-requirement';
import {TransactionWrite} from '../../utils/transaction-write';

const invoiceSchema = z.object({
  invoiceId: z.string()
});

export const handler = (request: CallableRequest) => {

  testRequirement(!request.auth, {code: 'unauthenticated'});
  const auth = request.auth!;

  const parsedInvoice = invoiceSchema.safeParse(request.data);
  testRequirement(!!parsedInvoice.error, {code: 'invalid-argument'});
  const invoiceData = parsedInvoice.data!;

  const firestore = getFirestore();

  return firestore.runTransaction(async (transaction) => {

    const transactionWrite = new TransactionWrite(transaction);

    const userRef = getUserRef(firestore, auth.uid);
    const userSnap = await transaction.get(userRef);
    testRequirement(!userSnap.exists, {code: 'invalid-argument'});

    const invoiceRef = getInvoiceRef(firestore, invoiceData.invoiceId);
    const invoiceSnap = await transaction.get(invoiceRef);
    testRequirement(!invoiceSnap.exists, {code: 'invalid-argument'});
    const invoice = invoiceSnap.data()!;

    testRequirement(invoice.state !== 'draft', {code: 'invalid-argument'});

    const userInvoiceRef = getUserInvoiceRef(userRef, invoiceRef.id);
    const userInvoiceSnap = await transaction.get(userInvoiceRef);
    testRequirement(!userInvoiceSnap.exists, {code: 'invalid-argument'});

    transactionWrite.update(invoiceRef, {
      status: 'pending'
    });

    transactionWrite.update(userInvoiceRef, {
      status: 'pending'
    });

    await transactionWrite.execute();

    return {
      invoiceId: invoiceRef.id,
      status: 'pending'
    };
  });
};
