import { useItemData } from "@/hooks/useItemData";
import { View, Image, ScrollView } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { ItemImages } from "@/data/items";

export const ItemList = () => {
	const { theme } = useUnistyles();
	const types = ["Vitality", "Weapon", "Spirit"];
	const tiers = ["tier1", "tier2", "tier3", "tier4"];

	return (
		<ScrollView>
			{types.map((type) => (
				<View
					key={type}
					style={{
						alignSelf: "center",
						width: 320,
						flexDirection: "row",
						flexWrap: "wrap",
					}}>
					{tiers.map((tier) =>
						(ItemImages as any)[type][tier].map((item: any) => (
							<Image
								key={`${type}-${tier}-${item.Name}`}
								source={item.Image}
								style={{
									width: 40,
									height: 40,
									borderRadius: 4,
									borderWidth: 2,
									borderColor: theme.colors.accent,
									margin: 2,
								}}
							/>
						))
					)}
				</View>
			))}
		</ScrollView>
	);
};
