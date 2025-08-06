import { LAN } from "@/store/reducers/settingsReducer";

type AvailableLan = {
    [key in LAN]: string;
}
interface TranslationRef {
    plan: Record<string, AvailableLan>;
}

const t: TranslationRef = {
    plan: {
        addTravel: {
            [LAN.EN]: 'Add a Travel',
            [LAN.CN]: '新的行程',
        },
        getAPlan: {
            [LAN.EN]: 'Get a Plan',
            [LAN.CN]: '点击获取攻略',
        },
        save: {
            [LAN.EN]: 'Save',
            [LAN.CN]: '保存行程',
        }
    }
}

export default t;