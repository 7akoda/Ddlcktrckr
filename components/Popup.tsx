import { View, Pressable } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

type props = {
	settings: boolean;
	children: React.ReactNode;
	handlePress: () => void;
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Popup = ({ settings, children, handlePress }: props) => {
	const { theme } = useUnistyles();
	const opacity = useSharedValue(0);
	const scale = useSharedValue(0.8);
	const animatedOverlayStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));
	const animatedContentStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	useEffect(() => {
		opacity.value = withTiming(settings ? 0.8 : 0, { duration: 300 });
		scale.value = withTiming(settings ? 1 : 0.8, { duration: 300 });
	}, [settings]);

	return (
		<View
			style={{
				justifyContent: "center",
				position: "absolute",
				width: "100%",
				height: "100%",
			}}>
			<Animated.View style={[{ zIndex: 16 }, animatedContentStyle]}>
				<Animated.View
					style={[
						{
							backgroundColor: theme.colors.background,
							width: 300,
							height: 180,
							zIndex: 16,
							alignSelf: "center",
							borderRadius: 4,
							borderWidth: 2,
							borderColor: theme.colors.secondary,
						},
						animatedOverlayStyle,
					]}>
					<View
						style={{
							height: "100%",
							width: "100%",

							justifyContent: "center",
						}}>
						{children}
					</View>
				</Animated.View>
			</Animated.View>
			<AnimatedPressable
				onPress={() => handlePress()}
				style={[
					{
						backgroundColor: theme.colors.background,
						width: "100%",
						height: "120%",
						zIndex: 12,
						position: "absolute",
					},
					animatedOverlayStyle,
				]}></AnimatedPressable>
		</View>
	);
};
