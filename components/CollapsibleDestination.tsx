import { PropsWithChildren, useCallback, useState } from 'react';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PlanRequestItem } from '@/store/reducers/planReducer';
import { ThemedTextInput } from './ThemedTextInput';

type CollapsibleDestinationProps = PropsWithChildren
	& {
		title: string,
		planRequestItem: PlanRequestItem,
		onExpand?: () => void,
		onConfirm?: (planRequestItem: PlanRequestItem) => void,
		showConfirmButton?: boolean,
		confirmButtonTitle?: string,
	}

export const CollapsibleDestination = ({ children, title, onExpand, onConfirm, showConfirmButton, confirmButtonTitle, planRequestItem, }: CollapsibleDestinationProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [editingPlanItem, setEditingPlanItem] = useState({ ...planRequestItem })
	const theme = useColorScheme() ?? 'light';
	const confirm = useCallback(() => {
		setIsOpen(false);
		onConfirm && onConfirm(editingPlanItem);
	}, [editingPlanItem])

	return (
		<ThemedView>
			<TouchableOpacity
				style={styles.heading}
				onPress={() => {
					setIsOpen((value) => !value);
					if (isOpen && onExpand) {
						onExpand();
					}
				}}
				activeOpacity={0.8}>
				<IconSymbol
					name="chevron.right"
					size={18}
					weight="medium"
					color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
					style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
				/>

				<ThemedText type="defaultSemiBold">{title}</ThemedText>
			</TouchableOpacity>
			{isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
			{isOpen && editingPlanItem && <>
				<ThemedView style={styles.row}>
					<ThemedText type="defaultSemiBold">DESTINATION: </ThemedText>
					<ThemedText>
						<ThemedTextInput
							placeholder='add a destination'
							value={editingPlanItem.destination}
							onChangeText={des => setEditingPlanItem({ ...editingPlanItem, destination: des })}
						/>
					</ThemedText>
				</ThemedView>
				<ThemedView style={styles.row}>
					<ThemedText type="defaultSemiBold">TIME: </ThemedText>
					<ThemedText>FROM:</ThemedText>
					<ThemedText>
						<ThemedTextInput
							placeholder='starting time'
							value={editingPlanItem.startTime}
						/>
					</ThemedText>
					<ThemedText>TO:</ThemedText>
					<ThemedText>
						<ThemedTextInput
							placeholder='ending time'
							value={editingPlanItem.endTime} />
					</ThemedText>
				</ThemedView>
				{showConfirmButton && isOpen &&
					<Button
						title={confirmButtonTitle || 'Confirm'}
						onPress={() => confirm()} />
				}
			</>}



		</ThemedView>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
	},
	heading: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	content: {
		marginTop: 6,
		marginLeft: 24,
	},
});
