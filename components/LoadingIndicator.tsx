import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';

export const LoadingIndicator = () => {
    const rotationAnimation = useSharedValue(0);

    useEffect(() => {
        rotationAnimation.value = withRepeat(
            withSequence(withTiming(25, { duration: 150 }), withTiming(0, { duration: 150 })),
            -1
        );
    }, [rotationAnimation]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotationAnimation.value}deg` }],
    }));

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Animated.View style={animatedStyle}>
                    <ThemedText style={styles.text}>☝️</ThemedText>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    iconContainer: {
        width: '44%',
        height: '15%',
        backgroundColor: 'rgba(64, 64, 64, 0.5)',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
    },
});
