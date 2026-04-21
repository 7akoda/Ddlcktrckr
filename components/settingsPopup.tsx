import {
	View,
	Image,
	Pressable,
	Dimensions,
	Switch,
	Button,
} from "react-native";
import {
	useUnistyles,
	StyleSheet,
	UnistylesRuntime,
} from "react-native-unistyles";
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
	steamAuth: () => void;
};

export const SettingsPopUp = ({ setSettings, settings, steamAuth }: props) => {
	const { theme, rt } = useUnistyles();
	const opacity = useSharedValue(0);
	const scale = useSharedValue(0.8);
	const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
	const [isEnabled, setIsEnabled] = useState(false);
	const animatedOverlayStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));
	const animatedContentStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));
	const toggleSwitch = () => setIsEnabled((prev) => !prev);

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
				height: "100%",
			}}>
			<Animated.View style={[{ zIndex: 16 }, animatedContentStyle]}>
				<View
					style={[
						{
							backgroundColor: theme.colors.background,
							width: 335,
							height: 400,
							zIndex: 16,
							alignSelf: "center",
							borderRadius: 4,
							borderWidth: 2,
							borderColor: theme.colors.secondary,
						},
						{ opacity: settings ? 1 : 0 },
					]}>
					<View
						style={{
							justifyContent: "center",
							alignSelf: "center",
							marginTop: 20,
						}}>
						<View
							style={{
								flexDirection: "row",
								width: 335,
							}}>
							<CustomText
								style={{
									marginLeft: 25,
									alignSelf: "center",
									fontSize: 22,
									color: theme.colors.font,
								}}></CustomText>
							<View style={{ flex: 1 }} />
							<Button title={"Sign in with Steam"} onPress={steamAuth} />
						</View>
						<View
							style={{
								flexDirection: "row",
								width: 335,
							}}>
							<CustomText
								style={{
									marginLeft: 25,
									alignSelf: "center",
									fontSize: 22,
									color: theme.colors.font,
								}}>
								Dark Mode
							</CustomText>
							<View style={{ flex: 1 }} />
							<Button
								title={"dark mode"}
								onPress={() => UnistylesRuntime.setTheme("dark")}
							/>
						</View>
						<View
							style={{
								flexDirection: "row",
								width: 335,
							}}>
							<CustomText
								style={{
									marginLeft: 25,
									alignSelf: "center",
									fontSize: 22,
									color: theme.colors.font,
								}}>
								Light Mode
							</CustomText>
							<View style={{ flex: 1 }} />
							<Button
								title={"light mode"}
								onPress={() => UnistylesRuntime.setTheme("light")}
							/>
						</View>
					</View>
				</View>
			</Animated.View>
			<AnimatedPressable
				onPress={() => handleShade()}
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
