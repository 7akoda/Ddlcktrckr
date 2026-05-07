import React, { useEffect } from "react";
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
	typeFunc: (type: string) => void;
	type: string;
};

export const PulsingPressable = ({
	children,
	pulsing = false,
	...props
}: PulsingPressableProps) => {
	const opacity = useSharedValue(1);
	const size = useSharedValue(1);

	useEffect(() => {
		if (pulsing) {
			opacity.value = withRepeat(
				withSequence(
					withTiming(0.6, { duration: 800, easing: Easing.inOut(Easing.ease) }),
					withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
				),
				-1,
				false,
			);
		} else {
			cancelAnimation(opacity);
			opacity.value = 1;
		}
	}, [pulsing, opacity]);

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

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ scale: size.value }],
	}));

	return (
		<Animated.View style={animatedStyle}>
			<Pressable
				onPress={() => {
					props.typeFunc(props.type);
					handlePress();
				}}
				{...props}>
				{children}
			</Pressable>
		</Animated.View>
	);
};
