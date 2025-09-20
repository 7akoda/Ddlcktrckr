import { useItemData } from "@/hooks/useItemData";
import { View, Image } from "react-native";
import { useUnistyles } from "react-native-unistyles";

export const ItemList = () => {
	const { itemData, error, isLoading, isError } = useItemData();
	const { theme } = useUnistyles();
	return (
		<>
			{itemData?.map((item: any) => {
				return (
					<Image
						key={item.id}
						source={{ uri: item.image_webp }}
						style={{
							width: 30,
							height: 30,
							tintColor: theme.colors.accent,
						}}></Image>
				);
			})}
		</>
	);
};
