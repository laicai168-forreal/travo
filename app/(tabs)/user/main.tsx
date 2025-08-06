import { Image } from 'expo-image';
import { Button, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { clearTravelCacheLocally } from '@/store/reducers/planReducer';
import { chooseLanguage, LAN } from '@/store/reducers/settingsReducer';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';

export default function HomeScreen() {

	const language = useSelector((state: RootState) => state.settings.language);
	const dispatch = useDispatch<AppDispatch>();
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
			headerImage={
				<Image
					source={require('@/assets/images/partial-react-logo.png')}
					style={styles.reactLogo}
				/>
			}>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Settings</ThemedText>
				<HelloWave />
			</ThemedView>
			<Collapsible title={`Current Language: ${language}`}>
				{Object.entries(LAN).map(([key, value]) => <Button key={value} title={value} onPress={() => {
					const lanEnum = key as keyof typeof LAN;
					dispatch(chooseLanguage(LAN[lanEnum]))
				}}/>)}
			</Collapsible>
			<Collapsible title='Clear cache'>
				<Button title='Clear all cache' onPress={() => dispatch(clearTravelCacheLocally())}/>
			</Collapsible>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
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
