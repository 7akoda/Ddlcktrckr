import { useUnistyles } from "react-native-unistyles";
import { CustomText } from "./CustomText";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withSequence,
	withTiming,
} from "react-native-reanimated";

type HeaderButtonType = {
	sortFunc: (text: string) => void;
	text: string;
	sort: string;
};
const AnimatedCustomText = Animated.createAnimatedComponent(CustomText);

export const HeaderButton = ({ sortFunc, text, sort }: HeaderButtonType) => {
	const { theme } = useUnistyles();
	const size = useSharedValue(1);

	const handlePress = () => {
		size.value = withSequence(
			withTiming(1.2, {
				duration: 100,
				easing: Easing.in(Easing.elastic(2)),
			}),

			withTiming(1, {
				duration: 100,
				easing: Easing.in(Easing.elastic(2)),
			}),
		);
	};

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
				handlePress();
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
