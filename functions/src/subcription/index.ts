import * as admin from 'firebase-admin';
import { getbankPackages } from '../helpers';
import { Package } from '../models/Package';

export async function hasSubscription(bankID: string) {
  let bankPackage: Package[] = [];
  await getbankPackages(bankID).then(data => {
    bankPackage = data.val();
  });
  if (bankPackage.length === 0) {
    return false;
  }
  bankPackage.forEach(pac => {
    if (!pac.isActivated || pac.hasExpired) {
      return false;
    }
  });
}
