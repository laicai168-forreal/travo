import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Settings {
    language: LAN;
}

export enum LAN {
    EN = 'English',
    CN = '中文',
}

const defaultInitialState: Settings = {
    language: LAN.EN,
}

export const iniitateSettings = createAsyncThunk('settings/initiate', async () => {
    const storedSettingsHistory: string | null = await AsyncStorage.getItem('@travoSettings');
    if (!storedSettingsHistory) {
        return defaultInitialState;
    }
    const storedSettings: Settings = JSON.parse(storedSettingsHistory);
    return storedSettings ? storedSettings : defaultInitialState;
})

//Actions
const initiateSettingsBuilder = (builder: ActionReducerMapBuilder<Settings>) => {
    return builder
        .addCase(iniitateSettings.fulfilled, (state, action: PayloadAction<Settings>) => action.payload)
}

const chooseLanguageAction = (state: Settings, action: PayloadAction<LAN>) => {
    // need to implement this part later to fetch history data
    state.language = action.payload;
    AsyncStorage.setItem('@travoSettings', JSON.stringify(state));
}

//Slice
const settingsSlice = createSlice({
    name: 'settings',
    initialState: defaultInitialState,
    reducers: {
        chooseLanguage: chooseLanguageAction,
    },
    extraReducers: builder => {
        initiateSettingsBuilder(builder);
    }
});

const settingsReducer = settingsSlice.reducer;

export const { chooseLanguage } = settingsSlice.actions;
export default settingsReducer;

