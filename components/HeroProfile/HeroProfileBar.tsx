import { View, Image } from "react-native";
import { heroWeapons } from "../../data/weapons";
import { LoadingIcon } from "../LoadingIcon";
import { CustomText } from "../CustomText";
import { useHeroDataById } from "@/hooks/useHeroDataById";
import { useUnistyles, StyleSheet } from "react-native-unistyles";

type Props = {
	id: number;
};

export const HeroProfileBar = ({ id }: Props) => {
	const { heroDataById, isIdError, isIdLoading, idError } = useHeroDataById(id);

	if (isIdLoading) return <LoadingIcon />;

	if (isIdError) return <CustomText>{String(idError)}</CustomText>;
	return (
		<>
			<Image
				style={styles.heroBannerBackground}
				source={require("../../images/Background_Buildings.png")}></Image>
			<View
				style={{
					flexDirection: "row",
					width: "100%",
				}}>
				<Image
					source={{ uri: heroDataById.images.icon_hero_card_webp }}
					style={styles.heroPortrait}
				/>
				<CustomText style={styles.heroTextBanner}>
					{heroDataById.name}
				</CustomText>
				<Image style={styles.heroWeapon} source={heroWeapons[id].weaponImage} />
			</View>
		</>
	);
};

const styles = StyleSheet.create((theme) => ({
	heroTextBanner: {
		color: theme.colors.bannerFont,
		fontSize: 12,
		marginLeft: 8,
		zIndex: 2,
		marginTop: 26.25,
	},
	heroPortrait: {
		width: 35,
		height: 35,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: theme.colors.primary,
		marginTop: 17.5,
		zIndex: 2,
		marginLeft: 12,
	},
	heroWeapon: {
		height: 70,
		width: 140,
		position: "absolute",
		top: 0,
		left: 235,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: "transparent",
		zIndex: 2,
	},
	heroBannerBackground: {
		width: "100%",
		borderRadius: 4,
		height: 70,
		borderWidth: 2,
		borderColor: theme.colors.primary,
		zIndex: 2,
		position: "absolute",
		top: 48,
	},
}));
