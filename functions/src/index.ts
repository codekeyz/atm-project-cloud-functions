import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as subscriptionFunctions from './subcription/index';
import { activateATM } from './helpers';

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
    const bankID = snap.data().bank_id;
    const atmID = event.params.atmID;

    return subscriptionFunctions
      .updateATMCount(databaseInstance, bankID)
      .then(count => {
        return subscriptionFunctions.hasSubscription(
          databaseInstance,
          bankID,
          count
        );
      })
      .then(hasSub => {
        if (hasSub) {
          return activateATM(databaseInstance, atmID);
        } else {
          return false;
        }
      });
  });
