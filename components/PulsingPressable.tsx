import React from "react";
import { Pressable, PressableProps } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withSequence,
	withTiming,
	Easing,
	cancelAnimation,
} from "react-native-reanimated";

type PulsingPressableProps = PressableProps & {
	children: React.ReactNode;
	pulsing?: boolean;
};

export const PulsingPressable = ({
	children,
	pulsing = false,
	...props
}: PulsingPressableProps) => {
	const opacity = useSharedValue(1);

	React.useEffect(() => {
		if (pulsing) {
			opacity.value = withRepeat(
				withSequence(
					withTiming(0.6, { duration: 800, easing: Easing.inOut(Easing.ease) }),
					withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
				),
				-1,
				false
			);
		} else {
			cancelAnimation(opacity);
			opacity.value = 1;
		}
	}, [pulsing]);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	return (
		<Animated.View style={animatedStyle}>
			<Pressable {...props}>{children}</Pressable>
		</Animated.View>
	);
};
