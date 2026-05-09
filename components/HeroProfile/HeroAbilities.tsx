import { Pressable, Image, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { CustomText } from "../CustomText";
import Animated, {
	createAnimatedComponent,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import { BouncePress } from "@/animations/Bounce";
import { useState } from "react";

type Props = {
	handleShade: () => void;
	matchedItem: any;
	setSelectedAbilityIndex: (matchedItem: any) => void;
};
const AnimatedPressable = createAnimatedComponent(Pressable);
export const HeroAbilities = ({
	handleShade,
	matchedItem,
	setSelectedAbilityIndex,
}: Props) => {
	const [isColumn, setIsColumn] = useState(false);

	const size = useSharedValue(1);
	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ scale: size.value }],
		};
	});
	const abilitySplit = matchedItem.name.split(" ");

	return (
		<Animated.View style={animatedStyles}>
			<AnimatedPressable
				onPress={() => {
					{
						BouncePress(size, 75);
						handleShade();
						setSelectedAbilityIndex(matchedItem);
					}
				}}>
				<Image
					style={styles.abilityImage}
					source={{ uri: matchedItem.image_webp }}
				/>
			</AnimatedPressable>
			<View
				onLayout={(e) => {
					const width = e.nativeEvent.layout.width;
					if (width > 80) {
						setIsColumn(true);
					}
				}}
				style={{
					flexDirection: isColumn ? "column" : "row",
					alignSelf: "center",
				}}>
				{abilitySplit.length === 3 ? (
					<>
						<CustomText style={styles.abilityText}>
							{abilitySplit[0]} {abilitySplit[1]}
						</CustomText>
						<CustomText style={styles.abilityText}>
							{abilitySplit[2]}
						</CustomText>
					</>
				) : (
					abilitySplit.map((ability: string) => {
						return (
							<CustomText key={ability} style={styles.abilityText}>
								{ability}
								{isColumn ? "" : " "}
							</CustomText>
						);
					})
				)}
			</View>
		</Animated.View>
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
		alignSelf: "center",
		textAlign: "center",
		zIndex: 2,
		fontSize: 12,
	},
}));
