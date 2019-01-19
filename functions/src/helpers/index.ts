export async function getBankData(
  database: FirebaseFirestore.Firestore,
  bankId: string
) {
  const bankData = await database
    .collection('Banks')
    .doc(bankId)
    .get();
  return bankData.data();
}

export async function getATMCount(
  database: FirebaseFirestore.Firestore,
  bankId: string
) {
  const atms = await database
    .collection('ATMS')
    .where('bank_id', '==', bankId)
    .get();
  return atms.size;
}
