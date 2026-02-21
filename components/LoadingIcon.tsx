import { Dimensions } from "react-native";
import Animated, {
	useAnimatedProps,
	useSharedValue,
	withRepeat,
	withSequence,
	withTiming,
} from "react-native-reanimated";
import { useUnistyles } from "react-native-unistyles";
import Svg, { Defs, Path } from "react-native-svg";
import { StyleSheet } from "react-native-unistyles";
import { useEffect } from "react";
import { paths } from "@/data/loadingPaths";

export const LoadingIcon = () => {
	const { theme } = useUnistyles();
	const screenHeight = Dimensions.get("window").height;
	const AnimatedPath = Animated.createAnimatedComponent(Path);

	const opacities = paths.map(() => useSharedValue(0.3));

	useEffect(() => {
		opacities.forEach((opacity, index) => {
			const delay = index * 150;
			setTimeout(() => {
				opacity.value = withRepeat(
					withSequence(
						withTiming(1, { duration: 600 }),
						withTiming(0.3, { duration: 600 })
					),
					-1,
					false
				);
			}, delay);
		});
	}, []);

	return (
		<Animated.View style={[styles.background, { height: screenHeight }]}>
			<Svg
				id="Layer_1"
				viewBox="0 -28 963.69 963.69"
				width="100%"
				height="100%"
				preserveAspectRatio="xMidYMid meet">
				{paths.map((d, i) => {
					const animatedProps = useAnimatedProps(() => ({
						opacity: opacities[i].value,
					}));
					return (
						<AnimatedPath
							key={i}
							animatedProps={animatedProps}
							fill={theme.colors.primary}
							d={d}
						/>
					);
				})}
				<AnimatedPath
					fill={theme.colors.primary}
					d="M963.69 471.57h-64.66c-2.59-107.33-45.91-204.72-115.09-277.31-74.7-78.08-177.03-126.68-291.82-129.6V0c257.6 5.18 466.42 213.9 471.57 471.57zM963.69 492.14c-2.95 132.71-58.55 251.44-148.48 337.65-72.33 69.36-166.18 116.37-270.5 129.92-5.39.72-10.79 1.33-16.23 1.85-2.17.22-4.34.4-6.53.58-1.91.16-3.84.3-5.75.44-7.98.58-15.99.94-24.07 1.11v-64.66c221.66-5.2 401.73-185.21 406.91-406.89h64.66zM471.55 0v64.66c-114.71 2.95-217.3 51.44-291.82 129.66-69.18 72.59-112.5 169.92-115.09 277.25H0c.16-7.72.48-15.37 1-23.01C17.7 201.65 221.6 4.98 471.55 0zM471.55 899.03v64.66c-4-.08-8-.22-11.97-.4-1.95-.08-3.92-.18-5.87-.3-1.95-.12-3.9-.24-5.85-.38-115.91-8.02-220.51-57.1-299.46-132.81C58.55 743.48 2.91 624.87 0 492.14h64.64c5.18 221.68 185.23 401.73 406.91 406.89zM371.14 481.87c2.49 145.45 218.85 145.43 221.32-.02-2.49-145.45-218.85-145.43-221.32.02zm110.67 69.5c-91.36-1.63-91.34-137.39 0-139.02 91.34 1.63 91.34 137.39 0 139.02z"
				/>
			</Svg>
		</Animated.View>
	);
};

const styles = StyleSheet.create((theme) => ({
	background: {
		backgroundColor: theme.colors.background,
		position: "absolute",
		alignSelf: "center",
		justifyContent: "center",
		width: "100%",
		zIndex: 1,
	},
}));
