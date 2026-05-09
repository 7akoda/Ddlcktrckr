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
import { ItemImages } from "@/data/items";
import { BlurView } from "expo-blur";
import { FlashList } from "@shopify/flash-list";

export const ItemList = () => {
	const [sort, setSort] = useState("");
	const [itemType, setItemType] = useState("");

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

	const activeTypes = itemType === "" ? types : [itemTypeIndex];

	const activeTiers = tierMap[sort as keyof typeof tierMap] ?? [];

	const sorted = activeTypes.flatMap((type) =>
		activeTiers.flatMap((tier) => ItemImages[type][tier]),
	);

	const handleSort = (value: string) => {
		if (sort === value) {
			setSort("");
		} else {
			setSort(value);
		}
	};

	const handleTypePress = (value: string) => {
		if (itemType !== value) {
			setItemType(value);
		} else {
			setItemType("");
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
					<View style={styles.heroListItem}>
						<Image
							source={item.Image}
							style={{
								width: 30,
								height: 30,
								alignSelf: "center",
								borderRadius: 8,
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
					</View>
				)}></FlashList>
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

	primaryView: { height: "94.3%" },
}));
