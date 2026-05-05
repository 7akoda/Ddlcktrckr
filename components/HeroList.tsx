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
import { BlurView } from "expo-blur";
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
					<BlurView
						intensity={0}
						tint={rt.themeName === "dark" ? "dark" : "light"}
						style={styles.heroListItem}>
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
									marginTop: 9.5,
									height: 15,
									alignSelf: "center",
								}}>
								<ProgressBar percent={100 - index * (100 / sorted.length)} />
								<CustomText style={styles.percentText}>
									{item.winRate}%
								</CustomText>
							</View>
						) : (
							<View style={{ marginTop: 9.5, height: 15, alignSelf: "center" }}>
								<ProgressBar percent={100 - index * (100 / sorted.length)} />
								<CustomText style={styles.percentText}>
									{item.popularity}%
								</CustomText>
							</View>
						)}
					</BlurView>
				)}></FlashList>
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	percentText: {
		alignSelf: "center",
		color: theme.colors.font,
		fontSize: 9,
	},
	heroListItem: {
		alignSelf: "center",
		flexDirection: "row",
		borderRadius: 4,
		borderCurve: "continuous",
		width: 330,
		height: 40.25,
		paddingHorizontal: 8,
		marginVertical: 1,
		overflow: "hidden",
		borderWidth: 1,
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
		borderRadius: 4,
		borderWidth: 2,
		borderColor: theme.colors.primary,
	},
}));
