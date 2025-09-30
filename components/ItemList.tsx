import { useItemData } from "@/hooks/useItemData";
import { View, Image, ScrollView, Pressable } from "react-native";
import { useUnistyles, StyleSheet } from "react-native-unistyles";
import { ItemImages } from "@/data/items";
import { CustomText } from "./CustomText";
import { Header } from "./Header";
import { VitalitySvg } from "./svgComponents/VitalitySvg";
import { WeaponSvg } from "./svgComponents/WeaponSvg";
import { SpiritSvg } from "./svgComponents/SpiritSvg";

export const ItemList = () => {
	const { theme } = useUnistyles();
	const types = ["Vitality", "Weapon", "Spirit"];
	const tiers = ["tier1", "tier2", "tier3", "tier4"];

	return (
		<ScrollView
			style={{
				backgroundColor: theme.colors.background,
				paddingBottom: 1000,
			}}>
			<Header sortable={false} back={false}></Header>
			<View style={{ flexDirection: "row" }}>
				<View style={{ width: 121, marginLeft: 2, marginRight: 4 }}>
					<Pressable
						style={{
							marginBottom: 3,
							backgroundColor: theme.colors.primary,
							height: 60,
							justifyContent: "center",
							borderRadius: 4,
							borderWidth: 2,
							borderColor: theme.colors.accent,
						}}>
						<VitalitySvg />
					</Pressable>
					<View style={{ flexDirection: "row" }}>
						<View style={{ flexDirection: "column" }}>
							{ItemImages.Vitality.tier1.map((type) => (
								<Image
									key={type.Name}
									source={type.Image}
									style={styles.ItemBox}
								/>
							))}
						</View>
						<View style={{ flexDirection: "column" }}>
							{ItemImages.Vitality.tier2.map((type) => (
								<Image
									key={type.Name}
									source={type.Image}
									style={styles.ItemBox}
								/>
							))}
						</View>
						<View style={{ flexDirection: "column" }}>
							{ItemImages.Vitality.tier3.map((type) => (
								<Image
									key={type.Name}
									source={type.Image}
									style={styles.ItemBox}
								/>
							))}
						</View>
						<View style={{ flexDirection: "column" }}>
							{ItemImages.Vitality.tier4.map((type) => (
								<Image
									key={type.Name}
									source={type.Image}
									style={styles.ItemBox}
								/>
							))}
						</View>
					</View>
				</View>
				<View style={{ width: 121, marginRight: 4 }}>
					<Pressable
						style={{
							marginBottom: 3,
							backgroundColor: theme.colors.primary,
							height: 60,
							justifyContent: "center",
							borderRadius: 4,
							borderWidth: 2,
							borderColor: theme.colors.accent,
						}}>
						<WeaponSvg />
					</Pressable>
					<View style={{ flexDirection: "row" }}>
						<View style={{ flexDirection: "column" }}>
							{ItemImages.Weapon.tier1.map((type) => (
								<Image
									key={type.Name}
									source={type.Image}
									style={styles.ItemBox}
								/>
							))}
						</View>
						<View style={{ flexDirection: "column" }}>
							{ItemImages.Weapon.tier2.map((type) => (
								<Image
									key={type.Name}
									source={type.Image}
									style={styles.ItemBox}
								/>
							))}
						</View>
						<View style={{ flexDirection: "column" }}>
							{ItemImages.Weapon.tier3.map((type) => (
								<Image
									key={type.Name}
									source={type.Image}
									style={styles.ItemBox}
								/>
							))}
						</View>
						<View style={{ flexDirection: "column" }}>
							{ItemImages.Weapon.tier4.map((type) => (
								<Image
									key={type.Name}
									source={type.Image}
									style={styles.ItemBox}
								/>
							))}
						</View>
					</View>
				</View>

				<View style={{ width: 121, marginRight: 2 }}>
					<Pressable
						style={{
							marginBottom: 3,
							backgroundColor: theme.colors.primary,
							height: 60,
							justifyContent: "center",
							borderRadius: 4,
							borderWidth: 2,
							borderColor: theme.colors.accent,
						}}>
						<SpiritSvg />
					</Pressable>
					<View style={{ flexDirection: "row" }}>
						<View style={{ flexDirection: "column" }}>
							{ItemImages.Spirit.tier1.map((type) => (
								<Image
									key={type.Name}
									source={type.Image}
									style={styles.ItemBox}
								/>
							))}
						</View>
						<View style={{ flexDirection: "column" }}>
							{ItemImages.Spirit.tier2.map((type) => (
								<Image
									key={type.Name}
									source={type.Image}
									style={styles.ItemBox}
								/>
							))}
						</View>
						<View style={{ flexDirection: "column" }}>
							{ItemImages.Spirit.tier3.map((type) => (
								<Image
									key={type.Name}
									source={type.Image}
									style={styles.ItemBox}
								/>
							))}
						</View>
						<View style={{ flexDirection: "column" }}>
							{ItemImages.Spirit.tier4.map((type) => (
								<Image
									key={type.Name}
									source={type.Image}
									style={styles.ItemBox}
								/>
							))}
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create((theme) => ({
	ItemBox: {
		width: 28.25,
		height: 28.25,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: theme.colors.accent,
		margin: 1,
	},
}));
