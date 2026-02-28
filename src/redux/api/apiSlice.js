import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURL = import.meta.env.VITE_APP_baseURL;

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseURL}/v1.0`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('DPMAccessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error && (result.error.status === 401 || result.error.data?.message === 'Token has expired')) {
    const refreshToken = localStorage.getItem('DPMRefreshToken');
    if (refreshToken) {
      try {
        const refreshResult = await baseQuery({
          url: '/token/refresh',
          method: 'POST',
          headers: { Authorization: `Bearer ${refreshToken}` },
        }, api, extraOptions);
        
        if (refreshResult.data) {
          localStorage.setItem('DPMAccessToken', refreshResult.data.access_token);
          result = await baseQuery(args, api, extraOptions);
        } else {
          localStorage.removeItem('DPMAccessToken');
          localStorage.removeItem('DPMRefreshToken');
        }
      } catch {
        localStorage.removeItem('DPMAccessToken');
        localStorage.removeItem('DPMRefreshToken');
      }
    }
  }
  
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Vehicles', 'Routes', 'Staff', 'Trips', 'Tickets', 'Transactions'],
  endpoints: (builder) => ({
    // Auth
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Vehicles
    getVehicles: builder.query({
      query: () => '/vehicles',
      providesTags: ['Vehicles'],
    }),
    addVehicle: builder.mutation({
      query: (vehicle) => ({
        url: '/vehicles',
        method: 'POST',
        body: vehicle,
      }),
      invalidatesTags: ['Vehicles'],
    }),
    updateVehicle: builder.mutation({
      query: ({ id, ...vehicle }) => ({
        url: `/vehicles/${id}`,
        method: 'PUT',
        body: vehicle,
      }),
      invalidatesTags: ['Vehicles'],
    }),
    
    // Routes
    getRoutes: builder.query({
      query: () => '/routes',
      providesTags: ['Routes'],
      transformResponse: (response) => {
        return response.data.map((entry) => ({
          ...entry,
          trips: entry.trips?.length || 0,
        }));
      },
    }),
    
    // Staff
    getStaff: builder.query({
      query: () => '/vendor/users',
      providesTags: ['Staff'],
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: '/vendor/users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Staff'],
    }),
    
    // Trips
    getTrips: builder.query({
      query: () => '/trips?page=1&limit=100',
      providesTags: ['Trips'],
      transformResponse: (response) => {
        return response.data.map((entry) => {
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
      },
    }),
    getSingleTrip: builder.query({
      query: (id) => `/route_trips/${id}`,
      providesTags: ['Trips'],
      transformResponse: (response) => {
        return response.data.map((entry) => {
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
      },
    }),
    
    // Tickets
    getTickets: builder.query({
      query: (id) => `/trip_tickets/${id}`,
      providesTags: ['Tickets'],
      transformResponse: (response) => {
        return response.data.map((entry) => {
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
      },
    }),
    
    // Transactions
    getTransactions: builder.query({
      query: () => '/mm_transactions',
      providesTags: ['Transactions'],
      transformResponse: (response) => {
        return response.data.map((transaction) => {
          const { amount, payee_number, payer_number, status, date_created } = transaction;
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
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetVehiclesQuery,
  useAddVehicleMutation,
  useUpdateVehicleMutation,
  useGetRoutesQuery,
  useGetStaffQuery,
  useAddUserMutation,
  useGetTripsQuery,
  useGetSingleTripQuery,
  useGetTicketsQuery,
  useGetTransactionsQuery,
} = api;
