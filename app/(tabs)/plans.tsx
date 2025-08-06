

import { Image } from 'expo-image';
import { Button, StyleSheet, TextInput } from 'react-native';

import { CollapsibleDestination } from '@/components/CollapsibleDestination';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import t from '@/constants/Translations';
import { addEmptyDestination, getPlanV1, PlanRequestItem, updateDestination } from '@/store/reducers/planReducer';
import { AppDispatch, RootState } from '@/store/store';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function PlanScreen() {
    const [destination, setDestination] = useState("paris");
    const currentPlan = useSelector((state: RootState) => state.planData.currentPlan);
    const isLoading = useSelector((state: RootState) => state.planData.loading);
    const language = useSelector((state: RootState) => state.settings.language);
    const planRequest = useSelector((state: RootState) => state.planData.planRequest);
    // const [editingPlanItem, setEditingPlanItem] = useState({ ... new PlanRequestEntity() })
    // const editingPlanItemRef = useRef(editingPlanItem);
    // useEffect(() => {
    //     editingPlanItemRef.current = editingPlanItem; // Update the ref whenever 'data' changes
    // }, [editingPlanItem]);
    // const handleDestinationConfirmation = useCallback((key: string) => {
    //     console.log(editingPlanItemRef.current);
    //     dispatch(updateDestination({ ...editingPlanItemRef.current, key }))
    // }, [])
    const handleDestinationConfirmation = useCallback((editingPlanItem: PlanRequestItem) => {
        console.log('here', editingPlanItem);
        dispatch(updateDestination({ ...editingPlanItem }))
    }, [])
    const dispatch = useDispatch<AppDispatch>();
    const mapApiKey = 'AIzaSyAjgkwwB9cePdzeUymvZTfpA2WBMU5NrVk';

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }
            style={{ paddingLeft: 0, paddingRight: 0 }}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Plan Yor Travel</ThemedText>
                <HelloWave />
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText>What's your destination</ThemedText>
                {planRequest.map((planReq, index) => <ThemedText key={index}>
                    {/* <CollapsibleDestination 
                        editingPlanItem={editingPlanItem}
                        title={planReq.destination ? planReq.destination : 'Edit Destination'}
                        showConfirmButton={true}
                        confirmButtonTitle='Confirm Destination'
                        onExpand={() => setEditingPlanItem(planReq)}
                        onConfirm={() => handleDestinationConfirmation(planReq.key)}>
                        <ThemedView style={styles.row}>
                            <ThemedText type="defaultSemiBold">DESTINATION: </ThemedText>
                            <ThemedText>
                                {planReq?.destination}{planReq?.key}
                                <ThemedTextInput
                                    placeholder='add a destination'
                                    value={editingPlanItem.destination}
                                    onChangeText={des => setEditingPlanItem({ ...editingPlanItem, destination: des})}
                                />
                            </ThemedText>
                        </ThemedView>
                        <ThemedView style={styles.row}>
                            <ThemedText type="defaultSemiBold">TIME: </ThemedText>
                            <ThemedText>FROM:</ThemedText>
                            <ThemedText>
                                <ThemedTextInput
                                    placeholder='starting time'
                                    value={planReq.startTime}
                                />
                            </ThemedText>
                            <ThemedText>TO:</ThemedText>
                            <ThemedText>
                                <ThemedTextInput
                                    placeholder='ending time'
                                    value={planReq.endTime} />
                            </ThemedText>
                        </ThemedView>
                    </CollapsibleDestination> */}
                    <CollapsibleDestination
                        planRequestItem={planReq}
                        title={planReq.destination ? planReq.destination : 'Edit Destination'}
                        showConfirmButton={true}
                        confirmButtonTitle='Confirm Destination'
                        // onExpand={() => setEditingPlanItem(planReq)}
                        onConfirm={handleDestinationConfirmation}>

                    </CollapsibleDestination>
                </ThemedText>)}
                <Button title='Add a Destination' onPress={() => dispatch(addEmptyDestination())} />
                <TextInput
                    value={destination}
                    placeholder="For example: Paris"
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={des => setDestination(des)}></TextInput>
                <Button title={t.plan.getAPlan[language]} disabled={isLoading} onPress={() => dispatch(getPlanV1(destination))} />
                <ThemedText type="subtitle">Plans</ThemedText>
                {isLoading && <ThemedText>Loading...</ThemedText>}
                {!isLoading && currentPlan.map((plan, index) => <ThemedText key={index}>
                    <ThemedText>TIME: {plan.time}</ThemedText>
                    <ThemedText>LOCATION: {plan.location}</ThemedText>
                    <ThemedText>ACTIONS: {plan.action}</ThemedText>
                    <ThemedText>TRANSIT: {plan.transportation}</ThemedText>
                </ThemedText>)}
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
