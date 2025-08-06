import { StyleSheet, Text, TouchableOpacity, type ViewProps } from 'react-native';

export type ActionButtonProps = ViewProps & {
	title?: string;
	disabled?: boolean;
	onPress?: () => void;
};

export const ActionButton = ({ title = '', disabled = false, onPress }: ActionButtonProps) => {
	return (
		<TouchableOpacity style={styles.themedButton} disabled={disabled} onPress={onPress}>
			<Text style={styles.themedButtonText}>
				{title}
			</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	themedButton: {
		borderRadius: 4,
		backgroundColor: '#333',
		padding: 15,
	},
	themedButtonText: {
		fontSize: 18,
		fontWeight: 700,
		color: '#eee',
		textAlign: 'center',
	},
});