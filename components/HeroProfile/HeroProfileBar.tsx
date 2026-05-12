import { View, Image } from "react-native";
import { LoadingIcon } from "../LoadingIcon";
import { CustomText } from "../CustomText";
import { useHeroDataById } from "@/hooks/useHeroDataById";
import { SvgUri } from "react-native-svg";
import { getSpacing } from "@/api/getProfileBarSpacing";
import { useUnistyles, StyleSheet } from "react-native-unistyles";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
	id: number;
};

export const HeroProfileBar = ({ id }: Props) => {
	const { heroDataById, isIdError, isIdLoading, idError } = useHeroDataById(
		String(id),
	);

	const [shadowStyle, setShadowStyle] = useState({});
	const { theme, rt } = useUnistyles();

	useEffect(() => {
		if (leftLight.includes(id)) {
			setShadowStyle(Styles.lightLeft);
		}
		if (middleLight.includes(id)) {
			setShadowStyle(Styles.lightCenter);
		}
		if (!middleLight.includes(id) && !leftLight.includes(id)) {
			setShadowStyle(Styles.lightRight);
		}
	});

	if (isIdLoading) return <LoadingIcon />;

	if (isIdError) return <CustomText>{String(idError)}</CustomText>;

	let space = getSpacing(id);

	const leftLight = [
		1, 8, 13, 25, 4, 58, 52, 72, 17, 10, 79, 65, 14, 35, 60, 15,
	];
	const middleLight = [11, 64, 76, 16, 80];
	return (
		<>
			<View
				style={[
					{
						flexDirection: "row",
						justifyContent: "flex-start",
						overflow: "visible",
					},
					,
				]}>
				<SvgUri
					uri={String(heroDataById.images.name_image)}
					width="50%"
					height="100%"
					preserveAspectRatio="xMidYMid meet"
					style={space}
				/>
				<View style={{ flex: 1 }} />

				<View
					style={[
						{
							height: 150,
							width: 100,
							shadowColor:
								rt.themeName === "dark"
									? theme.colors.background
									: theme.colors.font,
							shadowRadius: 4,
							shadowOpacity: 1,
						},
						shadowStyle,
					]}>
					<Image
						style={{
							height: 150,
							width: 100,
							borderWidth: 1,
							borderRadius: 32,
							borderColor: `rgb(${heroDataById.colors.style.join()})`,
							backgroundColor: `rgb(${heroDataById.colors.ui.join()})`,
						}}
						source={{ uri: heroDataById.images.icon_hero_card_webp }}
					/>
				</View>
			</View>
		</>
	);
};

const Styles = StyleSheet.create((theme) => ({
	lightLeft: { shadowOffset: { width: 4.5, height: -3 } },
	lightRight: { shadowOffset: { width: -4.5, height: -3 } },
	lightCenter: { shadowOffset: { width: 0, height: -3 } },
}));
