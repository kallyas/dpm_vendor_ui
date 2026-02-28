import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/apiSlice';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [api.util.matchFulfilled, api.util.matchPending],
      },
      immutableCheck: true,
    }).concat(api.middleware),
  devTools: import.meta.env.MODE !== 'production',
});
