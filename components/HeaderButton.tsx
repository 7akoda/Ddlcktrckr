import { useUnistyles } from "react-native-unistyles";
import { CustomText } from "./CustomText";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import { BouncePress } from "@/animations/Bounce";

type HeaderButtonType = {
	sortFunc: (text: string) => void;
	text: string;
	sort: string;
};
const AnimatedCustomText = Animated.createAnimatedComponent(CustomText);

export const HeaderButton = ({ sortFunc, text, sort }: HeaderButtonType) => {
	const { theme } = useUnistyles();
	const size = useSharedValue(1);

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ scale: size.value }],
		};
	});
	return (
		<AnimatedCustomText
			suppressHighlighting
			onPress={() => {
				sortFunc(text);
				BouncePress(size, 33);
			}}
			style={[
				{
					color: theme.colors.font,
					textAlign: "center",
					marginHorizontal: 5,

					fontSize: 9.5,
					alignSelf: "center",
					lineHeight: 20,
					paddingHorizontal: 2,
					minWidth: 33,
					height: 23,
					borderRadius: 16,
					borderCurve: "continuous",
					borderColor:
						sort === text ? theme.colors.selected : theme.colors.primary,
					borderWidth: 1,
				},
				animatedStyles,
			]}>
			{text}
		</AnimatedCustomText>
	);
};
