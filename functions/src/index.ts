import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as subscriptionFunctions from './subcription/index';

admin.initializeApp(functions.config().firebase);

const databaseInstance = admin.firestore();

export const newSubscription = functions.firestore
  .document('Banks/{bankID}/packages/{packageID}')
  .onCreate((snap, event) => {
    const newCanAddNumber: number = snap.data().numberOfATMS || 0;
    return subscriptionFunctions.updateAllowances(
      databaseInstance,
      event.params.bankID,
      newCanAddNumber
    );
  });

export const newATMCheck = functions.firestore
  .document('ATMS/{atmID}')
  .onCreate((snap, event) => {
    return subscriptionFunctions.updateATMCount(
      databaseInstance,
      snap.data().bank_id
    );
  });
