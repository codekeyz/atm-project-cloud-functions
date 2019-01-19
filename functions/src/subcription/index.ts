import { getBankData, getATMCount } from '../helpers';

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
  return database
    .collection('Banks')
    .doc(bankId)
    .update(dataMap);
}
