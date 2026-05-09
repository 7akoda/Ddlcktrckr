import { Pressable, View } from "react-native";
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
				<View style={[styles.loreContainer]}>
					<CustomText
						ellipsizeMode="clip"
						numberOfLines={isLoreExpanded ? undefined : 11}
						onLayout={() => {
							if (
								heroDataById.description.lore.length > 534 &&
								id !== 1 &&
								id !== 11 &&
								id !== 50
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

					{isOverflowing && (
						<Pressable
							onPress={toggleLoreExpansion}
							style={styles.expandIndicator}>
							<CustomText
								style={[styles.expandText, { color: theme.colors.accent }]}>
								{isLoreExpanded ? "▲ Collapse" : "▼ Read More"}
							</CustomText>
						</Pressable>
					)}
				</View>
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
		marginTop: 40,
		marginHorizontal: 10,
		zIndex: 2,
		borderRadius: 16,
		borderCurve: "continuous",
		borderWidth: 1,
		borderColor: theme.colors.secondary,
		overflow: "hidden",
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
