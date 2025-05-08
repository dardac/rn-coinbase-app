import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPrices } from '../services/coinbaseApi';
import { setCurrencies, setError } from './currencySlice';

export const getInitialPrices = createAsyncThunk(
  'crypto/fetchInitialPrices',
  async (_, { dispatch }) => {
    try {
      const prices = await getPrices();
      dispatch(setCurrencies(prices));
    } catch (error) {
      dispatch(setError('Error fetching initial prices'));
    }
  }
);
