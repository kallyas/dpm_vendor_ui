import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { renewSession, getData } from '../actions/utils';

const processTransactions = (data) => {
  return data.map((transaction) => {
    const {
      amount,
      payee_number,
      payer_number,
      status,
      date_created,
    } = transaction;
    const [date, time] = date_created.split('T');
    const bookedTime = time.split('.')[0];
    return {
      date,
      bookedTime,
      amount,
      payee_number,
      payer_number,
      status,
      date_created,
    };
  });
};

export const getTransactions = createAsyncThunk(
  'transactions/getTransactions',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getData('/mm_transactions');
      return processTransactions(data.data);
    } catch (error) {
      const result = await renewSession(error);
      if (result.status !== 200) {
        return rejectWithValue(error);
      } else {
        const data = await getData('/mm_transactions');
        return processTransactions(data.data);
      }
    }
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    data: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
