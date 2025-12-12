import { Text, TextProps } from "react-native";
import { useUnistyles } from "react-native-unistyles";

export const CustomText = (props: TextProps) => {
	const { theme } = useUnistyles();
	return (
		<Text
			{...props}
			style={[{ fontFamily: theme.fontFamily.semiBold }, props.style]}
		/>
	);
};
