import { mockPlans } from "@/constants/Mock";
import { DestinationPlan } from "@/types/planTypes";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import OpenAI from 'openai';

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
    currentPlan: DestinationPlan[];
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

const templateJson = [{
    'destination': 'one_of_the_destination',
    'days': [{
        'date': '2025-08-25',
        'schedule': [{
            'time': 'for example: 7:00AM - 9:45AM',
            'location': 'your_location',
            'action': 'your_suggested_action',
            'image': 'a_loadable_cover_image_uri_of_this_place'
        },
        {
            'time': 'your_time',
            'location': 'your_location',
            'action': 'your_suggested_action',
            'image': 'a_loadable_cover_image_uri_of_this_place'
        }]
    },
    {
        'date': '2025-08-26',
        'schedule': [{
            'time': 'your_time',
            'location': 'your_location',
            'action': 'your_suggested_action',
            'image': 'a_loadable_cover_image_uri_of_this_place'
        }]
    }]
},
{
    'destination': 'other_destination',
    'days': [{
        'date': '2025-08-27',
        'schedule': [{
            'time': 'your_time',
            'location': 'your_location',
            'action': 'your_suggested_action',
            'image': 'a_loadable_cover_image_uri_of_this_place'
        }]
    }]
}];

const parsePlanRequest = (request: PlanRequestItem[]): string => {
    return request.reduce((acc, planItem) => {
        return acc + `${planItem.destination} from ${planItem.startTime} to ${planItem.endTime}, `;
    }, '');
}

// TODO will be moving this to backend,
// Backend will be using AWS gateway and proper lambda function to run these queries and return the JSON response
const getPlanFromAI = async (request: PlanRequestItem[]) => {
    if (request.length > 0) {
        try {
            const response = await client.responses.create({
                model: "gpt-4.1-nano",
                input: `Can you make a travel schedule for the following destination and dates provided, here are them ${parsePlanRequest(request)}.
                We can take it easy. I don't have to visit many places. I don't want to feel too tired after all. Only give me the result in JSON format, I want to use 
                the JSON.parse() to the result directly. Use this template "${JSON.stringify(templateJson)}" for the result.
                For the image of each schedule item, I want it be the first google image result of that location `
            });
            const plans = JSON.parse(response.output_text.replace('```json', '').replace('```', ''));
            console.log(response.output_text);
            const usablePlans: DestinationPlan[] = plans.map((des: any): DestinationPlan => ({
                destination: des.destination,
                days: des.days ? des.days.map((day: any) => ({
                    date: day.date,
                    schedule: day.schedule ? day.schedule.map((sch: any) => ({
                        time: sch.time,
                        location: sch.locaction,
                        action: sch.action,
                        image: sch.image
                    })) : []
                })) : []
            }));

            return usablePlans;
        } catch (err) {
            throw err;
        }
    } else {
        throw 'no destination';
    }
}

//TODO: Will remove this later
const getPlanFromAIMock = async (request: PlanRequestItem[]) => {
    const apiRequest = (): Promise<DestinationPlan[]> => {
        return new Promise((resolve) => {
            setTimeout(() => { resolve(mockPlans) }, 2000);
        });

    }
    if (request.length > 0) {
        const result: DestinationPlan[] = await apiRequest();
        return result;
    } else {
        throw 'no destination';
    }
}

export const getPlanV1 = createAsyncThunk('plan/getPlanV1', async (request: PlanRequestItem[]) => {
    // const result = await getPlanFromAI(request);
    const result = await getPlanFromAIMock(request);
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

const removeDestinationAction = (state: PlanData, action: PayloadAction<string>) => {
    state.planRequest = [...state.planRequest.filter(req => req.key !== action.payload)];
}

const getPlanV1Builder = (builder: ActionReducerMapBuilder<PlanData>) => {
    return builder
        .addCase(getPlanV1.pending, state => {
            state.loading = true;
            state.error = undefined;
        })
        .addCase(getPlanV1.fulfilled, (state, action: PayloadAction<DestinationPlan[]>) => {
            state.loading = false;
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
        updateDestination: updateDestinationAction,
        removeDestination: removeDestinationAction,
    },
    extraReducers: builder => {
        getPlanV1Builder(builder);
    }
});

const planDataReducer = planDataSlice.reducer;

export const {
    initiatePlanData,
    addEmptyDestination,
    updateDestination,
    removeDestination
} = planDataSlice.actions;
export default planDataReducer;
