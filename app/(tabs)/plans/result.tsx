

import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { ActionButton } from '@/components/ActionButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import t from '@/constants/Translations';
import { AppDispatch, RootState } from '@/store/store';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';

export default function PlanResultScreen() {
    const router = useRouter();
    const isLoading = useSelector((state: RootState) => state.planData.loading);
    const currentPlan = useSelector((state: RootState) => state.planData.currentPlan);
    const language = useSelector((state: RootState) => state.settings.language);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.topContainer}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText style={styles.titleText} type="defaultSemiBold">Schedule</ThemedText>
                </ThemedView>
                <ThemedView>

                </ThemedView>
                {!isLoading && currentPlan.map((plan, index) => <ThemedView key={index}>
                    <ThemedView style={styles.row}>
                        <ThemedText style={styles.location}>{plan.destination}</ThemedText>
                    </ThemedView>
                    {plan.days.map((dayPlan, index) => <ThemedView key={index}>
                        <ThemedView style={styles.row}>
                            <ThemedText style={styles.date}>{dayPlan.date}</ThemedText>
                        </ThemedView>
                        {dayPlan.schedule.map((timePlan, index) => <ThemedView style={styles.timePlanContainer} key={index}>
                            <ThemedText style={styles.timeText}>{timePlan.time} at {timePlan.location}, {timePlan.action}.</ThemedText>
                            {/* image is not working */}
                            {/* <Image source={{ uri: timePlan.image }} placeholder={'Loading...'} style={{ height: 150, width: 150 }} /> */}
                        </ThemedView>)}
                    </ThemedView>)}
                </ThemedView>)}
            </ScrollView>
            <ThemedView style={styles.stickyBottomContainer}>
                <ActionButton title={t.plan.save[language]} onPress={() => router.push('/(tabs)/plans/main')} />
            </ThemedView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 8,
    },
    location: {
        fontSize: 19,
        fontWeight: 500,
    },
    container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#ffffff'
    },
    date: {
        fontWeight: 500,
    },
    timePlanContainer: {
        paddingVertical: 8,
        paddingLeft: 16
    },
    timeText: {
        fontSize: 15,
        color: '#444'
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
    //TODO: will move this to a shared component
    themedButton: {
        borderRadius: 6,
        backgroundColor: '#333',
        marginHorizontal: 40,
        padding: 15,
    },
    themedButtonText: {
        fontSize: 18,
        fontWeight: 700,
        color: '#eee',
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
