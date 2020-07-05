import { Dispatch } from '../index';
import { createAction } from '@reduxjs/toolkit';
import { safeAwait } from '@blockstack/ui';
import { Transaction } from '@blockstack/stacks-blockchain-sidecar-types';

import { Api } from '../../api/get-account-details';

export const fetchTransactions = createAction('transactions/fetch-transactions');
export const fetchTransactionsDone = createAction<Transaction[]>(
  'transactions/fetch-transactions-done'
);
export const fetchTransactionsFail = createAction('transactions/fetch-transactions-fail');

export function getAddressTransactions(address: string) {
  return async (dispatch: Dispatch) => {
    dispatch(fetchTransactions());
    const [error, response] = await safeAwait(Api.getAddressTransactions(address));
    if (error) {
      dispatch(fetchTransactionsFail());
      return;
    }
    if (response) {
      const transactions = response.data.results;
      dispatch(fetchTransactionsDone(transactions));
    }
  };
}
