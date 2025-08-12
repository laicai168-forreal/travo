export interface TimePlan {
    time: string;
    location: string;
    action: string;
    image: string;
}

export interface DayPlan {
    date: string;
    schedule: TimePlan[];
}

export interface DestinationPlan {
    destination: string;
    days: DayPlan[];
}
