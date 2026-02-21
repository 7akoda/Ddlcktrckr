import {
	Canvas,
	DashPathEffect,
	DiscretePathEffect,
	Group,
	Line2DPathEffect,
	Path,
	processTransform2d,
	rotate,
	rotateY,
	translate,
} from "@shopify/react-native-skia";
import {
	useAnimatedReaction,
	useDerivedValue,
	useSharedValue,
	withDecay,
	withDelay,
	withRepeat,
	withTiming,
	Easing,
	withSequence,
} from "react-native-reanimated";
import { useUnistyles } from "react-native-unistyles";
import { StyleSheet } from "react-native-unistyles";
import { useEffect, useState } from "react";
import { paths, curvedPaths } from "@/data/loadingPaths";
import { View } from "react-native";

interface IconProps {
	itemColour: string;
}

export const ItemIcon = ({ itemColour }: IconProps) => {
	const { theme } = useUnistyles(); //theming

	const [size, setSize] = useState({ width: 0, height: 0 }); //state set to 0, 0
	const scale = (size.width / 963.69) * 0.97; // scale = targetsize/ogsize

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

	useEffect(() => {
		progressSpin.value = withSequence(
			withRepeat(withDelay(4000, withTiming(360, { duration: 3000 })), -1)
		);

		pathDraw.value = withDelay(500, withTiming(0, { duration: 1000 }));

		progressEye.value = withSequence(
			withDelay(
				1700,
				withTiming(16, {
					duration: 500,
					easing: Easing.elastic(1),
				})
			),
			withDelay(
				1000,
				withTiming(-16, { duration: 500, easing: Easing.elastic(1) })
			),
			withDelay(
				1000,
				withTiming(0, { duration: 500, easing: Easing.elastic(1) })
			)
		);
	}, [progressSpin]);

	return (
		<View
			style={{
				width: "100%",
				height: "100%",
				position: "absolute",
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
									opacity={0.1}
									color={itemColour}
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
									opacity={0.1}
									color={itemColour}
									strokeWidth={7}
									style={"stroke"}
									start={pathDraw}></Path>
							))}
						</Group>
						<Group transform={derivedProgressEye}>
							<Path
								path="M371.14 481.87c2.49 145.45 218.85 145.43 221.32-.02-2.49-145.45-218.85-145.43-221.32.02zm110.67 69.5c-91.36-1.63-91.34-137.39 0-139.02 91.34 1.63 91.34 137.39 0 139.02z"
								opacity={0.1}
								color={itemColour}
								style={"stroke"}
								strokeWidth={7}
								start={pathDraw}></Path>
						</Group>
					</Group>
				)}
			</Canvas>
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	flex: {
		flex: 1,
	},
}));
