import { Canvas, Group, Path } from "@shopify/react-native-skia";
import {
	useDerivedValue,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";

import { useEffect, useState } from "react";
import { paths, curvedPaths } from "@/data/loadingPaths";
import { useUnistyles } from "react-native-unistyles";
import { Shader1 } from "./Shader";
import { BackgroundImage } from "./BackgroundImage";
import { SafeAreaView } from "react-native-safe-area-context";

export const LoadingIcon = () => {
	const [size, setSize] = useState({ width: 0, height: 0 });
	const scale = (size.width / 963.69) * 0.97;
	const { theme } = useUnistyles();
	const progressSpin = useSharedValue(0);

	const derivedSpin = useDerivedValue(() => {
		return [{ rotateZ: (progressSpin.value * Math.PI) / 360 }];
	});

	useEffect(() => {
		progressSpin.value = withRepeat(withTiming(360, { duration: 1500 }), -1);
	}, [progressSpin]);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: theme.colors.background,
			}}
			onLayout={(e) =>
				setSize({
					width: e.nativeEvent.layout.width,
					height: e.nativeEvent.layout.height,
				})
			}>
			<Shader1 />
			<BackgroundImage />
			<Canvas
				style={{
					width: "100%",
					height: "100%",
					position: "absolute",
					top: 40,
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
									strokeWidth={7}></Path>
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
									style={"stroke"}></Path>
							))}
						</Group>
						<Group>
							<Path
								path="M371.14 481.87c2.49 145.45 218.85 145.43 221.32-.02-2.49-145.45-218.85-145.43-221.32.02zm110.67 69.5c-91.36-1.63-91.34-137.39 0-139.02 91.34 1.63 91.34 137.39 0 139.02z"
								opacity={0.3}
								color={theme.colors.accent}
								style={"stroke"}
								strokeWidth={7}></Path>
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
									opacity={0.3}
									color={theme.colors.accent}
									style={"fill"}
									strokeWidth={7}></Path>
							))}
						</Group>
						<Group>
							{paths.map((p, i) => (
								<Path
									key={i}
									path={p}
									opacity={0.3}
									style={"fill"}
									color={theme.colors.accent}></Path>
							))}
						</Group>
						<Group>
							<Path
								path="M371.14 481.87c2.49 145.45 218.85 145.43 221.32-.02-2.49-145.45-218.85-145.43-221.32.02zm110.67 69.5c-91.36-1.63-91.34-137.39 0-139.02 91.34 1.63 91.34 137.39 0 139.02z"
								opacity={0.3}
								color={theme.colors.accent}
								style={"fill"}></Path>
						</Group>
					</Group>
				)}
			</Canvas>
		</SafeAreaView>
	);
};
