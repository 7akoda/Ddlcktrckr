import { createHeroDataByIdQueryOptions } from "@/queryOptions/createHeroQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { View, Image, Text, FlatList, Button, Pressable } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useUnistyles } from "react-native-unistyles";
import { SvgUri } from "react-native-svg";
import { SvgComponent } from "./DDLKSvg";
type Props = {
	id: number;
};

export const HeroProfile = ({ id }: Props) => {
	const { theme } = useUnistyles();

	const {
		data: heroDataById,
		error: heroDataByIdError,
		isLoading: heroDataByIdIsLoading,
		isError: heroDataByIdIsError,
	} = useQuery(createHeroDataByIdQueryOptions(id));

	if (heroDataByIdIsLoading) {
		return <Text>Loading...</Text>;
	}

	if (heroDataByIdIsError) {
		console.error(heroDataByIdError);
		return <Text>Failed to load player stats.</Text>;
	}

	return (
		<View style={styles.backgroundView}>
			<Link href="/" dismissTo asChild>
				<Pressable style={{ justifyContent: "center", zIndex: 1 }}>
					{({ pressed }) => (
						<Text style={[styles.heroText, pressed && styles.heroTextFade]}>
							back
						</Text>
					)}
				</Pressable>
			</Link>
			<Image
				style={{
					position: "absolute",
					top: 33,
					width: "140%",
					borderRadius: 4,
					height: 70,
					borderWidth: 2,
					borderColor: theme.colors.primary,
				}}
				source={require("../images/Background_Buildings.png")}></Image>
			<Image
				source={{ uri: heroDataById.images.icon_hero_card_webp }}
				style={{
					position: "absolute",
					top: 50,
					left: 15,
					width: 35,
					height: 35,
					alignSelf: "flex-start",
					borderRadius: 4,
					borderWidth: 2,
					borderColor: theme.colors.primary,
				}}
			/>
			<Text style={styles.heroTextBanner}>{heroDataById.name}</Text>
			<SvgComponent></SvgComponent>
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	backgroundView: {
		backgroundColor: theme.colors.background,
		paddingBottom: 50,
		flex: 1,
		position: "relative",
	},
	heroText: {
		color: theme.colors.font,
		paddingLeft: 7,
		fontSize: 13,
		alignSelf: "center",
	},
	heroTextBanner: {
		position: "absolute",
		color: theme.colors.bannerFont,
		paddingLeft: 7,
		fontSize: 13,
		alignSelf: "center",
		top: 58,
		left: 50,
	},
	heroTextFade: {
		color: theme.colors.font,
		paddingLeft: 7,
		fontSize: 13,
		alignSelf: "center",
		opacity: 0.6,
	},
}));
