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
	const cleanDescription = decode(
		foundItem.description.desc.replace(/<[^>]*>/g, "")
	);

	const allItems = Object.values(ItemImages).flatMap((category) =>
		Object.values(category).flat()
	);
	const foundFromData = allItems.find((item) => item.Name === itemId);
	console.log(foundItem.id);
	return (
		<View style={{ backgroundColor: theme.colors.background }}>
			<Header back={true} sortable={false} />
			<View style={styles.itemView}>
				<CustomText
					style={{
						color: theme.colors.font,
						alignSelf: "center",
						borderRadius: 4,
						borderWidth: 2,
						borderColor: theme.colors.accent,
						padding: 4,
					}}>
					{foundItem.name}
				</CustomText>
				<Image
					source={foundFromData.Image}
					style={{
						margin: 5,
						width: 70,
						height: 70,
						alignSelf: "center",
						borderRadius: 4,
						borderWidth: 2,
						borderColor: theme.colors.background,
					}}
				/>
				<CustomText
					style={{
						color: theme.colors.font,
						flexDirection: "column",
						padding: 4,
						fontSize: 12,
					}}>
					{cleanDescription}
				</CustomText>
				<View
					style={{
						backgroundColor: theme.colors.background,
						padding: 4,
						height: 40,
						alignContent: "center",
						flexDirection: "row",
					}}></View>
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
