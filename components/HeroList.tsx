import { useQuery, useQueryClient } from "@tanstack/react-query";
import { View, Image, FlatList, Pressable, Text } from "react-native";
import * as Progress from "react-native-progress";
import { useState } from "react";
import { StyleSheet } from "react-native-unistyles";
import { useUnistyles } from "react-native-unistyles";
import { Link } from "expo-router";
import { Header } from "./Header";
import { CustomText } from "./CustomText";
import { LoadingIcon } from "./LoadingIcon";
import { useHeroData } from "@/hooks/useHeroData";

export const HeroList = () => {
	const [sort, setSort] = useState("Winrate");

	const { theme } = useUnistyles();

	const { heroData, error, isLoading, isError } = useHeroData();

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

	let sorted: any[] = [];

	const heroList = Array.isArray(heroData) ? heroData : [];

	const totalHeroPicks = heroList.reduce((sum, hero) => sum + hero.matches, 0);

	const sortedWinrate = heroList.slice().sort((a, b) => b.winRate - a.winRate);
	const sortedPopular = heroList.slice().sort((a, b) => b.matches - a.matches);

	if (sort === "Winrate") {
		sorted = sortedWinrate;
	} else if (sort === "Pickrate") {
		sorted = sortedPopular;
	}

	const handleSort = (value: string) => {
		sort == value ? setSort("") : setSort(value);
	};

	return (
		<View style={styles.primaryView}>
			<Header
				sort={sort}
				back={false}
				sortable={true}
				sortFunc={(value) => handleSort(value)}
				sortText={["Pickrate", "Winrate"]}
				sortAmount={2}
				itemList={false}
			/>
			<FlatList
				data={sorted}
				renderItem={({ item }) => (
					<View style={styles.heroListItem}>
						<Image
							source={{ uri: item.images.icon_hero_card_webp }}
							style={{
								width: 30,
								height: 30,
								alignSelf: "center",
								borderRadius: 4,
								borderWidth: 2,
								borderColor: theme.colors.accent,
							}}
						/>
						<Link
							href={{
								pathname: `/[id]`,
								params: { id: item.id },
							}}
							push
							asChild>
							<Pressable style={{ justifyContent: "center" }}>
								{({ pressed }) => (
									<CustomText
										style={[styles.heroText, pressed && styles.heroTextFade]}>
										{item.name}
									</CustomText>
								)}
							</Pressable>
						</Link>
						<View style={{ flex: 1 }} />

						{sort == "Winrate" ? (
							<View style={{ height: 10, alignSelf: "center" }}>
								<Progress.Bar
									progress={item.winRate / 100}
									width={100}
									color={theme.colors.accent}
								/>
								<CustomText style={styles.percentText}>
									{item.winRate}%
								</CustomText>
							</View>
						) : (
							<View style={{ height: 10, alignSelf: "center" }}>
								<Progress.Bar
									progress={item.matches / (totalHeroPicks / 12)}
									width={100}
									color={theme.colors.accent}
								/>
								<CustomText style={styles.percentText}>
									{item.popularity}%
								</CustomText>
							</View>
						)}
					</View>
				)}></FlatList>
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	percentText: {
		marginTop: 1,
		alignSelf: "center",
		color: theme.colors.font,
		fontSize: 9,
	},
	heroListItem: {
		alignSelf: "center",
		flexDirection: "row",
		backgroundColor: theme.colors.primary,
		borderRadius: 4,
		width: 330,
		height: 40,
		paddingHorizontal: 8,
		marginVertical: 1,
	},
	heroText: {
		color: theme.colors.font,
		paddingLeft: 7,
		fontSize: 12,
		alignSelf: "center",
	},
	heroTextFade: {
		color: theme.colors.font,
		paddingLeft: 7,
		fontSize: 12,
		alignSelf: "center",
		opacity: 0.6,
	},
	sortButton: {
		color: theme.colors.accent,
		alignSelf: "center",
		margin: 10,
	},
	primaryView: {
		backgroundColor: theme.colors.background,
		paddingBottom: 50,
	},
}));
