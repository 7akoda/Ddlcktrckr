import {
	View,
	Pressable,
	Dimensions,
	ScrollView,
	useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import { useUnistyles, StyleSheet } from "react-native-unistyles";
import { Header } from "./Header";
import { LoadingIcon } from "./LoadingIcon";
import { CustomText } from "./CustomText";
import { ItemImages } from "../data/items";
import { CooldownSvg } from "./svgComponents/CooldownSvg";
import { useItemData } from "@/hooks/useItemData";
import { Link } from "expo-router";
import { BlurView } from "expo-blur";
import { act, useEffect, useState } from "react";
import { ItemIcon } from "./ItemIcon";
import React from "react";

type Props = {
	itemId: string[] | string;
};

//fortitude issue

export const ItemProfile = ({ itemId }: Props) => {
	const { theme, rt } = useUnistyles();
	const { width, height } = useWindowDimensions();
	const [particleColor, setParticleColor] = useState<string>("#FF9900");

	const { itemData, isError, isLoading, error } = useItemData();
	const foundItem = itemData?.find((item: any) => item.name === itemId);

	useEffect(() => {
		if (!foundItem) return;

		if (foundItem.item_slot_type == "spirit") {
			setParticleColor("#CE90FF");
		} else if (foundItem.item_slot_type == "vitality") {
			setParticleColor("#00FF99");
		} else {
			setParticleColor("#FF9900");
		}
	}, [foundItem?.item_slot_type]);

	if (isLoading) {
		return <LoadingIcon />;
	}

	if (isError) {
		console.error("Hero stats error:", error);
		return (
			<CustomText style={{ color: "#EADEDA" }}>
				Failed to load hero data.
			</CustomText>
		);
	}

	console.log(foundItem.id);

	const cleanDescription = (desc: string) => {
		if (!desc) return "";

		let cleaned = desc.replace(/<svg[\s\S]*?<\/svg>/gi, "");
		let superCleaned = cleaned.replace(
			/{g:citadel_binding:'Reload'}/,
			"reload"
		);

		superCleaned = superCleaned.replace(/<[^>]+>/g, "");

		try {
			const { decode } = require("he");
			superCleaned = decode(superCleaned);
		} catch {}

		superCleaned = superCleaned.replace(/\s+/g, " ").trim();

		return superCleaned;
	};

	const description = foundItem.description.desc ? (
		cleanDescription(foundItem.description.desc)
	) : foundItem.description.active && foundItem.description.passive ? (
		<>
			<CustomText
				style={{
					color: theme.colors.font,
					flexDirection: "column",
					marginHorizontal: 6,
					marginVertical: 4,
					lineHeight: 15,
					fontSize: 12,
					fontFamily: theme.fontFamily.regular,
				}}>
				{cleanDescription(foundItem.description.passive)}

				{"\n"}
			</CustomText>
			<CustomText
				style={{
					color: theme.colors.font,
					flexDirection: "column",
					marginHorizontal: 6,
					marginVertical: 4,
					lineHeight: 15,
					fontSize: 12,
					fontFamily: theme.fontFamily.regular,
				}}>
				{cleanDescription(foundItem.description.active)}
			</CustomText>
		</>
	) : foundItem.description.active ? (
		cleanDescription(foundItem.description.active)
	) : foundItem.description.passive ? (
		cleanDescription(foundItem.description.passive)
	) : foundItem.tooltip_sections?.[1]?.section_attributes?.[0]?.loc_string ? (
		cleanDescription(
			foundItem.tooltip_sections[1].section_attributes[0].loc_string
		)
	) : (
		""
	);

	const allItemsForImages = Object.values(ItemImages).flatMap((category) =>
		Object.values(category).flat()
	);

	const foundItemForImages = allItemsForImages.find(
		(item) => item.Name === itemId
	);

	let unNamedStats: string[] = [];
	const unNamed = foundItem.tooltip_sections?.[1]?.section_type;
	console.log(unNamed);
	const unNamedSection =
		foundItem.tooltip_sections?.[1]?.section_attributes?.[0];
	if (unNamed !== "passive" && unNamed !== "active" && unNamed !== undefined) {
		const unNamedProps = [
			...(unNamedSection.properties ?? []),
			...(unNamedSection.important_properties ?? []),
		];
		unNamedStats = unNamedProps.map((key, index: number) => {
			const prop = foundItem.properties[key];
			console.log("from unNamedStats: " + key);
			return index <= unNamedProps.length && key !== "AbilityCooldown" ? (
				<React.Fragment key={key}>
					<CustomText
						style={{
							color: theme.colors.font,
							flexDirection: "column",
							marginHorizontal: 6,
							marginVertical: 6,
							lineHeight: 15,
							fontSize: 12,
							fontFamily: theme.fontFamily.regular,
						}}>
						{prop.value}
						{prop.postfix == prop.value[prop.value.length - 1]
							? ""
							: prop.postfix}
						{" " + prop.label}
						{index !== unNamedProps.length - 1 && key !== "AbilityCooldown"
							? `\n`
							: null}
					</CustomText>
				</React.Fragment>
			) : null;
		});
	}

	const innateSection = foundItem.tooltip_sections.find(
		(section: any) => section.section_type === "innate"
	);

	let innateStats: string[] = [];

	if (innateSection) {
		const innateProps = [
			...(innateSection?.section_attributes?.[0]?.properties ?? []),
			...(innateSection?.section_attributes?.[0]?.elevated_properties ?? []),
		];

		innateStats = innateProps.map((key, index: number) => {
			const prop = foundItem.properties[key];
			return index !== 0 && prop.value !== ""
				? `\n${prop.value}${prop.postfix || ""} ${prop.label}`
				: prop.value !== ""
				? `${prop.value}${prop.postfix || ""} ${prop.label}`
				: null;
		});
	}

	const activeSection = foundItem.tooltip_sections.find(
		(section: any) => section.section_type === "active"
	);
	let activeStats: string[] = [];
	if (activeSection) {
		const activeProps = [
			...(activeSection?.section_attributes?.[0]?.properties ?? []),
			...(activeSection?.section_attributes?.[0]?.important_properties ?? []),
		];
		activeStats = activeProps.map((key, index: number) => {
			if (
				key !== "StatusEffectEMP" &&
				key !== "StatusEffectDisarmed" &&
				key !== "StatusEffectStun"
			) {
				const prop = foundItem.properties[key];
				const value = String(prop.value);
				const scale = prop?.scale_function?.stat_scale;
				const scaleType = prop?.scale_function?.specific_stat_scale_type;
				const postfix = prop.postfix == undefined ? "" : String(prop.postfix);
				const label = String(prop.label);
				const conditional = prop.tooltip_is_important ? " (Conditional)" : "";
				console.log("from activeStats: " + key);
				return prop.value !== undefined && key !== "AbilityCooldown" ? (
					<React.Fragment key={key}>
						<CustomText
							style={{
								color: theme.colors.font,
								flexDirection: "column",
								marginHorizontal: 6,
								marginVertical: 6,
								lineHeight: 15,
								fontSize: 12,
								fontFamily: theme.fontFamily.regular,
							}}>
							{value}
							{postfix == value[value.length - 1] ? "" : postfix}{" "}
							{scaleType == "ETechPower" ? (
								<>
									<CustomText> </CustomText>
									<Image
										source={require("../images/25px-Spirit_scaling.png")}
										style={{ width: 12, height: 10 }}
									/>
									<CustomText
										style={{
											color: "#CE90FF",
											flexDirection: "column",
											marginHorizontal: 6,
											marginVertical: 6,
											lineHeight: 15,
											fontSize: 12,
											fontFamily: theme.fontFamily.regular,
										}}>
										{scale ?? ""}
									</CustomText>
								</>
							) : scaleType == "ELevelUpBoons" ? (
								<>
									<CustomText> </CustomText>
									<Image
										source={require("../images/20px-Boon_scaling.png")}
										style={{ width: 12, height: 10 }}
									/>
									<CustomText
										style={{
											color: "##00FF99",
											flexDirection: "column",
											marginHorizontal: 6,
											marginVertical: 6,
											lineHeight: 15,
											fontSize: 12,
											fontFamily: theme.fontFamily.regular,
										}}>
										{scale ?? ""}
									</CustomText>
								</>
							) : (
								""
							)}
							{" " + label}
							{conditional}
							{index !== activeProps.length - 1 ? `\n` : null}
						</CustomText>
					</React.Fragment>
				) : null;
			} else if (index !== activeProps.length - 1) {
				return key == "StatusEffectEMP"
					? `Silenced Status Effect\n`
					: key == "StatusEffectDisarmed"
					? `Disarmed Status Effect\n`
					: key == "StatusEffectStun"
					? `Stun Status Effect\n`
					: null;
			} else if (index == activeProps.length - 1) {
				return key == "StatusEffectEMP"
					? `Silenced Status Effect`
					: key == "StatusEffectDisarmed"
					? `Disarmed Status Effect`
					: key == "StatusEffectStun"
					? `Stun Status Effect`
					: null;
			}
		});
	}

	const passiveSection = foundItem.tooltip_sections.find(
		(section: any) => section.section_type === "passive"
	);
	let passiveStats: string[] = [];
	if (passiveSection) {
		const passiveProps = [
			...(passiveSection?.section_attributes?.[0]?.properties ?? []),

			...(passiveSection?.section_attributes?.[0]?.important_properties ?? []),
			...(passiveSection?.section_attributes?.[0]?.elevated_properties ?? []),
		];
		passiveStats = passiveProps.map((key, index: number) => {
			if (
				key !== "StatusEffectEMP" &&
				key !== "StatusEffectDisarmed" &&
				key !== "StatusEffectStun" &&
				key !== "ParrySuccessHeal" &&
				key !== "StatusEffectInvisible"
			) {
				const prop = foundItem.properties[key];
				const value = String(prop.value);
				const scale = prop?.scale_function?.stat_scale;
				const scaleType = prop?.scale_function?.specific_stat_scale_type;
				const postfix = prop.postfix == undefined ? "" : String(prop.postfix);
				const label = String(prop.label);
				const conditional = prop.tooltip_is_important ? " (Conditional)" : "";
				console.log("from passiveStats: " + key);
				console.log();
				return prop.value !== undefined && key !== "AbilityCooldown" ? (
					<React.Fragment key={key}>
						<CustomText
							style={{
								color: theme.colors.font,
								flexDirection: "column",
								marginHorizontal: 6,
								marginVertical: 6,
								lineHeight: 15,
								fontSize: 12,
								fontFamily: theme.fontFamily.regular,
							}}>
							{value}
							{postfix == value[value.length - 1] ||
							postfix[postfix.length - 1] == value[value.length - 1]
								? ""
								: postfix}{" "}
							{scaleType == "ETechPower" ? (
								<>
									<CustomText> </CustomText>
									<Image
										source={require("../images/25px-Spirit_scaling.png")}
										style={{ width: 12, height: 10 }}
									/>
									<CustomText
										style={{
											color: "#CE90FF",
											flexDirection: "column",
											marginHorizontal: 6,
											marginVertical: 6,
											lineHeight: 15,
											fontSize: 12,
											fontFamily: theme.fontFamily.regular,
										}}>
										{scale ?? ""}
									</CustomText>
								</>
							) : scaleType == "ELevelUpBoons" ? (
								<>
									<CustomText> </CustomText>
									<Image
										source={require("../images/20px-Boon_scaling.png")}
										style={{ width: 10, height: 8 }}
									/>
									<CustomText
										style={{
											color: "#00FF99",
											flexDirection: "column",
											marginHorizontal: 6,
											marginVertical: 6,
											lineHeight: 15,
											fontSize: 12,
											fontFamily: theme.fontFamily.regular,
										}}>
										{scale ?? ""}
									</CustomText>
								</>
							) : (
								""
							)}
							{" " + label}
							{conditional}
							{index !== passiveProps.length - 1 ? `\n` : null}
						</CustomText>
					</React.Fragment>
				) : null;
			} else if (index !== passiveProps.length - 1) {
				return key == "StatusEffectEMP"
					? `Silenced Status Effect\n`
					: key == "StatusEffectDisarmed"
					? `Disarmed Status Effect\n`
					: key == "StatusEffectStun"
					? `Stun Status Effect\n`
					: key == "StatusEffectInvisible"
					? `Invisible Status Effect\n`
					: null;
			} else if (index == passiveProps.length - 1) {
				return key == "StatusEffectEMP"
					? `Silenced Status Effect`
					: key == "StatusEffectDisarmed"
					? `Disarmed Status Effect`
					: key == "StatusEffectStun"
					? `Stun Status Effect`
					: key == "StatusEffectInvisible"
					? `Invisible Status Effect`
					: null;
			}
		});
	}

	return (
		<View
			style={{
				height: height,
				width: width,
				backgroundColor: theme.colors.background,
			}}>
			<Header back={true} sortable={false} />
			<ItemIcon itemColour={particleColor} />

			{/* {rt.themeName === "dark" ? (
					<>
						<Image
							style={{ width: 1390, height: 900 }}
							source={require("../images/Background_Buildings.png")}></Image>
					</>
				) : (
					<Image
						style={{
							width: 1390,
							height: 900,
						}}
						source={require("../images/Background_Buildings_Light.png")}></Image>
				)} */}
			<View style={styles.itemViewPAPA}>
				<View style={styles.itemView}>
					<BlurView
						tint={rt.themeName === "dark" ? "dark" : "light"}
						intensity={0}
						style={{
							flexDirection: "row",
							alignSelf: "center",
							borderRadius: 4,
							overflow: "hidden",
							width: 300,
							padding: 6,
							marginTop: 20,
							borderWidth: 1,
						}}>
						<Image
							source={foundItemForImages.Image}
							style={{
								width: 100,
								height: 100,
								alignSelf: "center",
								borderRadius: 4,
								borderWidth: 1,
							}}
						/>
						<View style={{ marginLeft: 10, justifyContent: "center", flex: 1 }}>
							<CustomText
								style={{
									color: theme.colors.font,
									margin: 4,
									fontSize: 27,
									fontFamily: theme.fontFamily.extraBold,
								}}>
								{foundItem.name}
							</CustomText>
							<View style={{ flexDirection: "row", marginLeft: 4, width: 95 }}>
								<Image
									source={require("../images/28px-Souls.png")}
									style={{
										height: 30,
										width: 19,
										padding: 3,
									}}></Image>
								<CustomText
									style={{
										color: theme.colors.souls,
										flexDirection: "column",
										paddingTop: 5,
										paddingLeft: 1,
										fontSize: 14,
										fontFamily: theme.fontFamily.extraBold,
									}}>
									{foundItem.cost}
								</CustomText>
							</View>
						</View>
					</BlurView>
					{foundItem.properties.AbilityCooldown.value > 0 ? (
						<BlurView
							intensity={0}
							tint={rt.themeName === "dark" ? "dark" : "light"}
							style={{
								borderWidth: 1,
								height: 25,
								width: 300,
								alignSelf: "center",
								borderRadius: 4,
								overflow: "hidden",
								margin: 4,
								alignContent: "center",
								flexDirection: "row",
							}}>
							<CustomText
								style={{
									color: theme.colors.font,
									flexDirection: "column",
									alignSelf: "center",
									fontSize: 14,
									marginLeft: 8,
									fontFamily: theme.fontFamily.regular,
								}}>
								{foundItem.is_active_item ? "Active" : "Passive"}
							</CustomText>
							<View style={{ flex: 1 }} />
							<>
								<CooldownSvg />
								<CustomText
									style={{
										color: theme.colors.font,
										flexDirection: "column",
										alignSelf: "center",
										fontSize: 14,
										marginLeft: -9,
										marginRight: 8,
										fontFamily: theme.fontFamily.regular,
									}}>
									{foundItem.properties.AbilityCooldown.value}
									{foundItem.properties.AbilityCooldown.postfix}
								</CustomText>
							</>
						</BlurView>
					) : null}
					{innateStats.length > 0 && (
						<>
							<CustomText
								style={{
									alignSelf: "center",
									width: 350,
									color: theme.colors.font,
									flexDirection: "column",
									paddingHorizontal: 6,
									marginTop: 4,
									lineHeight: 15,
									fontSize: 12,
									fontFamily: theme.fontFamily.regular,
								}}>
								Innate:
							</CustomText>
							<CustomText
								style={{
									alignSelf: "center",
									width: 350,
									color: theme.colors.font,
									flexDirection: "column",
									paddingHorizontal: 6,
									marginBottom: 4,
									lineHeight: 15,
									fontSize: 12,
									fontFamily: theme.fontFamily.regular,
								}}>
								{innateStats}
							</CustomText>
						</>
					)}
					{description && (
						<BlurView
							tint={rt.themeName === "dark" ? "dark" : "light"}
							intensity={0}
							style={{
								borderWidth: 1,
								flexWrap: "wrap",
								width: 350,
								borderRadius: 4,
								overflow: "hidden",
								margin: 4,
								alignContent: "center",
								alignSelf: "center",
								flexDirection: "row",
							}}>
							<CustomText
								style={{
									color: theme.colors.font,
									flexDirection: "column",
									marginHorizontal: 6,
									marginVertical: 4,
									lineHeight: 15,
									fontSize: 12,
									fontFamily: theme.fontFamily.regular,
								}}>
								{description}
							</CustomText>
						</BlurView>
					)}

					{((activeStats.length != 0 || passiveStats.length != 0) &&
						!activeStats.every((i) => i == "")) ||
					!passiveStats.every((i) => i == "") ||
					!unNamedStats.every((i) => i == "") ? (
						<BlurView
							intensity={0}
							tint={rt.themeName === "dark" ? "dark" : "light"}
							style={{
								borderWidth: 1,

								borderRadius: 4,
								overflow: "hidden",
								width: 350,
								alignSelf: "center",
								marginHorizontal: 24,
								alignContent: "center",
								flexDirection: "row",
								marginBottom: 4,
							}}>
							<CustomText
								style={{
									color: theme.colors.font,
									flexDirection: "column",
									marginHorizontal: 6,
									marginVertical: 6,
									lineHeight: 15,
									fontSize: 12,
									fontFamily: theme.fontFamily.regular,
								}}>
								{activeStats && activeStats}
								{passiveStats && passiveStats}
								{unNamedStats && unNamedStats}
							</CustomText>
						</BlurView>
					) : null}
					{foundItemForImages.Upgrades.length > 0 ? (
						<BlurView
							intensity={0}
							tint={rt.themeName === "dark" ? "dark" : "light"}
							style={{
								borderWidth: 1,
								height: 30,
								borderRadius: 4,
								overflow: "hidden",
								width: 350,
								alignSelf: "center",
								marginHorizontal: 4,
								alignContent: "center",
								flexDirection: "row",
							}}>
							<CustomText
								style={{
									color: theme.colors.font,
									fontSize: 12,
									marginLeft: 6,
									alignSelf: "center",
									fontFamily: theme.fontFamily.regular,
								}}>
								Upgrades to: {""}
							</CustomText>
							{foundItemForImages.Upgrades.map(
								(upgrade: string, index: number) => {
									return (
										<View
											key={upgrade}
											style={{ alignSelf: "center", flexDirection: "row" }}>
											<Link
												href={{
													pathname: `/items/[itemId]`,
													params: { itemId: upgrade },
												}}
												push
												asChild>
												<Pressable style={{}}>
													{({ pressed }) => (
														<CustomText
															style={[
																styles.heroText,
																pressed && styles.heroTextFade,
															]}>
															{upgrade}
														</CustomText>
													)}
												</Pressable>
											</Link>
											{index < foundItemForImages.Upgrades.length - 1 ? (
												<CustomText
													style={{
														color: theme.colors.font,
														fontSize: 12,
														alignSelf: "center",
													}}>
													,{" "}
												</CustomText>
											) : (
												<CustomText
													style={{
														color: theme.colors.font,
														fontSize: 12,
														alignSelf: "center",
													}}></CustomText>
											)}
										</View>
									);
								}
							)}
						</BlurView>
					) : null}
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create((theme) => ({
	itemView: {
		zIndex: 3,
		alignSelf: "center",
	},
	itemViewPAPA: {
		zIndex: 3,
		justifyContent: "space-evenly",
	},
	heroText: {
		color: theme.colors.font,
		fontSize: 12,
		alignSelf: "center",
		textDecorationLine: "underline",
	},
	heroTextFade: {
		color: theme.colors.font,
		fontSize: 12,
		alignSelf: "center",
		opacity: 0.6,
		textDecorationLine: "underline",
	},
}));
