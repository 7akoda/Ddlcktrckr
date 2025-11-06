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
import { ItemImages } from "../data/items";
import { Link } from "expo-router";

type Props = {
	itemId: string[] | string;
};

export const ItemProfile = ({ itemId }: Props) => {
	const { theme } = useUnistyles();
	const screenHeight = Dimensions.get("window").height;

	const allItems = Object.values(ItemImages) // gets Vitality, Agility, etc.
		.flatMap((category) => Object.values(category).flat()); // flattens tier arrays
	const found = allItems.find((item) => item.Name === itemId);

	const flatStats = found.Flat.map((f: string) => {
		return (
			<CustomText key={f} style={{ color: theme.colors.font }}>
				{f}
				<CustomText>{`\n`}</CustomText>
			</CustomText>
		);
	});

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
					{found.Name}
				</CustomText>
				<Image
					source={found.Image}
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
					{flatStats}
				</CustomText>
				{found.Clock == true ? (
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
						<Image
							source={require("../images/40px-Cooldown_Icon.png")}
							style={{
								backgroundColor: theme.colors.primary,
								tintColor: theme.colors.font,
								alignSelf: "center",
								height: 30,
								width: 30,
								borderRadius: 4,
								borderWidth: 2,
								borderColor: theme.colors.primary,
							}}
						/>
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
				) : null}
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
