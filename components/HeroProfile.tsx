import {
	createEnrichedHeroQueryOptions,
	createHeroDataByIdQueryOptions,
	createItemDataByIdQueryOptions,
} from "@/queryOptions/createHeroQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import {
	View,
	Image,
	Text,
	FlatList,
	Button,
	Pressable,
	Dimensions,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useUnistyles } from "react-native-unistyles";
import { SvgUri } from "react-native-svg";
import { SvgComponent } from "./DDLKSvg";
import { Header } from "./Header";
import { getHeroData } from "@/api/getHeroData";
type Props = {
	id: number;
};

export const HeroProfile = ({ id }: Props) => {
	const { theme } = useUnistyles();
	const screenHeight = Dimensions.get("window").height;

	const {
		data: heroStats,
		error: heroStatsError,
		isLoading: heroStatsLoading,
		isError: heroStatsIsError,
	} = useQuery(createEnrichedHeroQueryOptions());

	const {
		data: heroDataById,
		error: heroDataByIdError,
		isLoading: heroDataByIdIsLoading,
		isError: heroDataByIdIsError,
	} = useQuery(createHeroDataByIdQueryOptions(id));

	const {
		data: itemDataById,
		error: itemDataByIdError,
		isLoading: itemDataByIdIsLoading,
		isError: itemDataByIdIsError,
	} = useQuery(createItemDataByIdQueryOptions(id));

	if (heroDataByIdIsLoading || heroStatsLoading || itemDataByIdIsLoading) {
		return <Text>Loading...</Text>;
	}

	if (heroDataByIdIsError || heroStatsIsError || itemDataByIdIsError) {
		console.error(heroDataByIdError);
		console.error(heroStatsError);
		console.error(itemDataByIdError);

		return <Text>Failed to load player stats.</Text>;
	}

	const heroList = Array.isArray(heroStats) ? heroStats : [];

	const heroIdMatch = heroList?.find((hero: any) => {
		return hero.id === id;
	});
	console.log(heroIdMatch);
	console.log(itemDataById);

	return (
		<View style={styles.backgroundView}>
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
				<Text style={styles.heroTextBanner}>{heroDataById.name}</Text>
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
				{/* <SvgComponent></SvgComponent> */}
			</View>
			<View style={{ alignItems: "center", top: 20 }}>
				<Text style={{ color: theme.colors.font }}>Abilities</Text>
			</View>
			<View style={styles.itemView}>
				{itemDataById.map((itemData: any, index: number) => {
					if (index > 0)
						return (
							<Image
								style={{
									flexDirection: "row",
									width: 50,
									height: 50,
									zIndex: 2,
									backgroundColor: theme.colors.background,
									tintColor: theme.colors.accent,
									borderRadius: 4,
									borderWidth: 2,
									borderColor: theme.colors.primary,
								}}
								source={{ uri: itemData.image_webp }}
							/>
						);
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	backgroundView: {
		backgroundColor: theme.colors.background,
		flex: 1,
	},
	heroText: {
		color: theme.colors.font,
		paddingLeft: 7,
		fontSize: 13,
		alignSelf: "center",
		zIndex: 2,
	},
	heroTextBanner: {
		color: theme.colors.bannerFont,
		fontSize: 13,
		marginLeft: 8,
		zIndex: 2,
		marginTop: 26.25,
	},
	heroTextFade: {
		color: theme.colors.font,
		paddingLeft: 7,
		fontSize: 13,
		opacity: 0.6,
		zIndex: 2,
	},
	itemView: {
		top: 30,
		width: "100%",
		flexDirection: "row",
		position: "relative",
		zIndex: 2,
		justifyContent: "space-evenly",
	},
}));
