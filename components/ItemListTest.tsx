import { View, Image, FlatList, Pressable, Text } from "react-native";
import { useState } from "react";
import { StyleSheet } from "react-native-unistyles";
import { useUnistyles } from "react-native-unistyles";
import { Link } from "expo-router";
import { Header } from "./Header";
import { CustomText } from "./CustomText";
import { LoadingIcon } from "./LoadingIcon";
import { ItemImages } from "@/data/items";

export const ItemListTest = () => {
	const [sort, setSort] = useState("");
	const { theme } = useUnistyles();

	let sorted: any[] = [];
	sort == ""
		? (sorted = [
				...ItemImages.Spirit.tier1,
				...ItemImages.Spirit.tier2,
				...ItemImages.Spirit.tier3,
				...ItemImages.Spirit.tier4,
		  ])
		: sort == "800"
		? (sorted = ItemImages.Spirit.tier1)
		: sort == "1600"
		? (sorted = ItemImages.Spirit.tier2)
		: sort == "3200"
		? (sorted = ItemImages.Spirit.tier3)
		: (sorted = ItemImages.Spirit.tier4);

	const handleSort = (value: string) => {
		sort == value ? setSort("") : setSort(value);
	};

	return (
		<View style={styles.primaryView}>
			<Header
				sort={sort}
				sortAmount={4}
				sortList={(value) => handleSort(value)}
				sortText={["800", "1600", "3200", "6400"]}
				back={false}
				sortable={true}
			/>
			<FlatList
				data={sorted}
				renderItem={({ item }) => (
					<View style={styles.heroListItem}>
						<Image
							source={item.Image}
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
										{item.Name}
									</CustomText>
								)}
							</Pressable>
						</Link>
						<View style={{ flex: 1 }} />

						<View style={{ height: 10, alignSelf: "center" }}>
							<CustomText style={styles.percentText}></CustomText>
						</View>
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
