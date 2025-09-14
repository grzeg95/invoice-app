import {firestore} from 'firebase-admin';
import {initializeApp} from 'firebase-admin/app';
import {setGlobalOptions} from "firebase-functions";
import {CallableRequest, onCall} from 'firebase-functions/https';
import {globalErrorHandler} from './utils/global-error-handler';

initializeApp();

setGlobalOptions({
  timeoutSeconds: 60,
  memory: '512MiB',
  region: 'europe-central2',
  maxInstances: 10,
  ingressSettings: 'ALLOW_ALL',
  concurrency: 100,
  invoker: 'public',
  enforceAppCheck: true
});

firestore().settings({ ignoreUndefinedProperties: true });

function handleOnCall(cr: CallableRequest, functionHandlerPath: string) {
  return require(functionHandlerPath).handler(cr).catch(globalErrorHandler);
}

exports['invoice'] = {
  create: onCall((cr) => handleOnCall(cr, './endpoints/invoice/create')),
  delete: onCall((cr) => handleOnCall(cr, './endpoints/invoice/delete')),
  update: onCall((cr) => handleOnCall(cr, './endpoints/invoice/update')),
  'mark-as-paid': onCall((cr) => handleOnCall(cr, './endpoints/invoice/mark-as-paid')),
  'mark-as-pending': onCall((cr) => handleOnCall(cr, './endpoints/invoice/mark-as-pending')),
};
