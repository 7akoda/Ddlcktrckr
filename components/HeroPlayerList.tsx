import { View, Image, Pressable } from "react-native";
import type { PlayerHeroStats } from "@/types/playerHeroStats";
import {
	StyleSheet,
	UnistylesRuntime,
	useUnistyles,
} from "react-native-unistyles";

import { useState } from "react";
import { Link } from "expo-router";
import { Header } from "@/components/Header";
import { CustomText } from "./CustomText";
import { LoadingIcon } from "./LoadingIcon";
import { useHeroData } from "@/hooks/useHeroData";
import { usePlayerHeroData } from "@/hooks/usePlayerHeroData";
import { BlurView } from "expo-blur";
import { FlashList } from "@shopify/flash-list";
import { ProgressBar } from "./ProgressBar";
type HeroPlayerListType = {
	id: string;
};

export const HeroPlayerList = ({ id }: HeroPlayerListType) => {
	const [sort, setSort] = useState("Winrate");
	const { rt } = useUnistyles();
	const { playerStats, isIdError, isIdLoading, idError } =
		usePlayerHeroData(id);
	const { heroData, isError, error, isLoading } = useHeroData();

	if (isLoading || isIdLoading) {
		return <LoadingIcon />;
	}

	if (isError || isIdError) {
		console.error(error || idError);
		return <CustomText>{isError ? String(error) : String(idError)}</CustomText>;
	}

	const totalMatches = playerStats.reduce(
		(sum: number, player: PlayerHeroStats) => sum + player.matches_played,
		0,
	);

	const heroes = playerStats.map((player: PlayerHeroStats) => {
		const data = heroData?.find((hero) => hero.id === player.hero_id);
		const name = data?.name;
		const profilePicture = data?.images.icon_hero_card_webp;
		const winRate = player
			? ((player.wins / player.matches_played) * 100).toFixed(2)
			: null;
		const pickRate = ((player.matches_played / totalMatches) * 100).toFixed(2);
		return { ...player, name, profilePicture, winRate, pickRate };
	});

	const sortedByMostPlayed = [...heroes].sort(
		(a, b) => b.matches_played - a.matches_played,
	);

	const sortedByWinRate = [...heroes].sort((a, b) => b.winRate - a.winRate);

	let sorted: any[] = [];

	if (sort === "Winrate") {
		sorted = sortedByWinRate;
	} else if (sort === "Pickrate") {
		sorted = sortedByMostPlayed;
	}
	const handleSort = (value: string) => {
		if (sort === value) {
			setSort("");
		} else {
			setSort(value);
		}
	};

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
				itemType={false}
				back={false}
				sort={sort}
				sortable={true}
				sortFunc={(value) => handleSort(value)}
				sortText={["Pickrate", "Winrate"]}
				variant="sortable"
			/>
			<FlashList
				maintainVisibleContentPosition={{ disabled: true }}
				data={sorted}
				extraData={rt.themeName}
				keyExtractor={(item) => item.hero_id.toString()}
				renderItem={({ item, index }) => (
					<View style={styles.heroListItem}>
						<Image
							source={{ uri: item.profilePicture }}
							style={styles.heroImage}
						/>
						<Link
							href={{
								pathname: `/[id]`,
								params: { id: item.hero_id },
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

								<CustomText style={styles.percentText}>
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
									{item.pickRate}%
								</CustomText>
							</View>
						)}
					</View>
				)}></FlashList>
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	percentText: {
		alignSelf: "center",
		color: theme.colors.font,
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
