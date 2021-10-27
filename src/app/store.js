import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usStatesReducer from '../features/states/usStatesSlice';
import casesReducer from '../features/cases/casesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    usStates: usStatesReducer,
    cases: casesReducer,
  },
});
