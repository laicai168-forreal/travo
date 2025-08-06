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

export interface PlanData {
    currentPlan: DestinationPlan[];
    loading: boolean;
    error: string | undefined;
    planRequest: PlanRequestItem[];
    travels: Travel[];
}

export interface TimePlan {
    time: string;
    location: string;
    action: string;
    image: string;
    coordinates: {
        N: string,
        E: string,
    }
}

export interface DayPlan {
    date: string;
    schedule: TimePlan[];
}

export interface DestinationPlan {
    destination: string;
    days: DayPlan[];
}

export interface Travel {
    id: string;
    result: DestinationPlan[];
    request: PlanRequestItem[];
}
