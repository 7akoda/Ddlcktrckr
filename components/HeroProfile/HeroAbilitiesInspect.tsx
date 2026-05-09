import { useHeroDataById } from "@/hooks/useHeroDataById";
import { LoadingIcon } from "../LoadingIcon";
import { CustomText } from "../CustomText";
import { View, Image } from "react-native";
import { useUnistyles, StyleSheet } from "react-native-unistyles";
import { AbilityDetails } from "./AbilityDetails";
import { useEffect, useState } from "react";
import {
	cleanDecimals,
	cleanDescription,
	valueNumberizer,
} from "@/api/decimaldescriptionTransform";
import { getProperties } from "@/api/getHeroAbilityInspectInfo";
import { AbilityPress } from "./AbilityPress";
import Animated, {
	Easing,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSequence,
	withTiming,
} from "react-native-reanimated";
type Props = {
	id: number;
	match: any;
};
const AnimatedCustomText = Animated.createAnimatedComponent(CustomText);
export const HeroAbilitiesInspect = ({ id, match }: Props) => {
	const { theme } = useUnistyles();
	const [upgrade, setUpgrade] = useState([]);
	const [upgradeSelected, setUpgradeSelected] = useState(-1);

	const textColor = useSharedValue(0);

	useEffect(() => {
		textColor.value = withSequence(
			withTiming(1, {
				duration: 150,
				easing: Easing.in(Easing.ease),
			}),
			withDelay(
				150,
				withTiming(0, {
					duration: 150,
					easing: Easing.in(Easing.ease),
				}),
			),
		);
	}, [upgrade, textColor]);

	const animatedStyles = useAnimatedStyle(() => ({
		color: interpolateColor(
			textColor.value,
			[0, 1],
			[theme.colors.font, theme.colors.ability],
		),
	}));
	const cheapTrick = useAnimatedStyle(() => ({
		color: interpolateColor(
			textColor.value,
			[0, 1],
			[theme.colors.font, theme.colors.font],
		),
	}));

	const { heroDataById, isIdError, isIdLoading, idError } = useHeroDataById(
		String(id),
	);
	if (isIdLoading) return <LoadingIcon />;
	if (isIdError) return <CustomText>{String(idError)}</CustomText>;

	const rawProperties = Object.entries(match?.properties).map(
		([key, value]) => {
			return [key, value];
		},
	);
	const numbers = [1, 2, 5];

	const foundUpgrade = (detail: any): any => {
		return upgrade?.find((u: any) => u.name === detail);
	};

	const sinclairUltUpgrade = [
		[{ name: cleanDescription(match.description.t1_desc) }],
		[{ name: cleanDescription(match.description.t2_desc) }],
		[{ name: cleanDescription(match.description.t3_desc) }],
	];
	const upgradeArray = match.upgrades.map((bonus: any, index: number) => {
		return bonus.property_upgrades;
	});

	let upgrades = upgradeArray.map((upgrade: any) => {
		return upgrade;
	});

	if (
		(upgrades[0].length === 0,
		upgrades[1].length === 0,
		upgrades[2].length === 0)
	) {
		upgrades = sinclairUltUpgrade;
	}

	const upgradesIndexOne = upgrades[0].concat(upgrades[1]);
	const upgradesIndexTwo = upgrades[0].concat(upgrades[1], upgrades[2]);

	let propertyArray = Object.entries(match?.properties).map(([key, value]) => {
		return [key, value];
	});

	const basicPropsArr1 =
		match.tooltip_details?.info_sections?.[0]?.basic_properties;
	const basicPropsArr2 =
		match.tooltip_details?.info_sections?.[1]?.basic_properties;
	const basicPropsArr3 =
		match.tooltip_details?.info_sections?.[2]?.basic_properties;

	let importantProperties: any[] = [];
	const toImportant = (arr: any[]) =>
		arr.map((property: any) => ({ important_property: property }));

	if (basicPropsArr1 && basicPropsArr2) {
		importantProperties = toImportant(basicPropsArr2.concat(basicPropsArr1));
	} else if (basicPropsArr1) {
		importantProperties = toImportant(basicPropsArr1);
	} else if (basicPropsArr2) {
		importantProperties = toImportant(basicPropsArr2);
	} else if (basicPropsArr3) {
		importantProperties = toImportant(basicPropsArr3);
	}
	let impPropsArray = getProperties(match);
	impPropsArray = impPropsArray.filter((property: any) => {
		return property !== undefined;
	});

	importantProperties = importantProperties.concat(impPropsArray);

	importantProperties = importantProperties.map((importantProperty: any) => {
		return importantProperty.important_property.slice(0, 12) === "StatusEffect"
			? { important_property: importantProperty.status_effect_value }
			: importantProperty;
	});

	importantProperties = importantProperties.map((importantProperty: any) => {
		return importantProperty.important_property;
	});

	propertyArray = propertyArray.filter((p: any) =>
		importantProperties.some((m: any) => p[0] === m && p[0] !== "SigilRadius"),
	);

	propertyArray.map((p: any) => {
		return p[1].scale_function?.specific_stat_scale_type === "ELightMeleeDamage"
			? (p[1].value =
					heroDataById.starting_stats.light_melee_damage.value *
					p[1].scale_function.stat_scale)
			: p;
	});

	propertyArray = propertyArray.filter(
		(p: any) =>
			valueNumberizer(p[1]?.value) !== 0 && valueNumberizer(p[1]?.value) !== -1,
	);

	const upgradeRelationArray = upgrades.map((up: any) => {
		return rawProperties.find((u: any) => up[0].name === u[0]);
	});
	return (
		<View
			style={{
				backgroundColor: theme.colors.background,
				width: 350,
				zIndex: 4,
				alignSelf: "center",
				borderRadius: 16,
				borderCurve: "continuous",
				borderWidth: 2,
				borderColor: theme.colors.secondary,
			}}>
			<AbilityDetails upgrade={upgrade} match={match} />
			<CustomText
				style={{
					width: 322,
					zIndex: 6,
					textAlign: "left",
					color: theme.colors.font,
					fontFamily: theme.fontFamily.regular,
					fontSize: 12,
					padding: 8,
					marginHorizontal: 12,
					marginBottom: 6,
					marginTop: 3,
					borderWidth: 2,
					borderRadius: 16,
					borderCurve: "continuous",
					borderColor: theme.colors.accent,
				}}>
				{match.description.desc
					? cleanDescription(match.description.desc)
					: cleanDescription(match.tooltip_details.info_sections[0].loc_string)}
			</CustomText>
			<View
				style={{
					width: 320,
					minHeight: 50,
					flexDirection: "column",
					marginBottom: 6,
					alignSelf: "center",
					marginLeft: 12,
					marginRight: 6,
				}}>
				<View
					style={{
						flexDirection: "row",
						width: 320,
						flexWrap: "wrap",
					}}>
					{propertyArray.map((ability: any, index) => {
						return (
							<View
								key={index}
								style={{
									minWidth: 100,
									height: 50,
									borderWidth: 2,
									flex: 1,
									borderRadius: 16,
									borderCurve: "continuous",
									marginTop: 6,
									marginRight: 6,
									backgroundColor: theme.colors.primary,
									borderColor: theme.colors.secondary,
									flexDirection: "column",
									alignSelf: "center",
									justifyContent: "center",
								}}>
								<CustomText
									style={{
										color: theme.colors.font,
										fontSize: 9,
										fontFamily: theme.fontFamily.regular,
										textAlign: "center",
									}}>
									{ability[1].label}
								</CustomText>
								<AnimatedCustomText
									style={
										foundUpgrade(ability[0]) !== undefined
											? [animatedStyles, styles.propertyText]
											: [styles.propertyText, cheapTrick]
									}>
									{ability[1].prefix === "{s:sign}" ? "+" : ability[1].prefix}
									{foundUpgrade(ability[0]) !== undefined &&
									ability[1] !== undefined
										? cleanDecimals(valueNumberizer(ability[1].value)) +
											valueNumberizer(foundUpgrade(ability[0]).bonus)
										: cleanDecimals(valueNumberizer(ability[1].value))}
									{ability[1]?.postfix === " m" ? "m" : ability[1]?.postfix}
								</AnimatedCustomText>
							</View>
						);
					})}
				</View>
			</View>
			<View
				style={{
					flexDirection: "row",
					marginBottom: 6,
					alignSelf: "center",
					justifyContent: "space-evenly",
					width: 345,
				}}>
				{numbers.map((num) => {
					return (
						<View
							key={num}
							style={{
								width: 110,
								flexDirection: "row",
								justifyContent: "center",
							}}>
							<Image
								source={require("../../images/20px-Ability_point.png")}
								style={{
									alignSelf: "center",
									width: 15,
									height: 15,
									tintColor: theme.colors.accent,
								}}
							/>
							<CustomText
								style={{
									color: theme.colors.accent,
									fontSize: 14,
									paddingLeft: 4,
									alignSelf: "center",
								}}>
								{num}
							</CustomText>
						</View>
					);
				})}
			</View>

			<View
				style={{
					flexDirection: "row",
					alignSelf: "center",
					justifyContent: "space-evenly",
					width: 345,
					marginBottom: 4,
				}}>
				<AbilityPress
					match={match}
					setUpgrade={setUpgrade}
					setUpgradeSelected={setUpgradeSelected}
					styles={styles}
					upgradeRelationArray={upgradeRelationArray}
					upgradeSelected={upgradeSelected}
					upgrades={upgrades}
					upgradesIndexOne={upgradesIndexOne}
					upgradesIndexTwo={upgradesIndexTwo}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	inspectAbility: {
		zIndex: 6,
		textAlign: "center",
		flexDirection: "column",
		backgroundColor: theme.colors.primary,
		fontSize: 11,
		width: 110,
		height: 70,
		paddingTop: 4,
		paddingBottom: 4,
		borderWidth: 1,
		borderRadius: 16,
		borderCurve: "continuous",
		borderColor: theme.colors.primary,
	},
	inspectAbilitySelected: {
		zIndex: 6,
		textAlign: "center",
		flexDirection: "column",
		backgroundColor: theme.colors.primary,
		fontSize: 11,
		width: 110,
		height: 70,
		paddingTop: 4,
		paddingBottom: 4,
		borderWidth: 1,
		borderRadius: 16,
		borderCurve: "continuous",
		borderColor: theme.colors.accent,
	},
	inspectAbilityText: {
		zIndex: 6,
		alignSelf: "center",
		textAlign: "center",
		flexDirection: "column",
		color: theme.colors.font,
		fontSize: 8,
		fontFamily: theme.fontFamily.regular,
		marginHorizontal: 5,
	},
	propertyText: {
		color: theme.colors.font,
		fontSize: 9,
		fontFamily: theme.fontFamily.regular,
		textAlign: "center",
	},
}));
