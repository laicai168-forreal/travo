import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import React from 'react';

export default function UserStack() {
    const colorScheme = useColorScheme();

    return (
        <Stack>
            <Stack.Screen name="main" options={{ headerShown: false }} />
        </Stack>
    );
}