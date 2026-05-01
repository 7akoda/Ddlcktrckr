import { View, Image, Pressable, Button } from "react-native";
import { useMemo, useState } from "react";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import { useUnistyles } from "react-native-unistyles";
import { Link } from "expo-router";
import { Header } from "./Header";
import { CustomText } from "./CustomText";
import { ItemImages } from "@/data/items";
import { BlurView } from "expo-blur";
import { FlashList } from "@shopify/flash-list";
import { Popup } from "./Popup";
import { Circle, CircleDot } from "lucide-react-native";

type Props = {
	handleLogin: () => void;
};

export const ItemList = ({ handleLogin }: Props) => {
	const [sort, setSort] = useState("");
	const [itemType, setItemType] = useState("");
	const [settings, setSettings] = useState(false);

	const { theme, rt } = useUnistyles();

	const itemTypeIndex = itemType as keyof typeof ItemImages;

	const tiers = ["tier1", "tier2", "tier3", "tier4"] as const;
	const types = ["Spirit", "Vitality", "Weapon"] as const;

	const tierMap = {
		"": tiers,
		"800": ["tier1"],
		"1600": ["tier2"],
		"3200": ["tier3"],
		"6400": ["tier4"],
	} as const;

	const activeTypes = useMemo(
		() => (itemType === "" ? types : [itemTypeIndex]),
		[itemType],
	);

	const activeTiers = useMemo(
		() => tierMap[sort as keyof typeof tierMap] ?? [],
		[sort],
	);
	const sorted = useMemo(
		() =>
			activeTypes.flatMap((type) =>
				activeTiers.flatMap((tier) => ItemImages[type][tier]),
			),
		[activeTypes, activeTiers],
	);

	const handleSort = (value: string) => {
		sort == value ? setSort("") : setSort(value);
	};

	const handleTypePress = (value: string) => {
		itemType !== value ? setItemType(value) : setItemType("");
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
				variant="sortableItem"
				itemType={itemType}
				typeFunc={(value) => handleTypePress(value)}
				itemList={true}
				sort={sort}
				sortFunc={(value) => handleSort(value)}
				sortText={["800", "1600", "3200", "6400"]}
				back={false}
				sortable={true}
				handleThemeChangeDark={handleThemeChangeDark}
				handleThemeChangeLight={handleThemeChangeLight}
			/>

			<FlashList
				maintainVisibleContentPosition={{ disabled: true }}
				data={sorted}
				keyExtractor={(item) => item.Name}
				renderItem={({ item }) => (
					<BlurView
						style={styles.heroListItem}
						intensity={0}
						tint={rt.themeName === "dark" ? "dark" : "light"}>
						<Image
							source={item.Image}
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
								pathname: `/items/[itemId]`,
								params: { itemId: item.Name },
							}}
							push
							asChild>
							<Pressable style={{ justifyContent: "center" }}>
								{({ pressed }) => (
									<CustomText
										style={[styles.heroText, pressed && styles.heroTextFade]}>
										{item.Name}
									</CustomText>
								)}
							</Pressable>
						</Link>
						<View style={{ flex: 1 }} />

						<View style={{ height: 10, alignSelf: "center" }}>
							<CustomText style={styles.percentText}></CustomText>
						</View>
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
		marginTop: 1,
		alignSelf: "center",
		color: theme.colors.font,
		fontSize: 9,
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
	primaryView: { height: "94.3%" },
}));
