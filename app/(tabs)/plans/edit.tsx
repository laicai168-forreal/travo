

import { SafeAreaView, StyleSheet } from 'react-native';

import { ActionButton } from '@/components/ActionButton';
import { CollapsibleDestination } from '@/components/CollapsibleDestination';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import t from '@/constants/Translations';
import { addEmptyDestination, getPlanV1, removeDestination, updateDestination } from '@/store/reducers/planReducer';
import { AppDispatch, RootState } from '@/store/store';
import { PlanRequestItem } from '@/types/planTypes';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PlanEditScreen() {
    const router = useRouter();
    const isLoading = useSelector((state: RootState) => state.planData.loading);
    const language = useSelector((state: RootState) => state.settings.language);
    const planRequest = useSelector((state: RootState) => state.planData.planRequest);

    const handleDestinationConfirmation = useCallback((editingPlanItem: PlanRequestItem) => {
        dispatch(updateDestination({ ...editingPlanItem }))
    }, [])

    const handleGetPlanButtonPress = useCallback(() => {
        dispatch(getPlanV1(planRequest))
            .then(() => router.push('/(tabs)/plans/result'))
    }, [planRequest])

    const dispatch = useDispatch<AppDispatch>();

    return (
        <SafeAreaView style={styles.container}>
            {isLoading && <LoadingIndicator />}
            <ThemedView style={styles.topContainer}>
                <ThemedView style={styles.titleContainer}>
                    {/* <ActionButton title={'Back'} onPress={() => router.back()} /> */}
                    <ThemedText style={styles.titleText} type="defaultSemiBold">Plan your travel</ThemedText>
                </ThemedView>
                <ThemedView style={styles.stepContainer}>
                    {planRequest.map((planReq, index) => <ThemedText key={index}>
                        <CollapsibleDestination
                            planRequestItem={planReq}
                            title={planReq.destination ? planReq.destination : 'Edit Destination'}
                            showConfirmButton={true}
                            isOpenDefault={true}
                            confirmButtonTitle='Confirm Destination'
                            onRemove={() => dispatch(removeDestination(planReq.key))}
                            onConfirm={handleDestinationConfirmation}>
                        </CollapsibleDestination>
                    </ThemedText>)}
                    <ThemedText style={styles.addDestinationButton} onPress={() => dispatch(addEmptyDestination())}>+ ADD A DESTINATION</ThemedText>
                </ThemedView>
            </ThemedView>
            <ThemedView style={styles.stickyBottomContainer} >
                <ThemedView style={styles.bottomActionButtonWrapper}>
                    <ActionButton title={t.plan.getAPlan[language]} onPress={handleGetPlanButtonPress} />
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
});
