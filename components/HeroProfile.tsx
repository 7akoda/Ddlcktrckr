import {
	createEnrichedHeroQueryOptions,
	createHeroDataByIdQueryOptions,
	createItemDataByIdQueryOptions,
} from "@/queryOptions/createHeroQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { heroWeapons } from "../data/weapons";
import { Link } from "expo-router";
import {
	View,
	Image,
	Text,
	FlatList,
	Button,
	Pressable,
	Dimensions,
	ScrollView,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useUnistyles } from "react-native-unistyles";
import { SvgUri } from "react-native-svg";
import { SvgComponent } from "./DDLKSvg";
import { Header } from "./Header";
import { getHeroData } from "@/api/getHeroData";
import { useCallback, useState } from "react";
import { CustomText } from "./CustomText";
import { useHeroData } from "@/hooks/useHeroData";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
import { LoadingIcon } from "./LoadingIcon";

type Props = {
	id: number;
};

export const HeroProfile = ({ id }: Props) => {
	const { theme } = useUnistyles();
	const screenHeight = Dimensions.get("window").height;
	const [isLoreExpanded, setIsLoreExpanded] = useState(false);
	const [abilityPressed, setAbilityPressed] = useState(false);
	const [isOverflowing, setIsOverflowing] = useState(false);

	const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
	const opacity = useSharedValue(0);
	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	const handleShade = () => {
		setAbilityPressed((prev) => {
			const newVal = !prev;
			opacity.value = newVal ? 0.8 : 0;
			return newVal;
		});
	};
	let { heroDataById, itemDataById, isError, isLoading } = useHeroData(id);
	isLoading = true;
	if (isLoading) return <LoadingIcon />;
	if (isError) return <CustomText>Error loading data</CustomText>;

	const toggleLoreExpansion = () => {
		setIsLoreExpanded(!isLoreExpanded);
	};

	console.log(abilityPressed);
	const heroMoves = [
		heroDataById.items.signature1,
		heroDataById.items.signature2,
		heroDataById.items.signature3,
		heroDataById.items.signature4,
	];
	return (
		<View>
			<ScrollView
				style={{
					backgroundColor: theme.colors.background,
					height: screenHeight,
				}}>
				<Header back={true} sortable={false} />
				<Image
					style={{
						width: "100%",
						borderRadius: 4,
						height: 70,
						borderWidth: 2,
						borderColor: theme.colors.primary,
						zIndex: 2,
						position: "absolute",
						top: 48,
					}}
					source={require("../images/Background_Buildings.png")}></Image>
				<View
					style={{
						flexDirection: "row",
						width: "100%",
					}}>
					<Image
						source={{ uri: heroDataById.images.icon_hero_card_webp }}
						style={{
							width: 35,
							height: 35,
							borderRadius: 4,
							borderWidth: 2,
							borderColor: theme.colors.primary,
							marginTop: 17.5,
							zIndex: 2,
							marginLeft: 12,
						}}
					/>
					<CustomText style={styles.heroTextBanner}>
						{heroDataById.name}
					</CustomText>
					<Image
						style={{
							height: 70,
							width: 140,
							position: "absolute",
							top: 0,
							left: 235,
							borderRadius: 4,
							borderWidth: 2,
							borderColor: "transparent",
							zIndex: 2,
						}}
						source={heroWeapons[id].weaponImage}
					/>
				</View>
				<View
					style={{
						position: "absolute",
						alignSelf: "center",
						justifyContent: "center",
						width: "100%",
						height: screenHeight,
						zIndex: 1,
					}}>
					<SvgComponent></SvgComponent>
				</View>

				<View style={styles.itemView}>
					{heroMoves.map((moves, index) => {
						const matchedItem = itemDataById.find(
							(item: any) => item.class_name === moves
						);
						return (
							<View key={index} style={{ flexDirection: "column" }}>
								<Pressable
									onPress={() => {
										handleShade();
									}}>
									<Image
										style={{
											flexDirection: "row",
											width: 60,
											height: 60,
											zIndex: 2,
											backgroundColor: theme.colors.background,
											tintColor: theme.colors.accent,
											borderRadius: 4,
											borderWidth: 2,
											borderColor: theme.colors.primary,
										}}
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
							numberOfLines={isLoreExpanded ? undefined : 6}
							onLayout={(e) => {
								const { height } = e.nativeEvent.layout;
								if (height >= 99) {
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
			</ScrollView>
			{abilityPressed ? (
				<AnimatedPressable
					onPress={() => {
						handleShade();
					}}
					style={[
						{
							position: "absolute",
							backgroundColor: theme.colors.background,
							width: "100%",
							height: screenHeight,
							zIndex: 4,
						},
						animatedStyle,
					]}></AnimatedPressable>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	abilityText: {
		color: theme.colors.font,
		fontSize: 8,
		alignSelf: "center",
		width: 60,
		textAlign: "center",
		zIndex: 2,
	},
	loreText: {
		color: theme.colors.font,
		padding: 12,
		fontSize: 10,
		alignSelf: "center",
		textAlign: "center",
	},
	heroTextBanner: {
		color: theme.colors.bannerFont,
		fontSize: 12,
		marginLeft: 8,
		zIndex: 2,
		marginTop: 26.25,
	},
	itemView: {
		top: 30,
		width: "100%",
		flexDirection: "row",
		position: "relative",
		zIndex: 2,
		justifyContent: "space-evenly",
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
