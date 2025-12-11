import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { renewSession, getData } from '../actions/utils';

export const getRoutes = createAsyncThunk(
  'routes/getRoutes',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getData('/routes');
      const mappedData = data.data.map(entry => {
        entry.trips = entry.trips.length;
        return entry;
      });
      return mappedData;
    } catch (error) {
      const result = await renewSession(error);
      if (result.status !== 200) {
        return rejectWithValue(error);
      } else {
        const data = await getData('/routes');
        const mappedData = data.data.map(entry => {
          entry.trips = entry.trips.length;
          return entry;
        });
        return mappedData;
      }
    }
  }
);

const routesSlice = createSlice({
  name: 'routes',
  initialState: {
    data: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoutes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoutes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRoutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default routesSlice.reducer;
