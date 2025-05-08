import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoCurrency } from '../types';

interface CryptoState {
  currencies: CryptoCurrency[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  currencies: [],
  loading: true,
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCurrencies: (state, action: PayloadAction<CryptoCurrency[]>) => {
      state.currencies = action.payload;
      state.loading = false;
    },
    updatePrice: (
      state,
      action: PayloadAction<{ currency: string; price: string }>
    ) => {
      const index = state.currencies.findIndex(
        (c) => c.currency === action.payload.currency
      );
      if (index !== -1) {
        state.currencies[index].price = action.payload.price;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { setCurrencies, updatePrice, setError, setLoading } =
  cryptoSlice.actions;
export default cryptoSlice.reducer;
