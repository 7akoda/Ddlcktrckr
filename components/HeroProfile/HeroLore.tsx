import { Pressable, ScrollView, View } from "react-native";
import { useUnistyles, StyleSheet } from "react-native-unistyles";
import { CustomText } from "../CustomText";
import { useState } from "react";
import { LoadingIcon } from "../LoadingIcon";
import { useHeroDataById } from "@/hooks/useHeroDataById";

type Props = {
	id: number;
};
export const HeroLore = ({ id }: Props) => {
	const { theme } = useUnistyles();
	const [isLoreExpanded, setIsLoreExpanded] = useState(false);
	const [isOverflowing, setIsOverflowing] = useState(false);
	const toggleLoreExpansion = () => {
		setIsLoreExpanded(!isLoreExpanded);
	};

	const { heroDataById, isIdError, isIdLoading, idError } = useHeroDataById(
		String(id),
	);

	if (isIdLoading) return <LoadingIcon />;

	if (isIdError) return <CustomText>{String(idError)}</CustomText>;
	console.log(heroDataById.description.lore.length);
	return (
		<>
			{heroDataById.description?.lore && (
				<ScrollView
					scrollsToTop
					scrollIndicatorInsets={{ top: 20, left: 0, bottom: 20, right: 0 }}
					scrollEnabled={isOverflowing}
					style={styles.loreContainer}>
					<CustomText
						onLayout={() => {
							if (
								heroDataById.description.lore.length > 1240 ||
								id === 27 ||
								id === 81
							) {
								setIsOverflowing(true);
							} else {
								setIsOverflowing(false);
							}
						}}
						suppressHighlighting
						style={[styles.loreText]}>
						{heroDataById.description.lore}
					</CustomText>
				</ScrollView>
			)}
		</>
	);
};

const styles = StyleSheet.create((theme) => ({
	loreText: {
		color: theme.colors.font,
		padding: 12,
		fontSize: 12,
		alignSelf: "center",
		textAlign: "left",
		fontFamily: theme.fontFamily.serif,
	},

	loreContainer: {
		maxHeight: 350,
		marginHorizontal: 10,
		zIndex: 2,
		borderRadius: 16,
		borderCurve: "continuous",
		borderWidth: 1,
		borderColor: theme.colors.secondary,

		marginBottom: 100,
		backgroundColor: theme.colors.background,
	},
	expandIndicator: {
		alignItems: "center",
		paddingVertical: 8,
		borderTopWidth: 1,
		borderTopColor: theme.colors.primary,
	},
	expandText: {
		fontSize: 9,
		fontWeight: "600",
	},
}));
