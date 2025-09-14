import {getFirestore, Timestamp} from 'firebase-admin/firestore';
import {CallableRequest} from 'firebase-functions/https';
import z from 'zod';
import {getInvoiceRef, InvoiceDoc} from '../../models/firestore/invoice';
import {getUserRef} from '../../models/firestore/user';
import {getUserInvoiceRef, UserInvoiceDoc} from '../../models/firestore/user-invoice';
import {testRequirement} from '../../utils/test-requirement';
import {TransactionWrite} from '../../utils/transaction-write';

const invoiceSchema = z.object({
  issueDate: z.date(),
  paymentDueDays: z.number().int().min(1),
  description: z.string(),
  clientName: z.string(),
  clientEmail: z.string(),
  senderAddress: z.object({
    street: z.string(),
    city: z.string(),
    postCode: z.string(),
    country: z.string()
  }),
  clientAddress: z.object({
    street: z.string(),
    city: z.string(),
    postCode: z.string(),
    country: z.string()
  }),
  items: z.array(z.object({
    name: z.string(),
    quantity: z.number(),
    price: z.number()
  }))
});

export const handler = (request: CallableRequest) => {

  testRequirement(!request.auth, {code: 'unauthenticated'});
  const auth = request.auth!;

  const currentDate = new Date();

  const firestore = getFirestore();

  return firestore.runTransaction(async (transaction) => {

    const transactionWrite = new TransactionWrite(transaction);

    const userRef = getUserRef(firestore, auth.uid);

    const invoiceRef = getInvoiceRef(firestore);
    const invoiceSnap = await transaction.get(invoiceRef);

    testRequirement(!invoiceSnap.exists, {code: 'invalid-argument'});

    const invoice = invoiceSnap.data();
    testRequirement(invoice!.state === 'paid', {code: 'invalid-argument'});

    let parsedInvoice;

    if (invoice!.state === 'draft') {
      parsedInvoice = invoiceSchema.safeParse(request.data);
      testRequirement(!!parsedInvoice.error, {code: 'invalid-argument'});
    }

    if (invoice!.state === 'pending') {
      parsedInvoice = invoiceSchema.omit({issueDate: true}).safeParse(request.data);
      testRequirement(!!parsedInvoice.error, {code: 'invalid-argument'});
    }

    const invoiceData = parsedInvoice!.data!;

    const userInvoiceRef = getUserInvoiceRef(userRef, invoiceRef.id);
    const userInvoiceSnap = await transaction.get(userInvoiceRef);

    testRequirement(!userInvoiceSnap.exists, {code: 'invalid-argument'});

    const userInvoice = userInvoiceSnap.data();

    const totalPrice = invoiceData.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const paymentDue = invoice!.issueDate.toDate();
    paymentDue.setDate(paymentDue.getDate() + invoiceData.paymentDueDays);

    transactionWrite.update(invoiceRef, {
      ...invoice,
      ...invoiceData,
      paymentDue: Timestamp.fromDate(paymentDue),
    } as InvoiceDoc);

    transactionWrite.update(userInvoiceRef, {
      ...userInvoice,
      paymentDue: Timestamp.fromDate(paymentDue),
      clientName: invoiceData.clientName,
      clientEmail: invoiceData.clientEmail,
      totalPrice
    } as UserInvoiceDoc);

    await transactionWrite.execute();

    return {
      invoiceId: invoiceRef.id,
      createdAt: currentDate
    };
  });
};
