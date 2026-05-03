import { View } from "react-native";
import { useUnistyles } from "react-native-unistyles";

type ProgressType = {
	percent: number;
};

export const ProgressBar = ({ percent }: ProgressType) => {
	const { theme } = useUnistyles();

	return (
		<View
			style={{
				width: 100,
				height: 10,
				backgroundColor: theme.colors.accent + "33",
				borderRadius: 2,

				borderColor: theme.colors.font,
			}}>
			<View
				style={{
					width: percent,
					height: 10,
					opacity: 0.8,
					backgroundColor: theme.colors.accent,
					borderRadius: 2,
				}}
			/>
		</View>
	);
};
