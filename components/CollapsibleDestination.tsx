import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PlanRequestItem } from '@/types/planTypes';
import 'react-native-get-random-values';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import { InlineTimePicker } from './InlineTimePicker';

type CollapsibleDestinationProps = PropsWithChildren
	& {
		title: string,
		planRequestItem: PlanRequestItem,
		onExpand?: () => void,
		onConfirm?: (planRequestItem: PlanRequestItem) => void,
		onRemove?: (key: string) => void,
		showConfirmButton?: boolean,
		confirmButtonTitle?: string,
		isOpenDefault?: boolean,
	}

export const CollapsibleDestination = ({
	children,
	title,
	showConfirmButton,
	confirmButtonTitle,
	planRequestItem,
	isOpenDefault = false,
	onExpand,
	onRemove,
	onConfirm,
}: CollapsibleDestinationProps) => {
	const [isOpen, setIsOpen] = useState(isOpenDefault);
	const [editingPlanItem, setEditingPlanItem] = useState<PlanRequestItem>({ ...planRequestItem })
	const theme = useColorScheme() ?? 'light';
	const ref = useRef<GooglePlacesAutocompleteRef>(null);

	useEffect(() => {
		setEditingPlanItem(planRequestItem);
	}, [planRequestItem])

	useEffect(() => {
		ref.current?.setAddressText(planRequestItem.destination);
	}, [])

	const handleConfirm = useCallback(() => {
		setIsOpen(false);
		onConfirm && onConfirm(editingPlanItem);
	}, [editingPlanItem]);

	const handleRemove = useCallback(() => {
		onRemove && editingPlanItem && onRemove(editingPlanItem.key);
	}, [editingPlanItem])

	const handleToggle = useCallback(() => {
		setIsOpen((value) => !value);
		if (isOpen && onExpand) {
			onExpand();
		}
	}, []);

	const handleDestinationChange = useCallback((destination: string) => {
		if (destination) {
			setEditingPlanItem({ ...editingPlanItem, destination })
		}
	}, [editingPlanItem]);

	const handleStartTimeChange = useCallback((selectedDate?: Date) => {
		if (selectedDate) {
			setEditingPlanItem({ ...editingPlanItem, startTime: selectedDate.toString() })
		}
	}, [editingPlanItem]);

	const handleEndTimeChange = useCallback((selectedDate?: Date) => {
		if (selectedDate) {
			setEditingPlanItem({ ...editingPlanItem, endTime: selectedDate.toString() })
		}
	}, [editingPlanItem]);

	return (
		<ThemedView style={styles.container}>
			<TouchableOpacity
				onPress={() => handleToggle()}
				style={styles.heading}
				activeOpacity={0.8}>
				<ThemedView style={styles.row}>
					<ThemedText type="defaultSemiBold" style={styles.titleText}>{title}</ThemedText>
					<ThemedView style={styles.symbolWrapper}>
						<IconSymbol
							name="chevron.right"
							size={18}
							weight="medium"
							color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
							style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
						/>
					</ThemedView>
				</ThemedView>
			</TouchableOpacity>
			{isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
			{isOpen && editingPlanItem && <>
				<ThemedView style={styles.row}>
					<GooglePlacesAutocomplete
						placeholder='Search'
						textInputProps={{}}
						predefinedPlaces={[]}
						minLength={0}
						ref={ref}
						styles={{
							container: {},
							textInput: { height: 40 }
						}}
						onPress={(data, details = null) => {
							// 'details' is provided when fetchDetails = true
							ref.current?.blur();
							setTimeout(() => {
								handleDestinationChange(data.description);
							}, 50);
							console.log(data, details);
						}}
						query={{
							key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
							language: 'en',
						}}
						keyboardShouldPersistTaps='handled'
						listViewDisplayed={false}
					/>
				</ThemedView>
				<ThemedView style={styles.row}>
					<ThemedView style={styles.timeWrapper}>
						<ThemedView style={styles.timeItemWrapper}>
							<ThemedText style={styles.labelText}>From</ThemedText>
							<InlineTimePicker
								showTime={true}
								timeValue={editingPlanItem.startTime}
								containerStyle={styles.timePickerContainer}
								onTimeChange={handleStartTimeChange} />
						</ThemedView>
						<ThemedView style={styles.timeItemWrapper}>
							<ThemedText style={styles.labelText}>To</ThemedText>
							<InlineTimePicker
								minimumDate={editingPlanItem.startTime}
								showTime={true}
								timeValue={editingPlanItem.endTime}
								containerStyle={styles.timePickerContainer}
								onTimeChange={handleEndTimeChange} />
						</ThemedView>
					</ThemedView>
				</ThemedView>
				{showConfirmButton &&
					<ThemedView style={[styles.row, styles.buttonRow]}>
						<ThemedText style={styles.removeButton} onPress={() => handleRemove()}>Remove</ThemedText>
						<ThemedText style={styles.confirmButton} onPress={() => handleConfirm()}>{confirmButtonTitle || 'Confirm'}</ThemedText>
					</ThemedView>
				}
			</>}
		</ThemedView >
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	titleText: {
		flexGrow: 1,
		fontWeight: 400,
		fontSize: 16,
	},
	symbolWrapper: {
		flexDirection: 'row',
		verticalAlign: 'middle',
	},
	row: {
		flexDirection: 'row',
		width: '100%',
		padding: 15,
		borderTopColor: '#E6E6E6',
		borderTopWidth: 1,
	},
	labelText: {
		fontSize: 15,
		fontWeight: 400,
		width: '15%',
	},
	timeWrapper: {
		flexDirection: 'column',
		flexGrow: 1,
	},
	timeItemWrapper: {
		flexDirection: 'row',
		paddingBottom: 10,
		alignItems: 'center',
	},
	timePickerContainer: {
		width: '70%',
	},
	inputText: {
		flexGrow: 1,
	},
	buttonRow: {
		justifyContent: 'center',
	},
	heading: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	content: {
		marginLeft: 24,
	},
	removeButton: {
		color: '#F75959',
		width: '50%',
		textAlign: 'center'
	},
	confirmButton: {
		width: '50%',
		textAlign: 'center'
	}
});
