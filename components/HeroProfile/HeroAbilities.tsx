import { Pressable, View, Image } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { CustomText } from "../CustomText";
import { useHeroDataById } from "@/hooks/useHeroDataById";
import { LoadingIcon } from "../LoadingIcon";

type Props = {
	id: number;
	handleShade: () => void;
};

export const HeroAbilities = ({ id, handleShade }: Props) => {
	const { heroDataById, itemDataById, isIdError, isIdLoading, idError } =
		useHeroDataById(id);

	if (isIdLoading) return <LoadingIcon />;

	if (isIdError) return <CustomText>{String(idError)}</CustomText>;

	const heroMoves = [
		heroDataById.items.signature1,
		heroDataById.items.signature2,
		heroDataById.items.signature3,
		heroDataById.items.signature4,
	];

	return (
		<View style={styles.itemView}>
			{heroMoves.map((moves, index) => {
				const matchedItem = itemDataById.find(
					(item: any) => item.class_name === moves
				);
				return (
					<View key={index} style={{ flexDirection: "column" }}>
						<Pressable
							onPress={() => {
								{
									handleShade();
								}
							}}>
							<Image
								style={styles.abilityImage}
								source={{ uri: matchedItem.image_webp }}
							/>
						</Pressable>
						<CustomText style={styles.abilityText}>
							{matchedItem.name}
						</CustomText>
					</View>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	itemView: {
		top: 30,
		width: "100%",
		flexDirection: "row",
		position: "relative",
		zIndex: 2,
		justifyContent: "space-evenly",
	},
	abilityImage: {
		flexDirection: "row",
		width: 60,
		height: 60,
		zIndex: 2,
		backgroundColor: theme.colors.background,
		tintColor: theme.colors.accent,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: theme.colors.primary,
	},
	abilityText: {
		color: theme.colors.font,
		fontSize: 8,
		alignSelf: "center",
		width: 60,
		textAlign: "center",
		zIndex: 2,
	},
}));
