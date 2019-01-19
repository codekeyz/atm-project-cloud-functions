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
