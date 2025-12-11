import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { renewSession, getData } from '../actions/utils';

const processData = (data) => {
  return data.map((entry) => {
    const {
      id,
      route: { destination, start_point },
      setoff_time,
      vehicle: { number_plate, capacity },
      tp_fare,
      vehicle_id,
      route_id,
    } = entry;
    const [date, time] = setoff_time.split('T');
    return {
      id,
      destination,
      start_point,
      number_plate,
      tp_fare,
      date,
      time,
      setoff_time,
      vehicle_id,
      route_id,
      capacity,
    };
  });
};

export const getTrips = createAsyncThunk(
  'trips/getTrips',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getData('/trips?page=1&limit=100');
      return processData(data.data);
    } catch (error) {
      const result = await renewSession(error);
      if (result.status !== 200) {
        return rejectWithValue(error);
      } else {
        const data = await getData('/trips?page=1&limit=100');
        return processData(data.data);
      }
    }
  }
);

export const getSingleTrip = createAsyncThunk(
  'trips/getSingleTrip',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getData(`/route_trips/${id}`);
      return processData(data.data);
    } catch (error) {
      const result = await renewSession(error);
      if (result.status !== 200) {
        return rejectWithValue(error);
      } else {
        const data = await getData(`/route_trips/${id}`);
        return processData(data.data);
      }
    }
  }
);

const tripsSlice = createSlice({
  name: 'trips',
  initialState: {
    data: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleTrip.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getSingleTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tripsSlice.reducer;
