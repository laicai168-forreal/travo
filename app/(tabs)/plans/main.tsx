

import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { ActionButton } from '@/components/ActionButton';
import { Collapsible } from '@/components/Collapsible';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import t from '@/constants/Translations';
import { initiateTravelLocally, loadTravel } from '@/store/reducers/planReducer';
import { AppDispatch, RootState } from '@/store/store';
import { Travel } from '@/types/planTypes';
import { useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PlanMainScreen() {
    const router = useRouter();
    const language = useSelector((state: RootState) => state.settings.language);
    const { travels, loading } = useSelector((state: RootState) => state.planData);
    const dispatch = useDispatch<AppDispatch>();

    const handleViewTravel = useCallback((currentTravel: Travel) => {
        dispatch(loadTravel(currentTravel));
        router.push('/(tabs)/plans/result');
    }, []);

    const handleEditTravel = useCallback((currentTravel: Travel) => {
        dispatch(loadTravel(currentTravel));
        router.push('/(tabs)/plans/edit');
    }, []);

    useEffect(() => {
        dispatch(initiateTravelLocally());
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.topContainer}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText style={styles.titleText} type="defaultSemiBold">Travels</ThemedText>
                </ThemedView>
                <ThemedView>
                    {travels.length > 0 && travels.map(travel => (<Collapsible key={travel.id} title={`Travel created at ${(new Date(parseInt(travel.id))).toLocaleString()}`}>
                        <ActionButton title='View' onPress={() => handleViewTravel(travel)}></ActionButton>
                        <ActionButton title='Edit' onPress={() => handleEditTravel(travel)}></ActionButton>
                    </Collapsible>))}
                </ThemedView>
            </ScrollView>
            <ThemedView style={styles.stickyBottomContainer}>
                <ThemedView style={styles.bottomActionButtonWrapper}>
                    <ActionButton title={t.plan.addTravel[language]} onPress={() => router.push('/(tabs)/plans/edit')} />
                </ThemedView>
            </ThemedView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#ffffff'
    },
    topContainer: {
        flex: 1,
    },
    stickyBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        verticalAlign: 'middle',
        height: '10%',
        borderTopWidth: 1,
        borderColor: '#E6E6E6',
        paddingHorizontal: 10,
    },
    bottomActionButtonWrapper: {
        flex: 1,
        width: '33%',
        justifyContent: 'center',
        verticalAlign: 'middle',
        marginHorizontal: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 18,
    },
    stepContainer: {
        marginBottom: 8,
        padding: 0,
    },
    addDestinationButton: {
        textAlign: 'center',
        color: '#777',
        padding: 15,
        borderTopColor: '#E6E6E6',
        borderTopWidth: 1,
    },
    addDestinationButtonDisabled: {
        textAlign: 'center',
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
