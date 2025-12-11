import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index';

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
      immutableCheck: true,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

