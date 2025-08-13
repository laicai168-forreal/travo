

import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { ActionButton } from '@/components/ActionButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import t from '@/constants/Translations';
import { AppDispatch, RootState } from '@/store/store';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';

export default function PlanMainScreen() {
    const router = useRouter();
    const isLoading = useSelector((state: RootState) => state.planData.loading);
    const language = useSelector((state: RootState) => state.settings.language);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.topContainer}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText style={styles.titleText} type="defaultSemiBold">Travels</ThemedText>
                </ThemedView>
            </ScrollView>
            <ThemedView style={styles.stickyBottomContainer}>
                <ActionButton title={t.plan.addTravel[language]} onPress={() => router.push('/(tabs)/plans/edit')} />
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
        flexDirection: 'column',
        justifyContent: 'center',
        verticalAlign: 'middle',
        height: '10%',
        borderTopWidth: 1,
        borderColor: '#E6E6E6',
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
