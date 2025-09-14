import {getFirestore, Timestamp} from 'firebase-admin/firestore';
import {CallableRequest} from 'firebase-functions/https';
import z from 'zod';
import {getInvoiceRef, InvoiceDoc} from '../../models/firestore/invoice';
import {getUserRef, userToFirestore} from '../../models/firestore/user';
import {getUserInvoiceRef, UserInvoiceDoc} from '../../models/firestore/user-invoice';
import {testRequirement} from '../../utils/test-requirement';
import {TransactionWrite} from '../../utils/transaction-write';

const invoiceSchema = z.object({
  issueDate: z.date(),
  paymentDueDays: z.number().int().min(1),
  description: z.string(),
  clientName: z.string(),
  clientEmail: z.string(),
  state: z.enum(['pending', 'draft']),
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
    price: z.number(),
  }))
});

export const handler = <T>(request: CallableRequest) => {

  testRequirement(!request.auth, {code: 'unauthenticated'});
  const auth = request.auth!;

  const parsedInvoice = invoiceSchema.safeParse(request.data);
  testRequirement(!!parsedInvoice.error, {code: 'invalid-argument'});
  const invoiceData = parsedInvoice.data!;

  const currentDate = new Date();

  const firestore = getFirestore();

  return firestore.runTransaction(async (transaction) => {

    const transactionWrite = new TransactionWrite(transaction);

    const userRef = getUserRef(firestore, auth.uid);
    const userSnap = await transaction.get(userRef);
    const user = userSnap.data();

    const invoiceRef = getInvoiceRef(firestore);
    const userInvoiceRef = getUserInvoiceRef(userRef, invoiceRef.id);

    const totalPrice = invoiceData.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    transactionWrite.set(userRef, {
      ...userToFirestore(user),
      numberOfInvoices: (user?.numberOfInvoices || 0) + 1
    });

    const paymentDue = new Date(invoiceData.issueDate);
    paymentDue.setDate(paymentDue.getDate() + invoiceData.paymentDueDays);

    transactionWrite.create(invoiceRef, {
      ...invoiceData,
      createdAt: Timestamp.fromDate(currentDate),
      issueDate: Timestamp.fromDate(invoiceData.issueDate),
      paymentDue: Timestamp.fromDate(paymentDue)
    } as InvoiceDoc);

    transactionWrite.create(userInvoiceRef, {
      createdAt: Timestamp.fromDate(currentDate),
      paymentDue: Timestamp.fromDate(paymentDue),
      clientName: invoiceData.clientName,
      clientEmail: invoiceData.clientEmail,
      state: invoiceData.state,
      totalPrice
    } as UserInvoiceDoc);

    await transactionWrite.execute();

    return {
      invoiceId: invoiceRef.id,
      createdAt: currentDate
    };
  });
};
