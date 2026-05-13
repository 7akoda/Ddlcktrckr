import { View, Image, Pressable } from "react-native";
import { useState } from "react";
import {
	StyleSheet,
	UnistylesRuntime,
	useUnistyles,
} from "react-native-unistyles";

import { Link } from "expo-router";
import { Header } from "./Header";
import { CustomText } from "./CustomText";
import { LoadingIcon } from "./LoadingIcon";
import { useHeroData } from "@/hooks/useHeroData";

import { FlashList } from "@shopify/flash-list";
import { ProgressBar } from "./ProgressBar";
type sort = "Winrate" | "Pickrate";

export const HeroList = () => {
	const [sort, setSort] = useState<sort>("Winrate");
	const { rt } = useUnistyles();
	const { heroData, error, isLoading, isError } = useHeroData();

	const heroList = Array.isArray(heroData) ? heroData : [];

	const sortMap = {
		Winrate: (a: any, b: any) => b.winRate - a.winRate,
		Pickrate: (a: any, b: any) => b.matches - a.matches,
	};

	const sorted = sort ? [...heroList].sort(sortMap[sort]) : heroList;

	const handleSort = () => {
		setSort(sort === "Winrate" ? "Pickrate" : "Winrate");
	};

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

	const handleThemeChangeDark = () => {
		UnistylesRuntime.setTheme("dark");
	};

	const handleThemeChangeLight = () => {
		UnistylesRuntime.setTheme("light");
	};
	return (
		<View style={styles.primaryView}>
			<Header
				handleThemeChangeDark={handleThemeChangeDark}
				handleThemeChangeLight={handleThemeChangeLight}
				variant="sortable"
				sort={sort}
				back={false}
				sortable={true}
				sortFunc={() => handleSort()}
				sortText={["Pickrate", "Winrate"]}
				itemType={false}
			/>

			<FlashList
				maintainVisibleContentPosition={{ disabled: true }}
				data={sorted}
				keyExtractor={(item) => item.id.toString()}
				extraData={rt.themeName}
				renderItem={({ item, index }) => (
					<View style={styles.heroListItem}>
						<Image
							source={{ uri: item.images.icon_hero_card_webp }}
							style={styles.heroImage}
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
						{sort === "Winrate" ? (
							<View
								style={{
									height: "100%",
									justifyContent: "center",
									alignSelf: "center",
								}}>
								<ProgressBar percent={100 - index * (100 / sorted.length)} />
								<CustomText style={[styles.percentText]}>
									{item.winRate}%
								</CustomText>
							</View>
						) : (
							<View
								style={{
									height: "100%",
									justifyContent: "center",
									alignSelf: "center",
								}}>
								<ProgressBar percent={100 - index * (100 / sorted.length)} />
								<CustomText style={styles.percentText}>
									{item.popularity}%
								</CustomText>
							</View>
						)}
					</View>
				)}></FlashList>
		</View>
	);
};

const styles = StyleSheet.create((theme, rt) => ({
	percentText: {
		alignSelf: "center",
		color: rt.themeName === "dark" ? theme.colors.font : "#ffffff",
		fontSize: 8,
		fontFamily: "none",
		position: "absolute",
	},
	heroListItem: {
		alignSelf: "center",
		flexDirection: "row",
		borderRadius: 8,
		borderCurve: "continuous",
		width: 330,
		height: 40.9,
		paddingHorizontal: 8,
		marginVertical: 2,
		overflow: "hidden",
		backgroundColor: theme.colors.background,
	},
	heroText: {
		color: theme.colors.font,
		paddingLeft: 7,
		fontSize: 14,
		alignSelf: "center",
	},
	heroTextFade: {
		color: theme.colors.font,
		paddingLeft: 7,
		fontSize: 14,
		alignSelf: "center",
		opacity: 0.6,
	},
	primaryView: {
		height: "94.3%",
	},
	heroImage: {
		width: 30,
		height: 30,
		alignSelf: "center",
		borderRadius: 8,
	},
}));
