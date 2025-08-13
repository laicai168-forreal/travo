import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export type PlanStacks = {
    main: undefined;
    edit: undefined;
}

export default function PlanLayout() {
    return (
        <>
            <Stack>
                <Stack.Screen name="main" options={{ headerShown: false }} />
                <Stack.Screen name="edit" options={{ headerShown: false }} />
                <Stack.Screen name="result" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
        </>
    );
}
