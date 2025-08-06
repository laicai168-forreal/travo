import { PropsWithChildren, useCallback, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import RNDateTimePicker from '@react-native-community/datetimepicker';

type InlineTimePickerProps = PropsWithChildren
    & {
        timeValue?: string | Date;
        minimumDate?: string | Date;
        containerStyle?: StyleProp<ViewStyle>;
        showTime?: boolean;
        onTimeChange: (selectedDate: Date) => void;
    }

export const InlineTimePicker = ({
    timeValue,
    minimumDate = new Date(),
    containerStyle,
    showTime = false,
    onTimeChange
}: InlineTimePickerProps) => {
    const [time, setTime] = useState(timeValue ? new Date(timeValue) : new Date());

    const handleTimeChange = useCallback((event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setTime(selectedDate);
            onTimeChange(selectedDate);
        }
    }, [onTimeChange]);

    return (
        <ThemedView style={[styles.container, containerStyle]}>
            <View style={styles.dateContainer}>
                <RNDateTimePicker minimumDate={new Date(minimumDate)} mode='date' display='default' value={time} onChange={handleTimeChange} />
            </View>
            {showTime && <View style={styles.timeContainer}>
                <RNDateTimePicker minimumDate={new Date(minimumDate)} mode='time' display='default' value={time} onChange={handleTimeChange} />
            </View>}
        </ThemedView >
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
    },
    dateContainer: {
        width: '50%',
    },
    timeContainer: {
        width: '50%',
    }
});
