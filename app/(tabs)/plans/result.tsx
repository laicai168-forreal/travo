

import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { ActionButton } from '@/components/ActionButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import t from '@/constants/Translations';
import { saveTravelLocally } from '@/store/reducers/planReducer';
import { AppDispatch, RootState } from '@/store/store';
import { TimePlan } from '@/types/planTypes';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

export default function PlanResultScreen() {
    const router = useRouter();
    const isLoading = useSelector((state: RootState) => state.planData.loading);
    const currentPlan = useSelector((state: RootState) => state.planData.currentPlan);
    const language = useSelector((state: RootState) => state.settings.language);
    const dispatch = useDispatch<AppDispatch>();

    const handleSave = useCallback(() => {
        dispatch(saveTravelLocally())
            .then(() => {
                router.push('/(tabs)/plans/main');
            });
    }, []);

    const getRegionCoordinates = (schedule: TimePlan[]): Region | undefined => {
        if (!schedule || schedule.length === 0) {
            return;
        }
        const coordinates = schedule.map((schedule) => (
            {
                latitude: parseFloat(schedule.coordinates.N),
                longitude: parseFloat(schedule.coordinates.E)
            }
        ));
        if (coordinates.length > 1) {
            const { top, bottom, left, right } = coordinates.reduce((previous, current) => {
                return {
                    top: Math.max(previous.top, current.latitude),
                    bottom: Math.min(previous.bottom, current.latitude),
                    left: Math.min(previous.left, current.longitude),
                    right: Math.max(previous.right, current.longitude),
                }
            }, {
                top: coordinates[0].latitude,
                bottom: coordinates[0].latitude,
                left: coordinates[0].longitude,
                right: coordinates[0].longitude,
            });
            return {
                latitude: (bottom + top) / 2,
                longitude: (left + right) / 2,
                latitudeDelta: (top - bottom) * 2,
                longitudeDelta: (right - left) * 2,
            }
        } else {
            return {
                latitude: coordinates[0].latitude,
                longitude: coordinates[0].longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.topContainer}>
                <ThemedView style={styles.titleContainer}>
                    <ThemedText style={styles.titleText} type="defaultSemiBold">Schedule</ThemedText>
                </ThemedView>
                {!isLoading && currentPlan.map((plan, index) => <ThemedView key={index}>
                    <ThemedView style={styles.row}>
                        <ThemedText style={styles.location}>{plan.destination}</ThemedText>
                    </ThemedView>
                    {plan.days.map((dayPlan, index) => <ThemedView key={index}>
                        <ThemedView style={styles.row}>
                            <ThemedText style={styles.date}>{dayPlan.date}</ThemedText>
                        </ThemedView>
                        <ThemedView style={styles.mapContainer} >
                            <MapView
                                initialRegion={getRegionCoordinates(dayPlan.schedule)}
                                style={
                                    { height: 400, width: 400 }
                                }
                            >
                                {dayPlan.schedule.map((marker, index) => (
                                    <Marker
                                        key={index}
                                        coordinate={{ latitude: parseFloat(marker.coordinates.N), longitude: parseFloat(marker.coordinates.E) }}
                                        title={marker.location}
                                        description={marker.action}
                                    />
                                ))}
                            </MapView>
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
                <ThemedView style={styles.bottomActionButtonWrapper}>
                    <ActionButton title={t.plan.save[language]} onPress={handleSave} />
                </ThemedView>
                <ThemedView style={styles.bottomActionButtonWrapper}>
                    <ActionButton title={'Edit'} onPress={() => router.push('/(tabs)/plans/edit')} />
                </ThemedView>
                <ThemedView style={styles.bottomActionButtonWrapper}>
                    <ActionButton title={'Cancel'} onPress={() => router.push('/(tabs)/plans/main')} />
                </ThemedView>
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
    mapContainer: {
        display: 'flex',
        justifyContent: 'center',
        verticalAlign: 'middle',
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
