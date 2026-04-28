import { View, Image, Pressable } from "react-native";
import * as Progress from "react-native-progress";
import { useState } from "react";
import { StyleSheet } from "react-native-unistyles";
import { useUnistyles } from "react-native-unistyles";
import { Link } from "expo-router";
import { Header } from "./Header";
import { CustomText } from "./CustomText";
import { LoadingIcon } from "./LoadingIcon";
import { useHeroData } from "@/hooks/useHeroData";
import { BlurView } from "expo-blur";
import { SettingsPopUp } from "./settingsPopup";
import { FlashList } from "@shopify/flash-list";

type Props = {
	steamAuth: () => void;
};
type sort = "Winrate" | "Pickrate";

export const HeroList = ({ steamAuth }: Props) => {
	const [sort, setSort] = useState<sort>("Winrate");
	const [settings, setSettings] = useState(false);
	const { theme, rt } = useUnistyles();
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

	const heroList = Array.isArray(heroData) ? heroData : [];

	const totalHeroPicks = heroList.reduce((sum, hero) => sum + hero.matches, 0);

	const sortMap = {
		Winrate: (a: any, b: any) => b.winRate - a.winRate,
		Pickrate: (a: any, b: any) => b.matches - a.matches,
	};
	const sorted = sort ? [...heroList].sort(sortMap[sort]) : heroList;

	const handleSort = () => {
		setSort(sort === "Winrate" ? "Pickrate" : "Winrate");
	};
	return (
		<View style={styles.primaryView}>
			<Header
				variant="sortable"
				sort={sort}
				back={false}
				sortable={true}
				sortFunc={() => handleSort()}
				sortText={["Pickrate", "Winrate"]}
				itemType={false}
				setSettings={setSettings}
			/>

			<FlashList
				data={sorted}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<BlurView
						intensity={0}
						tint={rt.themeName === "dark" ? "dark" : "light"}
						style={styles.heroListItem}>
						<Image
							source={{ uri: item.images.icon_hero_card_webp }}
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
							<View style={{ height: 15, alignSelf: "center" }}>
								<Progress.Bar
									progress={item.matches / (totalHeroPicks / 12)}
									width={100}
									height={5}
									color={theme.colors.accent}
								/>
								<CustomText style={styles.percentText}>
									{item.popularity}%
								</CustomText>
							</View>
						)}
					</BlurView>
				)}></FlashList>
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
						steamAuth={steamAuth}
						setSettings={setSettings}
						settings={settings}
					/>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	percentText: {
		marginTop: 1,
		alignSelf: "center",
		color: theme.colors.font,
		fontSize: 10,
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
	sortButton: {
		color: theme.colors.accent,
		alignSelf: "center",
		margin: 10,
	},
	primaryView: {
		height: "94.3%",
		zIndex: 11,
	},
}));
