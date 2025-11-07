import { View, Image, Pressable, Dimensions, ScrollView } from "react-native";
import { useUnistyles, StyleSheet } from "react-native-unistyles";
import { DDLKSvg } from "./svgComponents/DDLKSvg";
import { Header } from "./Header";
import { useState } from "react";
import { LoadingIcon } from "./LoadingIcon";
import { CustomText } from "./CustomText";
import { ItemImages } from "../data/items";
import { Link } from "expo-router";
import { CooldownSvg } from "./svgComponents/CooldownSvg";
import { useItemData } from "@/hooks/useItemData";
import { decode } from "he";

type Props = {
	itemId: string[] | string;
};

export const ItemProfile = ({ itemId }: Props) => {
	const { theme } = useUnistyles();
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

	const cleanDescription = (desc: string) => {
		if (!desc) return "";

		// 1️⃣ Remove entire <svg> blocks (multi-line)
		let cleaned = desc.replace(/<svg[\s\S]*?<\/svg>/gi, "");

		// 2️⃣ Remove all remaining HTML tags (<span>, <br>, <div>, etc.)
		cleaned = cleaned.replace(/<[^>]+>/g, "");

		// 3️⃣ Decode HTML entities (like &amp;, &quot;)
		try {
			const { decode } = require("he");
			cleaned = decode(cleaned);
		} catch {
			// if you don't have "he", just leave it as-is
		}

		// 4️⃣ Trim extra whitespace and newlines
		cleaned = cleaned.replace(/\s+/g, " ").trim();

		return cleaned;
	};

	const description = foundItem.description.desc
		? cleanDescription(foundItem.description.desc)
		: "";
	const allItems = Object.values(ItemImages).flatMap((category) =>
		Object.values(category).flat()
	);
	const foundFromData = allItems.find((item) => item.Name === itemId);
	console.log(foundItem.id);

	return (
		<View style={{ backgroundColor: theme.colors.background }}>
			<Header back={true} sortable={false} />
			<View style={styles.itemView}>
				<View
					style={{
						backgroundColor: theme.colors.accent,
						borderRadius: 4,
						borderWidth: 2,
						borderColor: theme.colors.background,
						margin: 4,
					}}>
					<CustomText
						style={{
							color: theme.colors.font,
							alignSelf: "center",
							margin: 4,
							fontSize: 34,
						}}>
						{foundItem.name}
					</CustomText>
				</View>
				<Image
					source={foundFromData.Image}
					style={{
						width: 120,
						height: 120,
						alignSelf: "center",
						borderRadius: 4,
						borderWidth: 2,
					}}
				/>
				<View style={{ flexDirection: "row", alignSelf: "center" }}>
					<CustomText
						style={{
							color: theme.colors.font,
							flexDirection: "column",
							padding: 4,
							fontSize: 12,
						}}>
						Cost
					</CustomText>
					<View
						style={{
							width: 2,
							height: 30,
							marginHorizontal: 4,
							backgroundColor: theme.colors.accent,
						}}
					/>
					<Image
						source={require("../images/28px-Souls.png")}
						style={{
							height: 25,
							width: 14,
							padding: 2,
						}}></Image>
					<CustomText
						style={{
							color: theme.colors.souls,
							flexDirection: "column",
							padding: 4,
							fontSize: 12,
						}}>
						{foundItem.cost}
					</CustomText>
				</View>
				<View
					style={{
						backgroundColor: theme.colors.background,
						height: 30,
						borderRadius: 4,
						borderWidth: 2,
						marginHorizontal: 4,
						borderColor: theme.colors.background,
						alignContent: "center",
						flexDirection: "row",
					}}>
					<CustomText
						style={{
							color: theme.colors.font,
							flexDirection: "column",
							alignSelf: "center",
							fontSize: 12,
							marginLeft: 8,
						}}>
						{foundItem.is_active_item ? "Active" : "Passive"}
					</CustomText>
					<View style={{ flex: 1 }} />
					{foundItem.properties.AbilityCooldown.value > 0 ? (
						<>
							{" "}
							<CooldownSvg />
							<CustomText
								style={{
									color: theme.colors.font,
									flexDirection: "column",
									alignSelf: "center",
									fontSize: 12,
									marginLeft: -9,
									marginRight: 8,
								}}>
								{foundItem.properties.AbilityCooldown.value}
								{foundItem.properties.AbilityCooldown.postfix}
							</CustomText>
						</>
					) : null}
				</View>
				<CustomText
					style={{
						color: theme.colors.font,
						flexDirection: "column",
						marginHorizontal: 14,
						marginVertical: 4,
						lineHeight: 15,
						fontSize: 10,
					}}>
					{description}
				</CustomText>

				{/* {found.Clock == true ? (
					<View
						style={{
							backgroundColor: theme.colors.background,
							padding: 4,
							height: 40,
							alignContent: "center",
							flexDirection: "row",
						}}>
						<CustomText
							style={{
								color: theme.colors.font,
								padding: 4,
								fontSize: 12,
								alignSelf: "center",
							}}>
							{found.Type}
						</CustomText>
						<View style={{ flex: 1 }}></View>
						<CooldownSvg />
						<CustomText
							style={{
								color: theme.colors.font,
								fontSize: 12,
								alignSelf: "center",
							}}>
							{found.Timer}
						</CustomText>
					</View>
				) : null}
				{found.Upgrades.length >= 1 ? (
					<View
						style={{
							backgroundColor: theme.colors.accent,
							padding: 4,
						}}>
						<CustomText
							style={{
								color: theme.colors.font,
								fontSize: 12,
								paddingRight: 4,
							}}>
							Upgrades to:
						</CustomText>
						<View style={{ flexDirection: "row", gap: 4 }}>
							{found.Upgrades.map((u: string, index: number) => (
								<Link
									key={u}
									href={{ pathname: `/items/[itemId]`, params: { itemId: u } }}
									push
									asChild>
									<Pressable>
										{({ pressed }) => (
											<CustomText
												style={[
													styles.heroText,
													pressed && styles.heroTextFade,
												]}>
												{u}
												{index < found.Upgrades.length - 1 ? "," : ""}
											</CustomText>
										)}
									</Pressable>
								</Link>
							))}
						</View>
					</View>
				) : null} */}
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
		borderRadius: 4,
		borderWidth: 2,
		borderColor: theme.colors.primary,
		backgroundColor: theme.colors.primary,
		zIndex: 3,
	},
	heroText: {
		color: theme.colors.font,
		fontSize: 12,
		alignSelf: "center",
	},
	heroTextFade: {
		color: theme.colors.font,
		fontSize: 12,
		alignSelf: "center",
		opacity: 0.6,
	},
}));
