import {getFirestore} from 'firebase-admin/firestore';
import {auth} from 'firebase-functions/v1';
import {handler as createInvoice} from '../endpoints/invoices/create';
import {invoices} from '../mock/invoices';
import {getUserRef, userToFirestore} from '../models/firestore/user';
import {TransactionWrite} from '../utils/transaction-write';

export const handler = auth.user().onCreate(async (userRecord) => {

  // create user invoices
  await Promise.all(invoices.map((invoice) => {
    return createInvoice({data: invoice, auth: {uid: userRecord.uid}});
  }));

  // create user
  const firestore = getFirestore();
  return firestore.runTransaction(async (transaction) => {

    const transactionWrite = new TransactionWrite(transaction);

    const userRef = getUserRef(firestore, userRecord.uid);
    const userSnap = await transaction.get(userRef);
    const user = userSnap.data();

    transactionWrite.update(userRef, {
      ...userToFirestore(user),
      initialized: true
    });

    await transactionWrite.execute();
  });
});
