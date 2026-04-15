import { useHeroDataById } from "@/hooks/useHeroDataById";
import { LoadingIcon } from "../LoadingIcon";
import { CustomText } from "../CustomText";
import { Dimensions, Pressable, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { heroMoves } from "../../data/moves";
import { Image } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { AbilityDetails } from "./AbilityDetails";
import { useState } from "react";
import {
	cleanDecimals,
	cleanDescription,
	cleanUpgrade,
	valueNumberizer,
} from "@/api/decimaldescriptionTransform";
type Props = {
	id: number;
	match: any;
	abilityInspect: number;
};

export const HeroAbilitiesInspect = ({ id, match, abilityInspect }: Props) => {
	const { theme } = useUnistyles();
	const [upgrade, setUpgrade] = useState([]);
	const [upgradeSelected, setUpgradeSelected] = useState(-1);

	const { heroDataById, isIdError, isIdLoading, idError } = useHeroDataById(
		String(id)
	);
	if (isIdLoading) return <LoadingIcon />;
	if (isIdError) return <CustomText>{String(idError)}</CustomText>;

	const rawProperties = Object.entries(match?.properties).map(
		([key, value]) => {
			return [key, value];
		}
	);
	const numbers = [1, 2, 5];

	const foundUpgrade = (detail: any) => {
		return upgrade?.find((u: any) => u.name == detail);
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
		(upgrades[0].length == 0, upgrades[1].length == 0, upgrades[2].length == 0)
	) {
		upgrades = sinclairUltUpgrade;
	}

	const upgradesIndexOne = upgrades[0].concat(upgrades[1]);
	const upgradesIndexTwo = upgrades[0].concat(upgrades[1], upgrades[2]);
	let propertyArray = Object.entries(match?.properties).map(([key, value]) => {
		return [key, value];
	});

	const impPropsInf0_1 =
		match.tooltip_details?.info_sections?.[0]?.properties_block?.[0]
			?.properties;
	const impPropInf0_2 =
		match.tooltip_details?.info_sections?.[0]?.properties_block?.[1]
			?.properties;
	const impPropsInf0_3 =
		match.tooltip_details?.info_sections?.[0]?.properties_block?.[2]
			?.properties;
	const impPropsInf1_0 =
		match.tooltip_details?.info_sections?.[1]?.properties_block?.[0]
			?.properties;
	const impPropsInf1_1 =
		match.tooltip_details?.info_sections?.[1]?.properties_block?.[1]
			?.properties;
	const impPropsInf2_0 =
		match.tooltip_details?.info_sections?.[2]?.properties_block?.[0]
			?.properties;
	const impPropsInf2_1 =
		match.tooltip_details?.info_sections?.[2]?.properties_block?.[1]
			?.properties;

	let impPropsArray = [
		impPropsInf0_1,
		impPropInf0_2,
		impPropsInf0_3,
		impPropsInf1_0,
		impPropsInf1_1,
		impPropsInf2_0,
		impPropsInf2_1,
	].flat();

	const basicPropsArr1 =
		match.tooltip_details?.info_sections?.[0]?.basic_properties;
	const basicPropsArr2 =
		match.tooltip_details?.info_sections?.[1]?.basic_properties;
	const basicPropsArr3 =
		match.tooltip_details?.info_sections?.[2]?.basic_properties;

	let importantProperties = [];

	if (basicPropsArr3 && !basicPropsArr1 && !basicPropsArr2) {
		const basicProps = basicPropsArr3.map((property: any) => {
			return { important_property: property };
		});
		importantProperties = basicProps ? basicProps : [];
	}
	if (basicPropsArr1) {
		const basicProps = basicPropsArr1.map((property: any) => {
			return { important_property: property };
		});
		importantProperties = basicProps ? basicProps : [];
	}
	if (basicPropsArr2) {
		const basicProps = basicPropsArr2.map((property: any) => {
			return { important_property: property };
		});
		importantProperties = basicProps ? basicProps : [];
	}

	if (basicPropsArr1 && basicPropsArr2) {
		const basicProps = basicPropsArr2
			.concat(basicPropsArr1)
			.map((property: any) => {
				return { important_property: property };
			});
		importantProperties = basicProps ? basicProps : [];
	}

	impPropsArray = impPropsArray.filter((property: any) => {
		return property !== undefined;
	});
	importantProperties = importantProperties.concat(impPropsArray);

	importantProperties = importantProperties.map((importantProperty: any) => {
		return importantProperty.important_property.slice(0, 12) == "StatusEffect"
			? { important_property: importantProperty.status_effect_value }
			: importantProperty;
	});

	importantProperties = importantProperties.map((importantProperty: any) => {
		return importantProperty.important_property;
	});

	propertyArray = propertyArray.filter((p: any) =>
		importantProperties.some((m: any) => p[0] == m && p[0] !== "SigilRadius")
	);

	propertyArray.map((p: any) => {
		return p[1].scale_function?.specific_stat_scale_type == "ELightMeleeDamage"
			? (p[1].value =
					heroDataById.starting_stats.light_melee_damage.value *
					p[1].scale_function.stat_scale)
			: p;
	});

	propertyArray = propertyArray.filter(
		(p: any) =>
			valueNumberizer(p[1]?.value) !== 0 && valueNumberizer(p[1]?.value) !== -1
	);

	if (upgrade !== undefined && upgrade) {
		const shit = propertyArray.map((propertyOMG: any) => {
			return upgrade.find((up: any) => {
				return up.name == propertyOMG[0];
			});
		});
	}
	console.log(upgrade);
	const upgradeRelationArray = upgrades.map((up: any) => {
		return rawProperties.find((u: any) => up[0].name == u[0]);
	});
	return (
		<View
			style={{
				backgroundColor: theme.colors.background,
				width: 350,
				zIndex: 4,
				alignSelf: "center",
				borderRadius: 4,
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
					borderRadius: 4,
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
									borderRadius: 4,
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
								<CustomText
									style={
										foundUpgrade([ability[0]]) !== undefined
											? styles.upgradedPropertyText
											: styles.propertyText
									}>
									{ability[1].prefix == "{s:sign}" ? "+" : ability[1].prefix}
									{foundUpgrade(ability[0]) !== undefined &&
									ability[1] !== undefined
										? cleanDecimals(valueNumberizer(ability[1].value)) +
										  valueNumberizer(foundUpgrade(ability[0]).bonus)
										: cleanDecimals(valueNumberizer(ability[1].value))}
									{ability[1]?.postfix == " m" ? "m" : ability[1]?.postfix}
								</CustomText>
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
				{upgrades.map((uMap: any, index: number) => {
					return (
						<View
							key={index}
							style={
								index <= upgradeSelected
									? styles.inspectAbilitySelected
									: styles.inspectAbility
							}>
							<Pressable
								style={{ width: 110, height: 70, alignContent: "center" }}
								onPress={() =>
									index == upgradeSelected && upgradeSelected == 2
										? (setUpgrade(
												upgradesIndexOne.map((i: any) => {
													return { name: i.name, bonus: i.bonus };
												})
										  ),
										  setUpgradeSelected(1))
										: index == upgradeSelected && upgradeSelected == 1
										? (setUpgrade(
												upgrades[0].map((i: any) => {
													return { name: i.name, bonus: i.bonus };
												})
										  ),
										  setUpgradeSelected(0))
										: index == upgradeSelected && upgradeSelected == 0
										? (setUpgrade([]), setUpgradeSelected(-1))
										: index == 0
										? (setUpgrade(
												upgrades[0].map((i: any) => {
													return { name: i.name, bonus: i.bonus };
												})
										  ),
										  setUpgradeSelected(0))
										: index == 1
										? (setUpgrade(
												upgradesIndexOne.map((i: any) => {
													return { name: i.name, bonus: i.bonus };
												})
										  ),
										  setUpgradeSelected(1))
										: (setUpgrade(
												upgradesIndexTwo.map((i: any) => {
													return { name: i.name, bonus: i.bonus };
												})
										  ),
										  setUpgradeSelected(2))
								}>
								{match.description.t1_desc && index + 1 == 1 ? (
									<CustomText style={styles.inspectAbilityText}>
										{cleanUpgrade(match.description.t1_desc)}
									</CustomText>
								) : match.description.t2_desc && index + 1 == 2 ? (
									<CustomText style={styles.inspectAbilityText}>
										{cleanUpgrade(match.description.t2_desc)}
									</CustomText>
								) : match.description.t3_desc && index + 1 == 3 ? (
									<CustomText style={styles.inspectAbilityText}>
										{cleanUpgrade(match.description.t3_desc)}
									</CustomText>
								) : (
									uMap.map((u: any, index1: number) => {
										return (
											<CustomText
												style={styles.inspectAbilityText}
												key={index1}>
												{valueNumberizer(u.bonus)}
												{upgradeRelationArray[index][1].postfix == " m"
													? "m"
													: upgradeRelationArray[index][1].postfix}{" "}
												{upgradeRelationArray[index][1].label}
											</CustomText>
										);
									})
								)}
							</Pressable>
						</View>
					);
				})}
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
		borderRadius: 4,
		borderColor: theme.colors.primary,
		fontFamily: theme.fontFamily.regular,
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
		borderRadius: 4,
		borderColor: theme.colors.accent,
		fontFamily: theme.fontFamily.regular,
	},
	inspectAbilityText: {
		zIndex: 6,
		alignSelf: "center",
		textAlign: "center",
		flexDirection: "column",
		color: theme.colors.font,
		fontSize: 9,
		fontFamily: theme.fontFamily.regular,
		marginHorizontal: 5,
	},
	propertyText: {
		color: theme.colors.font,
		fontSize: 9,
		fontFamily: theme.fontFamily.regular,
		textAlign: "center",
		padding: 0.5,
	},
	upgradedPropertyText: {
		color: theme.colors.font,
		fontSize: 9,
		fontFamily: theme.fontFamily.regular,
		textAlign: "center",
		borderBottomColor: theme.colors.accent,
		borderWidth: 0.5,
		borderColor: theme.colors.background,
		alignSelf: "center",
	},
}));
