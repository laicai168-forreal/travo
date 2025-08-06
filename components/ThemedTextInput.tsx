import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { RefObject } from 'react';

export type ThemedTextInputProps = TextInputProps & {
	lightColor?: string;
	darkColor?: string;
	type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
	ref?: RefObject<null>;
};

export const ThemedTextInput = ({
	style,
	lightColor,
	darkColor,
	type = 'default',
	ref,
	...rest
}: ThemedTextInputProps) => {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

	return (
		<TextInput
			ref={ref}
			style={[
				{ color },
				type === 'default' ? styles.default : undefined,
				type === 'title' ? styles.title : undefined,
				type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
				type === 'subtitle' ? styles.subtitle : undefined,
				type === 'link' ? styles.link : undefined,
				style,
			]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	default: {
		fontSize: 16,
	},
	defaultSemiBold: {
		fontSize: 16,
		fontWeight: '600',
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		lineHeight: 32,
	},
	subtitle: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	link: {
		lineHeight: 30,
		fontSize: 16,
		color: '#0a7ea4',
	},
});
