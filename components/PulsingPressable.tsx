import { BouncePress } from "@/animations/Bounce";
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

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ scale: size.value }],
	}));

	return (
		<Animated.View
			style={[
				{
					height: 35,
					width: 35,
					alignItems: "center",
					justifyContent: "center",
				},
				animatedStyle,
			]}>
			<Pressable
				onPress={() => {
					props.typeFunc(props.type);
					BouncePress(size, 35);
				}}
				{...props}>
				{children}
			</Pressable>
		</Animated.View>
	);
};
