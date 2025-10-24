import { View, Image, Pressable, Dimensions, ScrollView } from "react-native";
import { useUnistyles, StyleSheet } from "react-native-unistyles";
import { DDLKSvg } from "./svgComponents/DDLKSvg";
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
import { useHeroDataById } from "@/hooks/useHeroDataById";
import { LoadingIcon } from "./LoadingIcon";
import { CustomText } from "./CustomText";

type Props = {
	id: number;
};

export const HeroProfile = ({ id }: Props) => {
	const { theme } = useUnistyles();
	const screenHeight = Dimensions.get("window").height;
	const [abilityPressed, setAbilityPressed] = useState(false);
	const [selectedAbilityIndex, setSelectedAbilityIndex] = useState<any>();
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
		setAbilityPressed((prev) => {
			const newVal = !prev;
			requestAnimationFrame(() => {
				opacity.value = withTiming(newVal ? 0.8 : 0, { duration: 300 });
				scale.value = withTiming(newVal ? 1 : 0.8, { duration: 300 });
			});
			return newVal;
		});
	};
	const { heroDataById, itemDataById, isIdError, isIdLoading, idError } =
		useHeroDataById(id);
	if (isIdLoading) return <LoadingIcon />;

	if (isIdError) return <CustomText>{String(idError)}</CustomText>;

	const heroMoves = [
		heroDataById.items.signature1,
		heroDataById.items.signature2,
		heroDataById.items.signature3,
		heroDataById.items.signature4,
	];

	let abilityInspect = 0;

	heroMoves.map((moves, index) => {
		const matchedItem = itemDataById.find(
			(item: any) => item.class_name === moves
		);

		if (
			selectedAbilityIndex &&
			selectedAbilityIndex.class_name == matchedItem.class_name
		) {
			abilityInspect = index;
			return abilityInspect;
		}
	});

	return (
		<View style={{ backgroundColor: theme.colors.background }}>
			<Header back={true} sortable={false} />
			<View
				style={{
					position: "absolute",
					width: "100%",
					height: screenHeight,
				}}>
				<DDLKSvg></DDLKSvg>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{
					height: screenHeight,
					zIndex: 3,
				}}>
				<HeroProfileBar id={id} />
				<View style={styles.itemView}>
					{heroMoves.map((moves, index) => {
						const matchedItem = itemDataById.find(
							(item: any) => item.class_name === moves
						);
						return (
							<HeroAbilities
								setSelectedAbilityIndex={setSelectedAbilityIndex}
								key={index}
								matchedItem={matchedItem}
								id={id}
								handleShade={handleShade}
							/>
						);
					})}
				</View>
				<HeroLore id={id} />
			</ScrollView>
			{abilityPressed ? (
				<View
					style={{
						justifyContent: "center",
						position: "absolute",
						width: "100%",
						height: screenHeight,
					}}>
					<Animated.View style={[{ zIndex: 4 }, animatedContentStyle]}>
						<HeroAbilitiesInspect
							abilityInspect={abilityInspect}
							match={selectedAbilityIndex}
							id={id}
						/>
					</Animated.View>
					<AnimatedPressable
						onPress={() => {
							handleShade();
						}}
						style={[
							{
								backgroundColor: theme.colors.background,
								width: "100%",
								height: screenHeight,
								zIndex: 3,
								position: "absolute",
							},
							animatedOverlayStyle,
						]}></AnimatedPressable>
				</View>
			) : null}
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
