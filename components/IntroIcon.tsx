import { Canvas, Group, Path } from "@shopify/react-native-skia";
import {
	useDerivedValue,
	useSharedValue,
	withDelay,
	withRepeat,
	withTiming,
	Easing,
	withSequence,
} from "react-native-reanimated";

import { useEffect, useState } from "react";
import { paths, curvedPaths } from "@/data/loadingPaths";
import { View } from "react-native";
import { useUnistyles } from "react-native-unistyles";

export const IntroIcon = () => {
	const [size, setSize] = useState({ width: 0, height: 0 });

	const scale = (size.width / 963.69) * 0.97;
	const { theme } = useUnistyles();
	const progressEye = useSharedValue(0);
	const progressSpin = useSharedValue(0);
	const pathDraw = useSharedValue(1);
	const derivedProgressEye = useDerivedValue(() => {
		return [
			{ translateX: progressEye.value * 4 },
			{ translateY: progressEye.value / 2 },
		];
	});
	const derivedSpin = useDerivedValue(() => {
		return [{ rotateZ: (progressSpin.value * Math.PI) / 360 }];
	});

	const opacity = useSharedValue(0);

	useEffect(() => {
		progressSpin.value = withSequence(
			withRepeat(withDelay(4000, withTiming(360, { duration: 3000 })), -1),
		);

		pathDraw.value = withDelay(500, withTiming(0, { duration: 1000 }));

		progressEye.value = withSequence(
			withDelay(
				1700,
				withTiming(16, {
					duration: 500,
					easing: Easing.elastic(1),
				}),
			),
			withDelay(
				1000,
				withTiming(-16, { duration: 500, easing: Easing.elastic(1) }),
			),
			withDelay(
				1000,
				withTiming(0, { duration: 500, easing: Easing.elastic(1) }),
			),
		);
		opacity.value = withDelay(
			1500,
			withTiming(0.3, { duration: 4500, easing: Easing.in(Easing.ease) }),
		);
	}, [opacity, pathDraw, progressEye, progressSpin]);

	return (
		<View
			style={{
				width: "100%",
				height: "100%",
			}}
			onLayout={(e) =>
				setSize({
					width: e.nativeEvent.layout.width,
					height: e.nativeEvent.layout.height,
				})
			}>
			<Canvas
				style={{
					width: "100%",
					height: "100%",
				}}>
				{size.width > 0 && (
					<Group
						transform={[
							{ translateX: (size.width - scale * 963.69) / 2 },
							{ scale: scale },
							{ translateY: size.height / 2 },
						]}>
						<Group
							transform={derivedSpin}
							origin={{ x: 963.69 / 2, y: 963.69 / 2 }}>
							{curvedPaths.map((p, i) => (
								<Path
									key={i}
									path={p}
									opacity={0.3}
									color={theme.colors.accent}
									style={"stroke"}
									strokeWidth={7}
									start={pathDraw}></Path>
							))}
						</Group>
						<Group>
							{paths.map((p, i) => (
								<Path
									key={i}
									path={p}
									opacity={0.3}
									color={theme.colors.accent}
									strokeWidth={7}
									style={"stroke"}
									start={pathDraw}></Path>
							))}
						</Group>
						<Group transform={derivedProgressEye}>
							<Path
								path="M371.14 481.87c2.49 145.45 218.85 145.43 221.32-.02-2.49-145.45-218.85-145.43-221.32.02zm110.67 69.5c-91.36-1.63-91.34-137.39 0-139.02 91.34 1.63 91.34 137.39 0 139.02z"
								opacity={0.3}
								color={theme.colors.accent}
								style={"stroke"}
								strokeWidth={7}
								start={pathDraw}></Path>
						</Group>
					</Group>
				)}
				{size.width > 0 && (
					<Group
						transform={[
							{ translateX: (size.width - scale * 963.69) / 2 },
							{ scale: scale },
							{ translateY: size.height / 2 },
						]}>
						<Group
							transform={derivedSpin}
							origin={{ x: 963.69 / 2, y: 963.69 / 2 }}>
							{curvedPaths.map((p, i) => (
								<Path
									key={i}
									path={p}
									opacity={opacity}
									color={theme.colors.accent}
									style={"fill"}
									strokeWidth={7}
									start={pathDraw}></Path>
							))}
						</Group>
						<Group>
							{paths.map((p, i) => (
								<Path
									key={i}
									path={p}
									opacity={opacity}
									color={theme.colors.accent}
									strokeWidth={7}
									style={"fill"}
									start={pathDraw}></Path>
							))}
						</Group>
						<Group transform={derivedProgressEye}>
							<Path
								path="M371.14 481.87c2.49 145.45 218.85 145.43 221.32-.02-2.49-145.45-218.85-145.43-221.32.02zm110.67 69.5c-91.36-1.63-91.34-137.39 0-139.02 91.34 1.63 91.34 137.39 0 139.02z"
								opacity={opacity}
								color={theme.colors.accent}
								style={"fill"}
								strokeWidth={7}
								start={pathDraw}></Path>
						</Group>
					</Group>
				)}
			</Canvas>
		</View>
	);
};
