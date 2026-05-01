import { View, Image, FlatList, Pressable, Button } from "react-native";
import type { PlayerHeroStats } from "@/types/playerHeroStats";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import { useUnistyles } from "react-native-unistyles";
import * as Progress from "react-native-progress";
import { useMemo, useState } from "react";
import { Link } from "expo-router";
import { Header } from "@/components/Header";
import { CustomText } from "./CustomText";
import { LoadingIcon } from "./LoadingIcon";
import { useHeroData } from "@/hooks/useHeroData";
import { usePlayerHeroData } from "@/hooks/usePlayerHeroData";
import { BlurView } from "expo-blur";
import { Popup } from "./Popup";
import { FlashList } from "@shopify/flash-list";
import { Circle, CircleDot } from "lucide-react-native";
import { ProgressBar } from "./ProgressBar";
type Props = {
	id: string;
	handleLogin: () => void;
};

export const HeroPlayerList = ({ id, handleLogin }: Props) => {
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
		sort == value ? setSort("") : setSort(value);
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
				sortText={["Winrate", "Pickrate"]}
				variant="sortable"
			/>
			<FlashList
				maintainVisibleContentPosition={{ disabled: true }}
				data={sorted}
				keyExtractor={(item) => item.hero_id.toString()}
				renderItem={({ item, index }) => (
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
							<View style={{ height: 15, marginTop: 9.5, alignSelf: "center" }}>
								<ProgressBar percent={-(index / (sorted.length - 1)) * 100} />

								<CustomText style={styles.percentText}>
									{item.winRate}%
								</CustomText>
							</View>
						) : (
							<View
								style={{ height: 15, alignSelf: "flex-start", marginTop: 6.5 }}>
								<CustomText style={styles.infoText}>
									Matches played: {item.matches_played}
								</CustomText>
								<ProgressBar percent={-(index / (sorted.length - 1)) * 100} />

								<CustomText style={styles.percentText}>
									{item.pickRate}%
								</CustomText>
							</View>
						)}
					</BlurView>
				)}></FlashList>
			{settings && (
				<>
					<Popup
						settings={settings}
						handlePress={() => setSettings((prev) => !prev)}>
						<Pressable
							onPress={handleLogin}
							style={{
								backgroundColor: theme.colors.font,
								width: 165,
								height: 30,
								alignSelf: "center",
								borderRadius: 12,
								borderWidth: 1,
								borderColor: theme.colors.font,
								justifyContent: "center",
							}}>
							<CustomText
								style={{
									color: theme.colors.background,
									alignSelf: "center",
									textAlign: "center",
									fontSize: 18,
								}}>
								Sign in with Steam
							</CustomText>
						</Pressable>
						<View
							style={{
								alignSelf: "center",
								marginTop: 10,
								width: 200,
								backgroundColor: theme.colors.font,
								height: 1,
							}}></View>
						<View
							style={{
								flexDirection: "row",
								width: 200,
								alignSelf: "center",
								justifyContent: "center",
							}}>
							<CustomText
								style={{
									alignSelf: "center",
									fontSize: 22,
									marginRight: 40,
									color: theme.colors.font,
								}}>
								Dark Mode
							</CustomText>
							<View style={{ position: "absolute", left: 155, top: 5 }}>
								{rt.themeName === "dark" ? (
									<CircleDot
										style={{ alignSelf: "center" }}
										size={20}
										strokeWidth={4}
										color={theme.colors.font}
										title={"dark mode"}
										onPress={() => UnistylesRuntime.setTheme("light")}
									/>
								) : (
									<Circle
										style={{ alignSelf: "center" }}
										size={20}
										strokeWidth={4}
										color={theme.colors.font}
										title={"dark mode"}
										onPress={() => UnistylesRuntime.setTheme("dark")}
									/>
								)}
							</View>
						</View>
					</Popup>
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
		height: "94.3%",
	},
}));
