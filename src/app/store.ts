import {
  configureStore,
  combineReducers,
  Action,
  ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { reducer as ProviderReducer } from 'src/features/Provider';
import { themeReducer } from 'src/services/theme';

const makeStore = () =>
  configureStore({
    reducer: {
      services: combineReducers({ theme: themeReducer }),
      features: combineReducers({ Provider: ProviderReducer }),
    },
    devTools: true,
  });

type AppStore = ReturnType<typeof makeStore>;

type AppDispatch = AppStore['dispatch'];

type AppState = ReturnType<AppStore['getState']>;

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

const wrapper = createWrapper<AppStore>(makeStore);

export type { AppStore, AppDispatch, AppState, AppThunk };

export { wrapper, makeStore };
