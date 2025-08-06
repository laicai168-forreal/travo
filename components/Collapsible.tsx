import { PropsWithChildren, useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type CollapsibleProps = PropsWithChildren
	& {
		title: string,
		onExpand?: () => void,
	}

export const Collapsible = ({ children, title, onExpand }: CollapsibleProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const theme = useColorScheme() ?? 'light';
	const handleToggle = useCallback(() => {
		setIsOpen((value) => !value);
		if (isOpen && onExpand) {
			onExpand();
		}
	}, []);

	return (
		<ThemedView>
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
		</ThemedView>
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
