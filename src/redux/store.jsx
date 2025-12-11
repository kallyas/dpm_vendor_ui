import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import vehiclesReducer from './slices/vehiclesSlice';
import routesReducer from './slices/routesSlice';
import tripsReducer from './slices/tripsSlice';
import staffReducer from './slices/staffSlice';
import ticketsReducer from './slices/ticketsSlice';
import transactionsReducer from './slices/transactionsSlice';

export default configureStore({
  reducer: {
    loginReducer: authReducer,
    vehicles: vehiclesReducer,
    routes: routesReducer,
    trips: tripsReducer,
    staff: staffReducer,
    tickets: ticketsReducer,
    transactions: transactionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
      immutableCheck: true,
    }),
  devTools: import.meta.env.MODE !== 'production',
});

