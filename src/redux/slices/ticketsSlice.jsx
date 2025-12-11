import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { renewSession, getData } from '../actions/utils';

const processTickets = (data) => {
  return data.map((entry) => {
    const {
      id,
      ticket_capacity,
      status_id,
      ticket_number,
      ticket_request_id,
      date_created,
      phone_number,
      start_point,
      destination,
      status_name,
    } = entry;
    const [date, time] = date_created.split('T');
    const bookedTime = time.split('.')[0];
    return {
      id,
      ticket_capacity,
      status_id,
      ticket_number,
      ticket_request_id,
      date,
      time,
      bookedTime,
      phone_number,
      start_point,
      destination,
      status_name,
    };
  });
};

export const getTickets = createAsyncThunk(
  'tickets/getTickets',
  async (id, { rejectWithValue }) => {
    try {
      const data = await getData(`/trip_tickets/${id}`);
      return processTickets(data.data);
    } catch (error) {
      const result = await renewSession(error);
      if (result.status !== 200) {
        return rejectWithValue(error);
      } else {
        const data = await getData(`/trip_tickets/${id}`);
        return processTickets(data.data);
      }
    }
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    data: null,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ticketsSlice.reducer;
