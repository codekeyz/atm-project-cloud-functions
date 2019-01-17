import { databaseInstance } from '../index';
import { DatabaseRefs } from '../constants';

export function getbankPackages(bankId: string) {
  return databaseInstance
    .ref(bankId)
    .child(DatabaseRefs.bank_packages)
    .once('value');
}

export async function updateBankATMCount(bankId: string) {
  return await getbankATMCount(bankId).then(number => {
    return databaseInstance
      .ref(bankId)
      .child(DatabaseRefs.bank_atmcount)
      .set(number + 1);
  });
}

export async function activateATMStatus(atmId: string) {
  return await databaseInstance
    .ref(DatabaseRefs.atms)
    .child(atmId)
    .child(DatabaseRefs.atm_enabled)
    .set(true);
}

export async function updateBankATMAddStatus(bankId: string) {
  return await databaseInstance
    .ref(DatabaseRefs.banks)
    .child(bankId)
    .child(DatabaseRefs.banK_can_add_atm)
    .set(false);
}

export async function updateBankBroadCastSendStatus(bankId: string) {
  return await databaseInstance
    .ref(DatabaseRefs.banks)
    .child(bankId)
    .child(DatabaseRefs.banK_can_broadcast)
    .set(false);
}

export async function getbankATMCount(bankId: string) {
  return await databaseInstance
    .ref(DatabaseRefs.atms)
    .orderByChild('bank_id')
    .equalTo(bankId)
    .once('value')
    .then(results => {
      return results.numChildren();
    })
    .catch(er => {
      return 0;
    });
}

export async function getbankBroadCasts(bankId: string) {
  return await databaseInstance
    .ref(DatabaseRefs.broadcasts)
    .orderByChild('bank_id')
    .equalTo(bankId)
    .once('value');
}
