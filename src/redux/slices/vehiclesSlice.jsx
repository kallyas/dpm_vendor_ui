import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { renewSession, getData } from '../actions/utils';

export const getVehicles = createAsyncThunk(
  'vehicles/getVehicles',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getData('/vehicles');
      return data.data;
    } catch (error) {
      const result = await renewSession(error);
      if (result.status !== 200) {
        return rejectWithValue(error);
      } else {
        const data = await getData('/vehicles');
        return data.data;
      }
    }
  }
);

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    data: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default vehiclesSlice.reducer;
