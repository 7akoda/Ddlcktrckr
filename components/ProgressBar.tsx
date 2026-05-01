import { useSharedValue, useDerivedValue } from "react-native-reanimated";
import { Fill, Canvas, Rect } from "@shopify/react-native-skia";
import { useUnistyles } from "react-native-unistyles";

type ProgressType = {
	percent: number;
};

export const ProgressBar = ({ percent }: ProgressType) => {
	const { theme, rt } = useUnistyles();

	const size = useSharedValue({ width: 0, height: 0 });
	const rect = useDerivedValue(() => {
		const { width, height } = size.value;
		return { x: percent, y: 0, width, height };
	});
	return (
		<Canvas style={{ flex: 1, width: 100 }} onSize={size}>
			<Rect opacity={0.8} color={theme.colors.accent} rect={rect} />
		</Canvas>
	);
};
