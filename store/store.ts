import { configureStore } from '@reduxjs/toolkit';
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';
import planDataReducer from './reducers/planReducer';
import settingsReducer from './reducers/settingsReducer';

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        planData: planDataReducer,
    },
    devTools: false,
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
