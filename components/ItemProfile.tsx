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
import { useEffect, useState } from "react";
import { ItemIcon } from "./ItemIcon";
import React from "react";
import {
	cleanDecimals,
	cleanDescription,
} from "@/api/decimaldescriptionTransform";
import { ActiveData } from "@/api/itemActive";
import { InnateData } from "@/api/itemInnate";
import { PassiveData } from "@/api/itemPassive";
import { UnNamedData } from "@/api/itemUnNamed";
type Props = {
	itemId: string[] | string;
};

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
		console.error("Item Data error:", error);
		return (
			<CustomText style={{ color: "#EADEDA" }}>
				Failed to load Item data.
			</CustomText>
		);
	}
	const innateSection = foundItem.tooltip_sections.find(
		(section: any) => section.section_type === "innate"
	);

	const passiveSection = foundItem.tooltip_sections.filter(
		(section: any) => section.section_type == "passive"
	);
	let passiveLengthBoolean = false;
	if (passiveSection) {
		if (passiveSection.length > 1) {
			passiveLengthBoolean = true;
		}
	}
	const activeSection = foundItem.tooltip_sections.find(
		(section: any) => section.section_type === "active"
	);
	let activeLengthBoolean = false;
	if (activeSection) {
		if (activeSection.section_attributes.length > 1) {
			activeLengthBoolean = true;
		}
	}
	const unNamedSection = foundItem.tooltip_sections.find((section: any) => {
		return (
			section.section_type !== "innate" &&
			section.section_type !== "passive" &&
			section.section_type !== "active"
		);
	});

	const passiveSectionFound = foundItem.tooltip_sections.find(
		(section: any) => section.section_type == "passive"
	);

	const hasUnNamed = !!unNamedSection;
	const hasPassive = !!passiveSectionFound;
	const hasActive = !!activeSection;
	const hasInnate = !!innateSection;
	console.log(foundItem.id);
	const description = {
		desc: foundItem?.description?.desc
			? cleanDescription(foundItem.description.desc)
			: null,

		passive: foundItem?.description?.passive
			? cleanDescription(foundItem.description.passive)
			: passiveSection[0]?.section_attributes?.[0]?.loc_string
			? cleanDescription(passiveSection[0]?.section_attributes[0].loc_string)
			: null,

		active: foundItem?.description?.active
			? cleanDescription(foundItem.description.active)
			: activeSection?.section_attributes?.[0]?.loc_string
			? cleanDescription(activeSection.section_attributes[0].loc_string)
			: null,

		unNamed: unNamedSection?.section_attributes?.[0]?.loc_string
			? cleanDescription(unNamedSection.section_attributes[0].loc_string)
			: null,

		passive2: passiveSection[1]?.section_attributes?.[0]?.loc_string
			? cleanDescription(passiveSection[1].section_attributes[0].loc_string)
			: null,

		active2: activeSection?.section_attributes?.[1]?.loc_string
			? cleanDescription(activeSection.section_attributes[1].loc_string)
			: null,
	};
	const hasDescription = Object.values(description).some(Boolean);

	const allItemsForImages = Object.values(ItemImages).flatMap((category) =>
		Object.values(category).flat()
	);

	const foundItemForImages = allItemsForImages.find(
		(item) => item.Name === itemId
	);
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
				<View></View>
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

					{hasInnate ? (
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
								<InnateData itemId={itemId} />
							</CustomText>
						</>
					) : null}

					{hasDescription ? (
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
								{description.passive
									? description.passive
									: description.desc && description.unNamed
									? description.unNamed
									: description.desc && !description.unNamed
									? description.desc
									: !description.passive && description.active
									? description.active
									: null}
							</CustomText>
						</BlurView>
					) : null}
					{hasPassive ||
					hasActive ||
					(!hasActive && !hasPassive && hasUnNamed) ? (
						<>
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
									{hasActive && hasPassive ? (
										<PassiveData passiveArrays={false} itemId={itemId} />
									) : !hasPassive && hasActive ? (
										<ActiveData activeArrays={false} itemId={itemId} />
									) : hasPassive && !hasActive ? (
										<PassiveData passiveArrays={false} itemId={itemId} />
									) : (
										<UnNamedData itemId={itemId} />
									)}
								</CustomText>
							</BlurView>
						</>
					) : null}
					{passiveLengthBoolean ||
					activeLengthBoolean ||
					(hasPassive && hasActive) ||
					(hasActive && hasUnNamed) ||
					(hasPassive && hasUnNamed) ? (
						<>
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
									{activeLengthBoolean
										? description.active2
										: description.active
										? description.active
										: description.passive2
										? description.passive2
										: description.desc
										? description.desc
										: description.unNamed}
								</CustomText>
							</BlurView>
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
									{activeLengthBoolean ? (
										<ActiveData activeArrays arrayIndex={1} itemId={itemId} />
									) : !hasUnNamed && !passiveLengthBoolean ? (
										<ActiveData activeArrays={false} itemId={itemId} />
									) : passiveLengthBoolean ? (
										<PassiveData
											passiveArrays={passiveLengthBoolean}
											arrayIndex={1}
											itemId={itemId}
										/>
									) : (
										<UnNamedData itemId={itemId} />
									)}
								</CustomText>
							</BlurView>
						</>
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
