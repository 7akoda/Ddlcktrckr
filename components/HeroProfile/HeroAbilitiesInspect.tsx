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
type Props = {
	id: number;
	match: any;
	abilityInspect: number;
};

export const HeroAbilitiesInspect = ({ id, match, abilityInspect }: Props) => {
	const { theme } = useUnistyles();
	const [upgrade, setUpgrade] = useState();
	const [upgradeSelected, setUpgradeSelected] = useState(-1);

	const { heroDataById, isIdError, isIdLoading, idError } = useHeroDataById(
		String(id)
	);
	if (isIdLoading) return <LoadingIcon />;
	if (isIdError) return <CustomText>{String(idError)}</CustomText>;
	const formatDesc = (desc: string) => {
		return desc
			.replace(/<[^>]*>/g, "")
			.replace(/&nbsp;/g, " ")
			.replace(/&amp;/g, "&")
			.replace(/.A/g, ". A")
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&quot;/g, '"')
			.replace(/{g:citadel_binding:'Attack'}/g, "Attack ")
			.replace(/{g:citadel_binding:'AltCast'}/g, "Alt Cast ")
			.replace(/{g:citadel_binding:'MoveForward'}/g, "Move forward ")
			.replace(/{g:citadel_binding:'MoveDown'}/g, "Move down ")
			.replace(/{g:citadel_binding:'Mantle'}/g, " mantle ")
			.replace(/orAttack/, "or Attack")
			.replace(/{g:citadel_binding:'Ability1'}/g, " Ability 1 ")
			.replace(/{g:citadel_binding:'Ability2'}/g, "Ability 2 ")
			.replace(/{g:citadel_binding:'Ability3'}/g, "Ability 3 ")
			.replace(/{g:citadel_binding:'Ability4'}/g, "Ability 4 ")
			.replace(/\s+/g, " ")
			.trim();
	};

	const numbers = [1, 2, 5];

	const upgradeArray = match.upgrades.map((bonus: any, index: number) => {
		return bonus.property_upgrades;
	}); // upgrades are in ^ 0 1 2	 index positions
	const upgrades = upgradeArray.map((upgrade: any) => {
		return upgrade;
	});
	const upgradesIndexOne = upgrades[0].concat(upgrades[1]);
	const upgradesIndexTwo = upgrades[0].concat(upgrades[1], upgrades[2]);
	console.log(upgrade);
	return (
		<View
			style={{
				backgroundColor: theme.colors.background,
				width: 350,
				zIndex: 4,
				alignSelf: "center",
				borderRadius: 4,
				borderWidth: 2,
				borderColor: theme.colors.bannerFont,
			}}>
			<AbilityDetails upgrade={upgrade} match={match} />
			<CustomText
				style={{
					zIndex: 6,
					textAlign: "center",
					color: theme.colors.font,
					fontFamily: theme.fontFamily.regular,
					fontSize: 12,
					padding: 8,
					marginHorizontal: 12,
					marginBottom: 12,
					marginTop: 3,
					borderWidth: 2,
					borderRadius: 4,
					borderColor: theme.colors.accent,
				}}>
				{match.description.desc
					? formatDesc(match.description.desc)
					: formatDesc(match.tooltip_details.info_sections[0].loc_string)}
			</CustomText>
			<View
				style={{
					flexDirection: "row",
					marginBottom: 12,
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
										? (setUpgrade(undefined), setUpgradeSelected(-1))
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
								{uMap.map((u: any, index: number) => {
									return (
										<CustomText style={styles.inspectAbilityText} key={index}>
											{u.name} {u.bonus}
										</CustomText>
									);
								})}
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
	},
}));
