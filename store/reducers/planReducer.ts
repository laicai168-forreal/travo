import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import OpenAI from 'openai';


interface Plan {
    time: string | undefined;
    location: string | undefined;
    action: string | undefined;
    transportation: string | undefined;
}

export interface PlanRequestItem {
    key: string;
    destination: string;
    startTime: string;
    endTime: string;
}

export class PlanRequestEntity implements PlanRequestItem {
    key: string = '';
    destination: string = '';
    startTime: string = '';
    endTime: string = '';
}

interface PlanData {
    currentPlan: Plan[];
    loading: boolean;
    error: string | undefined;
    planRequest: PlanRequestItem[];
}

const initialState: PlanData = {
    currentPlan: [],
    loading: false,
    error: undefined,
    planRequest: [],
}

const client = new OpenAI({
    apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
})

// TODO will be moving this to backend,
// Backend will be using AWS gateway and proper lambda function to run these queries and return the JSON response
const getPlanFromAI = async (destination: string) => {
    if (destination) {
        try {
            const response = await client.responses.create({
                model: "gpt-4.1-nano",
                input: `Can you make a schedule for a day visit of ${destination}, and also provide details of the public transportation in between. We can take 
                it easy. I don't have to visit many places. Only give me the result in JSON format, I want to use the JSON.parse() to the result directly, each 
                day will be an item in the final array and each item has at least time, location and time to spend and add a translation in Chinese for necessary 
                property, use JSON template like this for each entry of the array 
                {'time': 'your_time', 'location': 'your_location', 'action': 'your_suggested_action', 'transportation': 'your_transportation'}`
            });
            const plans = JSON.parse(response.output_text.replace('```json', '').replace('```', ''));
            const usablePlans: Plan[] = plans.map((plan: any): Plan => ({
                time: plan?.time,
                location: plan?.location,
                action: plan?.action,
                transportation: plan?.transportation,
            }));
            return usablePlans;
        } catch (err) {
            throw err;
        }
    } else {
        throw 'no destination';
    }


}

export const getPlanV1 = createAsyncThunk('plan/getPlanV1', async (destination: string) => {
    const result = await getPlanFromAI(destination);
    console.log('test', result);
    return result;
})

//Actions
const addEmptyDestinationAction = (state: PlanData) => {
    if (!state.planRequest.length || state.planRequest[state.planRequest.length - 1].destination) {
        const newEmptyDestination = new PlanRequestEntity();
        state.planRequest = [...state.planRequest, { ...newEmptyDestination, key: Date.now().toString() }];
    } else {
        // alert need to add destination name for the editing one before adding new destination
    }
}

const updateDestinationAction = (state: PlanData, action: PayloadAction<PlanRequestItem>) => {
    const targetIndex = state.planRequest.findIndex(item => item.key === action.payload.key);
    if (targetIndex > -1) {
        const newRequests = [...state.planRequest];
        newRequests[targetIndex] = action.payload;
        state.planRequest = newRequests;
    }
}

const initiatePlanDataAction = (state: PlanData) => {
    // need to implement this part later to fetch history data
    state.currentPlan = [];
}

const getPlanV1Builder = (builder: ActionReducerMapBuilder<PlanData>) => {
    return builder
        .addCase(getPlanV1.pending, state => {
            state.loading = true;
            state.error = undefined;
        })
        .addCase(getPlanV1.fulfilled, (state, action: PayloadAction<Plan[]>) => {
            state.loading = false;
            console.log(action.payload);
            state.currentPlan = action.payload;
        })
        .addCase(getPlanV1.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
}

//Slice
const planDataSlice = createSlice({
    name: 'planData',
    initialState,
    reducers: {
        initiatePlanData: initiatePlanDataAction,
        addEmptyDestination: addEmptyDestinationAction,
        updateDestination: updateDestinationAction
    },
    extraReducers: builder => {
        getPlanV1Builder(builder);
    }
});

const planDataReducer = planDataSlice.reducer;

export const {
    initiatePlanData,
    addEmptyDestination,
    updateDestination
} = planDataSlice.actions;
export default planDataReducer;

