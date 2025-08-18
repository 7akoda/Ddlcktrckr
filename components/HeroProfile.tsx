import { View, Image, Pressable, Dimensions, ScrollView } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { SvgComponent } from "./svgComponents/DDLKSvg";
import { Header } from "./Header";
import { useState } from "react";

import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { HeroAbilities } from "./HeroProfile/HeroAbilities";
import { HeroProfileBar } from "./HeroProfile/HeroProfileBar";
import { HeroLore } from "./HeroProfile/HeroLore";
import { HeroAbilitiesInspect } from "./HeroProfile/HeroAbilitiesInspect";

type Props = {
	id: number;
};

export const HeroProfile = ({ id }: Props) => {
	const { theme } = useUnistyles();
	const screenHeight = Dimensions.get("window").height;
	const [abilityPressed, setAbilityPressed] = useState(false);
	const opacity = useSharedValue(0);
	const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	const handleShade = () => {
		setAbilityPressed((prev) => {
			const newVal = !prev;
			requestAnimationFrame(() => {
				opacity.value = withTiming(newVal ? 0.8 : 0);
			});
			return newVal;
		});
	};

	return (
		<View style={{ backgroundColor: theme.colors.background }}>
			<Header back={true} sortable={false} />

			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{
					backgroundColor: theme.colors.background,
					height: screenHeight,
				}}>
				<HeroProfileBar id={id} />
				<View
					style={{
						position: "absolute",
						alignSelf: "center",
						justifyContent: "center",
						width: "100%",
						height: screenHeight,
						zIndex: 1,
					}}>
					<SvgComponent></SvgComponent>
				</View>
				<HeroAbilities id={id} handleShade={handleShade} />
				<HeroLore id={id} />
			</ScrollView>
			{abilityPressed ? (
				<>
					<AnimatedPressable
						onPress={() => {
							handleShade();
						}}
						style={[
							{
								position: "absolute",
								backgroundColor: theme.colors.background,
								width: "100%",
								height: screenHeight,
								zIndex: 4,
							},
							animatedStyle,
						]}></AnimatedPressable>
				</>
			) : (
				<HeroAbilitiesInspect id={id} />
			)}
		</View>
	);
};
