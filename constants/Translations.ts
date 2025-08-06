import { LAN } from "@/store/reducers/settingsReducer";

type AvailableLan = {
    [key in LAN]: string;
}
interface TranslationRef {
    plan: {
        getAPlan: AvailableLan,
    };
}

const t: TranslationRef = {
    plan: {
        getAPlan: {
            [LAN.EN]: 'Get a Plan',
            [LAN.CN]: '点击获取攻略',
        }
    }
}

export default t;