import { View, Pressable, Dimensions, Image, ScrollView } from "react-native";
import { useUnistyles, StyleSheet } from "react-native-unistyles";
import { Header } from "./Header";
import { useState } from "react";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { HeroAbilities } from "./HeroProfile/HeroAbilities";
import { HeroLore } from "./HeroProfile/HeroLore";
import { HeroAbilitiesInspect } from "./HeroProfile/HeroAbilitiesInspect";
import { useHeroDataById } from "@/hooks/useHeroDataById";
import { LoadingIcon } from "./LoadingIcon";
import { CustomText } from "./CustomText";

type Props = {
	id: number;
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const HeroProfile = ({ id }: Props) => {
	const { theme } = useUnistyles();
	const screenHeight = Dimensions.get("window").height;
	const [abilityPressed, setAbilityPressed] = useState(false);
	const [selectedAbilityIndex, setSelectedAbilityIndex] = useState<any>();
	const opacity = useSharedValue(0);
	const scale = useSharedValue(0.8);
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
		useHeroDataById(String(id));

	if (isIdLoading) {
		return <LoadingIcon />;
	}

	if (isIdError) return <CustomText>{String(idError)}</CustomText>;

	const tagArray = heroDataById.tags;

	tagArray.sort((a: string, b: string) => a.length - b.length);

	const heroMoves = [
		heroDataById.items.signature1,
		heroDataById.items.signature2,
		heroDataById.items.signature3,
		heroDataById.items.signature4,
	];

	const heroBaseStats = {
		vitality: {
			health: heroDataById.starting_stats.max_health,
			stamina: heroDataById.starting_stats.stamina,
			moveSpeed: heroDataById.starting_stats.max_move_speed,
			sprintSpeed: heroDataById.starting_stats.sprint_speed,
			lightMelee: heroDataById.starting_stats.light_melee_damage,
			heavyMelee: heroDataById.starting_stats.heavy_melee_damage,
			healthRegen: heroDataById.starting_stats.base_health_regen,
			staminaRegen: heroDataById.starting_stats.stamina_regen_per_second,
		},
	};

	return (
		<View>
			<Header variant="heroBar" id={id} back={true} sortable={false} />
			<View
				style={{
					height: 115,
					justifyContent: "flex-end",
					marginLeft: 32,
					shadowColor: theme.colors.font,
					shadowOpacity: 1,
					shadowOffset: { width: 0.8, height: 0.8 },
					shadowRadius: 0,
				}}>
				{tagArray.map((tag: string, index: number) => {
					return (
						<CustomText
							style={{
								fontSize: 22,
								opacity: 0.5,
								color: theme.colors.background,
								fontFamily: theme.fontFamily.extraBoldSerif,
								paddingLeft: index * 12,
							}}
							key={tag}>
							{tag}
						</CustomText>
					);
				})}
			</View>
			<View style={styles.itemView}>
				{heroMoves.map((moves, index) => {
					const matchedItem = itemDataById.find(
						(item: any) => item.class_name === moves,
					);
					return (
						<HeroAbilities
							setSelectedAbilityIndex={setSelectedAbilityIndex}
							key={index}
							matchedItem={matchedItem}
							handleShade={handleShade}
						/>
					);
				})}
			</View>
			<HeroLore id={id} />

			{abilityPressed ? (
				<View
					style={{
						justifyContent: "center",
						position: "absolute",
						width: "100%",
						height: screenHeight,
						top: -40,
					}}>
					<Animated.View style={[{ zIndex: 4 }, animatedContentStyle]}>
						<HeroAbilitiesInspect match={selectedAbilityIndex} id={id} />
					</Animated.View>
					<AnimatedPressable
						onPress={() => {
							handleShade();
						}}
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
			) : null}
		</View>
	);
};
const styles = StyleSheet.create((theme) => ({
	itemView: {
		marginTop: 12,
		width: "100%",
		flexDirection: "row",
		zIndex: 3,
		justifyContent: "space-evenly",
	},
}));
