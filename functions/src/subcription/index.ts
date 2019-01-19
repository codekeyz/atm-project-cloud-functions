import { getBankData, getATMCount } from '../helpers';
import * as admin from 'firebase-admin';

export async function updateAllowances(
  database: FirebaseFirestore.Firestore,
  bankId: string,
  newCanAddNumber: number
) {
  const bankData = await getBankData(database, bankId);
  const newCount = bankData.numberOFATMCanAdd + newCanAddNumber;
  const dataMap = {};
  dataMap['numberOFATMCanAdd'] = newCount;
  return database
    .collection('Banks')
    .doc(bankId)
    .update(dataMap);
}

export async function updateATMCount(
  database: FirebaseFirestore.Firestore,
  bankId: string
) {
  const count = await getATMCount(database, bankId);
  const dataMap = {};
  dataMap['numberOFATMs'] = count;
  await database
    .collection('Banks')
    .doc(bankId)
    .update(dataMap);
  return count;
}

export async function hasSubscription(
  database: FirebaseFirestore.Firestore,
  bankId: string,
  newATMCount: number
) {
  const bankData = await getBankData(database, bankId);
  const canAddNumber: number = bankData.numberOFATMCanAdd;
  if (newATMCount < canAddNumber) {
    return true;
  } else if (newATMCount === canAddNumber) {
    // Generate the payload
    const payload = {
      notification: {},
      data: {
        notificationType: 'BANK_SUBSCRIPTION',
        ownNerID: bankId,
        title: 'ATM Subscription',
        message:
          "You have exceeded the number of ATM's you can add. Buy a new package to add."
      }
    };
    await admin.messaging().sendToTopic('Banks', payload);
    return true;
  } else {
    return false;
  }
}
