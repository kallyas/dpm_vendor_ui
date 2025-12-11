import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { renewSession, getData } from '../actions/utils';

export const getStaff = createAsyncThunk(
  'staff/getStaff',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getData('/vendor/users');
      return data.data;
    } catch (error) {
      const result = await renewSession(error);
      if (result.status !== 200) {
        return rejectWithValue(error);
      } else {
        const data = await getData('/vendor/users');
        return data.data;
      }
    }
  }
);

const staffSlice = createSlice({
  name: 'staff',
  initialState: {
    data: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default staffSlice.reducer;
