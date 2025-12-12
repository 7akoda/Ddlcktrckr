import { View, Image, Pressable, Dimensions, ScrollView } from "react-native";
import { useUnistyles, StyleSheet } from "react-native-unistyles";
import { Header } from "./Header";
import { LoadingIcon } from "./LoadingIcon";
import { CustomText } from "./CustomText";
import { ItemImages } from "../data/items";
import { CooldownSvg } from "./svgComponents/CooldownSvg";
import { useItemData } from "@/hooks/useItemData";
import { Link } from "expo-router";
import { BlurView } from "expo-blur";

type Props = {
	itemId: string[] | string;
};

export const ItemProfile = ({ itemId }: Props) => {
	const { theme, rt } = useUnistyles();
	const screenHeight = Dimensions.get("window").height;
	const { itemData, isError, isLoading, error } = useItemData();
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

	const foundItem = itemData.find((item: any) => item.name === itemId);
	console.log(foundItem.id);

	const cleanDescription = (desc: string) => {
		if (!desc) return "";

		let cleaned = desc.replace(/<svg[\s\S]*?<\/svg>/gi, "");

		cleaned = cleaned.replace(/<[^>]+>/g, "");

		try {
			const { decode } = require("he");
			cleaned = decode(cleaned);
		} catch {}

		cleaned = cleaned.replace(/\s+/g, " ").trim();

		return cleaned;
	};

	const description = foundItem.description.desc
		? cleanDescription(foundItem.description.desc)
		: "";

	const allItemsForImages = Object.values(ItemImages).flatMap((category) =>
		Object.values(category).flat()
	);

	const foundItemForImages = allItemsForImages.find(
		(item) => item.Name === itemId
	);

	const innateSection = foundItem.tooltip_sections.find(
		(section: any) => section.section_type === "innate"
	);

	let innateStats: string[] = [];

	if (innateSection) {
		const innateProps = [
			...(innateSection?.section_attributes?.[0]?.properties ?? []),
			...(innateSection?.section_attributes?.[0]?.elevated_properties ?? []),
		];
		console.log(innateProps);

		innateStats = innateProps.map((key, index: number) => {
			const prop = foundItem.properties[key];
			return index < innateProps.length - 1
				? `${prop.value}${prop.postfix || ""} ${prop.label} \n`
				: `${prop.value}${prop.postfix || ""} ${prop.label}`;
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
			const prop = foundItem.properties[key];
			console.log(prop);
			const value = String(prop.value);
			const postfix = prop.postfix == undefined ? "" : String(prop.postfix);
			const label = String(prop.label);
			const conditional = prop.tooltip_is_important ? " (Conditional)" : "";

			return index < activeProps.length - 1 &&
				prop.value !== undefined &&
				key !== "AbilityCooldown"
				? `${value}${postfix} ${label}${conditional} \n`
				: index >= activeProps.length - 1 &&
				  prop.value !== undefined &&
				  key !== "AbilityCooldown"
				? `${value}${postfix} ${label}${conditional} `
				: "";
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
			const prop = foundItem.properties[key];
			const value = String(prop.value);
			const postfix = prop.postfix == undefined ? "" : String(prop.postfix);
			const label = String(prop.label);
			const conditional = prop.tooltip_is_important ? " (Conditional)" : "";

			return index < passiveProps.length - 1
				? `${value}${postfix} ${label}${conditional} \n`
				: `${value}${postfix} ${label}${conditional} `;
		});
	}
	console.log(passiveStats);
	console.log(foundItem.item_slot_type);
	return (
		<View style={{ backgroundColor: theme.colors.background }}>
			<Header back={true} sortable={false} />
			<View style={{ position: "absolute" }}>
				<Image
					style={{ width: 1390, height: 900 }}
					source={
						rt.themeName === "dark"
							? require("../images/Background_Buildings.png")
							: require("../images/Background_Buildings_Light.png")
					}></Image>
			</View>
			<View style={styles.itemViewPAPA}>
				<View style={styles.itemView}>
					<BlurView
						tint={rt.themeName === "dark" ? "dark" : "light"}
						intensity={20}
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
							intensity={20}
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
									marginVertical: 4,
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
									marginVertical: 4,
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
							intensity={20}
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

					{activeSection || passiveSection !== undefined ? (
						<BlurView
							intensity={20}
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
							</CustomText>
						</BlurView>
					) : null}
					{foundItemForImages.Upgrades.length > 0 ? (
						<BlurView
							intensity={20}
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
							{foundItemForImages.Upgrades.map((upgrade: string) => {
								return (
									<Link
										key={upgrade}
										href={{
											pathname: `/items/[itemId]`,
											params: { itemId: upgrade },
										}}
										push
										asChild>
										<Pressable style={{ justifyContent: "center" }}>
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
								);
							})}
						</BlurView>
					) : null}
				</View>
			</View>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{
					height: screenHeight,
					zIndex: 3,
				}}></ScrollView>
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
