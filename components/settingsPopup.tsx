import { View, Image, Pressable, Dimensions, ScrollView } from "react-native";
import { useUnistyles, StyleSheet } from "react-native-unistyles";
import { DDLKSvg } from "./svgComponents/DDLKSvg";
import { Header } from "./Header";
import { Dispatch, SetStateAction, useState } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useHeroDataById } from "@/hooks/useHeroDataById";
import { LoadingIcon } from "./LoadingIcon";
import { CustomText } from "./CustomText";
type props = {
	setSettings: Dispatch<SetStateAction<boolean>>;
	settings: boolean;
};
export const SettingsPopUp = ({ setSettings, settings }: props) => {
	const { theme } = useUnistyles();
	const [handle, setHandle] = useState(true);
	const screenHeight = Dimensions.get("window").height;
	const opacity = useSharedValue(0);
	const scale = useSharedValue(0.8);
	const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
	const animatedOverlayStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));
	const animatedContentStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	const handleShade = () => {
		const newVal = settings;
		requestAnimationFrame(() => {
			opacity.value = withTiming(newVal ? 0.8 : 0, { duration: 300 });
			scale.value = withTiming(newVal ? 1 : 0.8, { duration: 300 });
		});
		return newVal;
	};
	settings && handleShade();

	return (
		<View
			style={{
				justifyContent: "center",
				position: "absolute",
				width: "100%",
				height: screenHeight,
				top: -40,
			}}>
			<Animated.View
				style={[{ zIndex: 4 }, animatedContentStyle]}></Animated.View>
			<AnimatedPressable
				style={[
					{
						backgroundColor: theme.colors.background,
						width: "100%",
						height: "120%",
						zIndex: 3,
						position: "absolute",
					},
					animatedOverlayStyle,
				]}></AnimatedPressable>
		</View>
	);
};
const styles = StyleSheet.create((theme) => ({
	itemView: {
		top: 30,
		width: "100%",
		flexDirection: "row",
		position: "relative",
		zIndex: 4,
		justifyContent: "space-evenly",
	},
}));
