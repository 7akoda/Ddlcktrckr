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

	const { heroDataById, isIdError, isIdLoading, idError } = useHeroDataById(id);

	if (isIdLoading) return <LoadingIcon />;

	if (isIdError) return <CustomText>{String(idError)}</CustomText>;
	return (
		<>
			{heroDataById.description?.lore && (
				<View
					style={[
						styles.loreContainer,
						{
							backgroundColor: theme.colors.background,
							borderColor: theme.colors.accent,
						},
					]}>
					<CustomText
						ellipsizeMode="clip"
						numberOfLines={isLoreExpanded ? undefined : 5}
						onLayout={(e) => {
							const { height } = e.nativeEvent.layout;
							if (height >= 86.5) {
								setIsOverflowing(true);
							} else {
								setIsOverflowing(false);
							}
						}}
						suppressHighlighting
						style={[styles.loreText, { color: theme.colors.font }]}>
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
		fontSize: 10,
		alignSelf: "center",
		textAlign: "center",
	},

	loreContainer: {
		marginTop: 40,
		marginHorizontal: 10,
		zIndex: 2,
		borderRadius: 4,
		borderWidth: 2,
		overflow: "hidden",
		marginBottom: 30,
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
