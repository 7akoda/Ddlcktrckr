import {
	createEnrichedHeroQueryOptions,
	createHeroDataByIdQueryOptions,
	createItemDataByIdQueryOptions,
} from "@/queryOptions/createHeroQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { heroWeapons } from "../data/weapons";
import { Link } from "expo-router";
import {
	View,
	Image,
	Text,
	FlatList,
	Button,
	Pressable,
	Dimensions,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useUnistyles } from "react-native-unistyles";
import { SvgUri } from "react-native-svg";
import { SvgComponent } from "./DDLKSvg";
import { Header } from "./Header";
import { getHeroData } from "@/api/getHeroData";
import { useState } from "react";
type Props = {
	id: number;
};

export const HeroProfile = ({ id }: Props) => {
	const { theme } = useUnistyles();
	const screenHeight = Dimensions.get("window").height;
	const [lineLimit, setLineLimit] = useState(true);

	const {
		data: heroStats,
		error: heroStatsError,
		isLoading: heroStatsLoading,
		isError: heroStatsIsError,
	} = useQuery(createEnrichedHeroQueryOptions());

	const {
		data: heroDataById,
		error: heroDataByIdError,
		isLoading: heroDataByIdIsLoading,
		isError: heroDataByIdIsError,
	} = useQuery(createHeroDataByIdQueryOptions(id));

	const {
		data: itemDataById,
		error: itemDataByIdError,
		isLoading: itemDataByIdIsLoading,
		isError: itemDataByIdIsError,
	} = useQuery(createItemDataByIdQueryOptions(id));

	if (heroDataByIdIsLoading || heroStatsLoading || itemDataByIdIsLoading) {
		return <Text>Loading...</Text>;
	}

	if (heroDataByIdIsError || heroStatsIsError || itemDataByIdIsError) {
		console.error(heroDataByIdError);
		console.error(heroStatsError);
		console.error(itemDataByIdError);

		return <Text>Failed to load player stats.</Text>;
	}
	let lines: number;

	lineLimit ? (lines = 6) : (lines = 100);
	const heroMoves = [
		heroDataById.items.signature1,
		heroDataById.items.signature2,
		heroDataById.items.signature3,
		heroDataById.items.signature4,
	];
	console.log(id);
	return (
		<View style={styles.backgroundView}>
			<Header back={true} sortable={false} />
			<Image
				style={{
					width: "100%",
					borderRadius: 4,
					height: 70,
					borderWidth: 2,
					borderColor: theme.colors.primary,
					zIndex: 2,
					position: "absolute",
					top: 48,
				}}
				source={require("../images/Background_Buildings.png")}></Image>
			<View
				style={{
					flexDirection: "row",
					width: "100%",
				}}>
				<Image
					source={{ uri: heroDataById.images.icon_hero_card_webp }}
					style={{
						width: 35,
						height: 35,
						borderRadius: 4,
						borderWidth: 2,
						borderColor: theme.colors.primary,
						marginTop: 17.5,
						zIndex: 2,
						marginLeft: 12,
					}}
				/>

				<Text style={styles.heroTextBanner}>{heroDataById.name}</Text>
				{heroDataById.id == 27 ? (
					//yamato's stupid ass weapon is bigger
					<Image
						style={{
							height: 70,
							width: 140,
							position: "absolute",
							top: 0,
							left: 235,
							borderRadius: 4,
							borderWidth: 2,
							borderColor: "transparent",
							zIndex: 4,
						}}
						source={heroWeapons[id].weaponImage}
					/>
				) : (
					<Image
						style={{
							height: 70,
							width: 100,
							position: "absolute",
							borderRadius: 4,
							borderWidth: 2,
							borderColor: "transparent",
							left: 275,
							zIndex: 4,
						}}
						source={heroWeapons[id].weaponImage}
					/>
				)}
			</View>
			<View
				style={{
					position: "absolute",
					alignSelf: "center",
					justifyContent: "center",
					width: "100%",
					height: screenHeight,
					zIndex: 1,
				}}>
				<SvgComponent></SvgComponent>
			</View>

			<View style={styles.itemView}>
				{heroMoves.map((moves, index) => {
					const matchedItem = itemDataById.find(
						(item: any) => item.class_name === moves
					);
					return (
						<>
							<View style={{ flexDirection: "column" }}>
								<Image
									key={index}
									style={{
										flexDirection: "row",
										width: 60,
										height: 60,
										zIndex: 2,
										backgroundColor: theme.colors.background,
										tintColor: theme.colors.accent,
										borderRadius: 4,
										borderWidth: 2,
										borderColor: theme.colors.primary,
									}}
									source={{ uri: matchedItem.image_webp }}
								/>

								<Text style={styles.abilityText}>{matchedItem.name}</Text>
							</View>
						</>
					);
				})}
			</View>

			<View
				style={{
					position: "relative",
					top: 40,
					maxWidth: "95%",
					zIndex: 2,
					alignSelf: "center",
					backgroundColor: theme.colors.background,
					borderRadius: 4,
					borderWidth: 2,
					borderColor: theme.colors.accent,
				}}>
				{lineLimit ? (
					<Text
						numberOfLines={lines}
						onPress={() => setLineLimit(false)}
						style={styles.loreText}>
						{heroDataById.description.lore}
					</Text>
				) : (
					<Text numberOfLines={lines} style={styles.loreText}>
						{heroDataById.description.lore}
					</Text>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	backgroundView: {
		backgroundColor: theme.colors.background,
		flex: 1,
	},
	heroText: {
		color: theme.colors.font,
		paddingLeft: 7,
		fontSize: 13,
		alignSelf: "center",
		zIndex: 2,
	},
	abilityText: {
		color: theme.colors.font,
		fontSize: 8,
		alignSelf: "center",
		width: 60,
		textAlign: "center",
		zIndex: 2,
	},
	loreText: {
		color: theme.colors.font,
		padding: 4,
		fontSize: 8,
		alignSelf: "center",
		textAlign: "center",
		zIndex: 2,
	},
	heroTextBanner: {
		color: theme.colors.bannerFont,
		fontSize: 13,
		marginLeft: 8,
		zIndex: 2,
		marginTop: 26.25,
	},
	heroTextFade: {
		color: theme.colors.font,
		paddingLeft: 7,
		fontSize: 13,
		opacity: 0.6,
		zIndex: 2,
	},
	itemView: {
		top: 30,
		width: "100%",
		flexDirection: "row",
		position: "relative",
		zIndex: 2,
		justifyContent: "space-evenly",
	},
}));
