import { Pressable, View, Image } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { CustomText } from "../CustomText";

type Props = {
	id: number;
	handleShade: () => void;
	matchedItem: any;
	setSelectedAbilityIndex: (matchedItem: any) => void;
};

export const HeroAbilities = ({
	id,
	handleShade,
	matchedItem,
	setSelectedAbilityIndex,
}: Props) => {
	return (
		<View>
			<Pressable
				onPress={() => {
					{
						handleShade();
						setSelectedAbilityIndex(matchedItem);
					}
				}}>
				<Image
					style={styles.abilityImage}
					source={{ uri: matchedItem.image_webp }}
				/>
			</Pressable>
			<CustomText style={styles.abilityText}>{matchedItem.name}</CustomText>
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	abilityImage: {
		flexDirection: "row",
		width: 75,
		height: 75,
		zIndex: 4,
		backgroundColor: theme.colors.background,
		tintColor: theme.colors.font,
		borderRadius: 16,
		borderCurve: "continuous",
		borderWidth: 1,
		borderColor: theme.colors.secondary,
	},
	abilityText: {
		color: "#FFFFFF",
		fontFamily: theme.fontFamily.semiBold,
		fontSize: 8,
		alignSelf: "center",
		width: 60,
		textAlign: "center",
		zIndex: 2,
	},
}));
