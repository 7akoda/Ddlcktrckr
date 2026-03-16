import { View, Image } from "react-native";
import { heroWeapons } from "../../data/weapons";
import { LoadingIcon } from "../LoadingIcon";
import { CustomText } from "../CustomText";
import { useHeroDataById } from "@/hooks/useHeroDataById";
import { useUnistyles, StyleSheet } from "react-native-unistyles";
import Svg, { SvgUri } from "react-native-svg";

type Props = {
	id: number;
};

export const HeroProfileBar = ({ id }: Props) => {
	const { heroDataById, isIdError, isIdLoading, idError } = useHeroDataById(id);
	const { theme } = useUnistyles();
	if (isIdLoading) return <LoadingIcon />;

	if (isIdError) return <CustomText>{String(idError)}</CustomText>;
	return (
		<>
			<View
				style={{
					flexDirection: "row",
					width: "100%",
					paddingTop: 10,
				}}>
				<SvgUri
					uri={String(heroDataById.images.name_image)}
					width="100%"
					height="40"
					color={"theme.colors.accent"}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create((theme) => ({
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
		flexShrink: 1,
		width: 100,
		height: 50,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: "transparent",
		zIndex: 1,
	},
	heroBannerBackground: {
		width: "100%",
		borderRadius: 4,
		height: 70,
		borderWidth: 2,
		borderColor: theme.colors.primary,
		zIndex: 2,
		position: "absolute",
	},
}));
