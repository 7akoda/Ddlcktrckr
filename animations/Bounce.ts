import {
	SharedValue,
	withSequence,
	WithSpringConfig,
	withTiming,
} from "react-native-reanimated";

export const BouncePress = (size: SharedValue<number>, length: number) => {
	size.value = withSequence(
		withTiming(getCompressedScale(length), SPRING_CONFIG),

		withTiming(1, SPRING_CONFIG),
	);
};

export const getCompressedScale = (length: number, amount = 0.03125) => {
	"worklet";
	const ratio = 1 / 800;
	return 1 - amount * Math.exp(-ratio * length);
};
const SPRING_CONFIG: WithSpringConfig = {
	duration: 50,
	dampingRatio: 1,
	overshootClamping: true,
};
