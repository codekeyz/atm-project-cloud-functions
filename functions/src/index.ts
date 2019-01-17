import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { hasSubscription } from './subcription/index';
import { DatabaseRefs } from './constants';
import { updateBankATMCount, activateATMStatus } from './helpers';

admin.initializeApp(functions.config().firebase);

export const databaseInstance = admin.database();

export const newATMCheckSubscription = functions.database
  .ref(DatabaseRefs.atms)
  .onCreate((snap, event) => {
    return updateBankATMCount(event.auth.uid)
      .then(() => {
        return hasSubscription(event.auth.uid);
      })
      .then(hassub => {
        if (hassub === true) {
          return activateATMStatus(snap.key);
        } else {
          return console.log(
            event.auth.uid + " haven't subscribed to any packge."
          );
        }
      });
  });
