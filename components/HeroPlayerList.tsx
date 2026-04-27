import {
	createEnrichedHeroQueryOptions,
	createPlayerHeroStatsQueryOptions,
} from "@/queryOptions/createHeroQueryOptions";
import { useQuery } from "@tanstack/react-query";
import {
	View,
	Image,
	Text,
	FlatList,
	Pressable,
	TouchableOpacity,
} from "react-native";
import type { PlayerHeroStats } from "@/types/playerHeroStats";
import { StyleSheet } from "react-native-unistyles";
import { useUnistyles } from "react-native-unistyles";
import * as Progress from "react-native-progress";
import { useState } from "react";
import { Link } from "expo-router";
import { Header } from "@/components/Header";
import { CustomText } from "./CustomText";
import { LoadingIcon } from "./LoadingIcon";
import { useHeroDataById } from "@/hooks/useHeroDataById";
import { useHeroData } from "@/hooks/useHeroData";
import { usePlayerHeroData } from "@/hooks/usePlayerHeroData";
import * as Linking from "expo-linking";
import { SettingsPopUp } from "./settingsPopup";
import { BlurView } from "expo-blur";
type Props = {
	id: string;
	steamAuth: () => void;
};

export const HeroPlayerList = ({ id, steamAuth }: Props) => {
	const [sort, setSort] = useState("Winrate");
	const [settings, setSettings] = useState(false);
	const { theme, rt } = useUnistyles();
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

	const sortedByMostPlayed = heroes
		.slice()
		.toSorted(
			(a: { matches_played: number }, b: { matches_played: number }) =>
				b.matches_played - a.matches_played,
		);

	const sortedByWinRate = heroes
		.slice()
		.toSorted(
			(a: { winRate: number }, b: { winRate: number }) => b.winRate - a.winRate,
		);

	let sorted: any[] = [];

	if (sort === "Winrate") {
		sorted = sortedByWinRate;
	} else if (sort === "Pickrate") {
		sorted = sortedByMostPlayed;
	}
	const handleSort = (value: string) => {
		sort == value ? setSort("") : setSort(value);
	};

	return (
		<View style={styles.primaryView}>
			<Header
				setSettings={setSettings}
				itemType={false}
				back={false}
				sort={sort}
				sortable={true}
				sortFunc={(value) => handleSort(value)}
				sortText={["Winrate", "Pickrate"]}
				variant="sortable"
			/>
			<FlatList
				data={sorted}
				renderItem={({ item }) => (
					<BlurView
						intensity={0}
						tint={rt.themeName === "dark" ? "dark" : "light"}
						style={styles.heroListItem}>
						<Image
							source={{ uri: item.profilePicture }}
							style={{
								width: 30,
								height: 30,
								alignSelf: "center",
								borderRadius: 4,
								borderWidth: 2,
								borderColor: theme.colors.primary,
							}}
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
						{sort == "Winrate" ? (
							<View style={{ height: 15, alignSelf: "center" }}>
								<Progress.Bar
									progress={item.winRate / 100}
									width={100}
									height={5}
									color={theme.colors.accent}
								/>
								<CustomText style={styles.percentText}>
									{item.winRate}%
								</CustomText>
							</View>
						) : (
							<View
								style={{ height: 15, alignSelf: "flex-start", marginTop: 1 }}>
								<CustomText style={styles.infoText}>
									Matches played: {item.matches_played}
								</CustomText>
								<Progress.Bar
									progress={item.matches_played / totalMatches}
									width={100}
									height={5}
									color={theme.colors.accent}
								/>
								<CustomText style={styles.percentText}>
									{item.pickRate}%
								</CustomText>
							</View>
						)}
					</BlurView>
				)}></FlatList>
			{settings && (
				<>
					<Pressable
						onPress={() => setSettings((prev) => !prev)}
						style={{
							position: "absolute",
							width: "100%",
							height: "120%",
							zIndex: 15,
						}}></Pressable>
					<SettingsPopUp
						setSettings={setSettings}
						settings={settings}
						steamAuth={steamAuth}
					/>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	percentText: {
		alignSelf: "center",
		color: theme.colors.font,
		fontSize: 9,
	},
	infoText: {
		alignSelf: "center",
		color: theme.colors.font,
		fontSize: 8,
		fontFamily: theme.fontFamily.regular,
	},
	heroListItem: {
		alignSelf: "center",
		flexDirection: "row",
		borderRadius: 4,
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
		height: "100%",
		zIndex: 11,
	},
}));
