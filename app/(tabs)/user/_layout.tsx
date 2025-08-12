import { Stack } from 'expo-router';
import React from 'react';

export default function UserStack() {
    return (
        <Stack>
            <Stack.Screen name="main" options={{ headerShown: false }} />
        </Stack>
    );
}