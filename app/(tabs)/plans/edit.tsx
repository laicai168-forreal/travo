

import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { CollapsibleDestination } from '@/components/CollapsibleDestination';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import t from '@/constants/Translations';
import { addEmptyDestination, getPlanV1, PlanRequestItem, updateDestination } from '@/store/reducers/planReducer';
import { AppDispatch, RootState } from '@/store/store';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PlanEditScreen() {
    const currentPlan = useSelector((state: RootState) => state.planData.currentPlan);
    const isLoading = useSelector((state: RootState) => state.planData.loading);
    const language = useSelector((state: RootState) => state.settings.language);
    const planRequest = useSelector((state: RootState) => state.planData.planRequest);

    const handleDestinationConfirmation = useCallback((editingPlanItem: PlanRequestItem) => {
        console.log('here', editingPlanItem);
        dispatch(updateDestination({ ...editingPlanItem }))
    }, [])
    const dispatch = useDispatch<AppDispatch>();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.topContainer}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText style={styles.titleText} type="defaultSemiBold">PLAN YOUR TRAVEL</ThemedText>
                </ThemedView>
                <ThemedView style={styles.stepContainer}>
                    {planRequest.map((planReq, index) => <ThemedText key={index}>
                        <CollapsibleDestination
                            planRequestItem={planReq}
                            title={planReq.destination ? planReq.destination : 'EDIT DESTINATION'}
                            showConfirmButton={true}
                            isOpenDefault={true}
                            confirmButtonTitle='Confirm Destination'
                            // onExpand={() => setEditingPlanItem(planReq)}
                            onConfirm={handleDestinationConfirmation}>
                        </CollapsibleDestination>
                    </ThemedText>)}
                    <ThemedText style={styles.addDestinationButton} onPress={() => dispatch(addEmptyDestination())}>+ ADD A DESTINATION</ThemedText>
                    {/* <ThemedText type="subtitle">Plans</ThemedText>
                    {isLoading && <ThemedText>Loading...</ThemedText>}
                    {!isLoading && currentPlan.map((plan, index) => <ThemedText key={index}>
                        <ThemedText>Location {plan.destination}</ThemedText>
                        {plan.days.map((dayPlan, index) => <ThemedText key={index}>
                            <ThemedText>{dayPlan.date}</ThemedText>
                            {dayPlan.schedule.map((timePlan, index) => <ThemedText key={index}>
                                {timePlan.time} at {timePlan.location}, {timePlan.action}.
                                <Image source={{uri: timePlan.image}} placeholder={'Loading...'} style={{height: 150, width: 150}}/>
                            </ThemedText>)}
                        </ThemedText>)}
                    </ThemedText>)} */}
                </ThemedView>
            </ScrollView>

            <ThemedView style={styles.stickyBottomContainer} >
                <TouchableOpacity style={styles.themedButton} disabled={isLoading} onPress={() => dispatch(getPlanV1(planRequest))}>
                    <ThemedText style={styles.themedButtonText}>
                        {t.plan.getAPlan[language]}
                    </ThemedText>
                </TouchableOpacity>
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
