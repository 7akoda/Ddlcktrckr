import { Pressable, View } from "react-native";
import { CustomText } from "./CustomText";
import { HeroList } from "./HeroList";
import { Popup } from "./Popup";
import { ItemList } from "./ItemList";
import { useUnistyles } from "react-native-unistyles";
import { LoadingIcon } from "./LoadingIcon";

import { HeroPlayerList } from "./HeroPlayerList";
import { SteamSvg } from "./svgComponents/SteamSVG";

type MainType = {
	selected: string;
	settings: boolean;
	data: string;
	handleLogin: () => void;
	handleNoAuth: () => void;
};

export const MainContent = ({
	selected,
	data,
	handleLogin,
	settings,
	handleNoAuth,
}: MainType) => {
	const { theme } = useUnistyles();

	return (
		<>
			{data.length < 1 && selected === "User" ? (
				<View style={{ height: "100%" }}>
					<Popup settings={settings} handlePress={handleNoAuth}>
						<View>
							<CustomText
								style={{
									fontSize: 10,
									fontFamily: theme.fontFamily.extraBold,
									color: theme.colors.font,
									top: 7,
									marginHorizontal: 5,
									alignSelf: "center",
									marginBottom: 5,
								}}>
								User data unavailable
							</CustomText>
							<CustomText
								style={{
									fontSize: 10,
									fontFamily: theme.fontFamily.extraBold,
									color: theme.colors.font,
									top: 7,
									marginHorizontal: 5,
									alignSelf: "center",
									marginBottom: 15,
								}}>
								Authentication required
							</CustomText>
						</View>
						<Pressable
							onPress={handleLogin}
							style={{
								width: 150,
								height: 40,
								flexDirection: "row",
								borderRadius: 24,
								borderColor: theme.colors.font,
								borderWidth: 1,
								alignSelf: "center",
							}}>
							<CustomText
								style={{
									fontSize: 19,
									fontFamily: theme.fontFamily.extraBold,
									color: theme.colors.font,
									top: 7,
									marginHorizontal: 5,
								}}>
								Sign in
							</CustomText>
							<View style={{ flex: 1 }} />
							<View
								style={{
									backgroundColor: theme.colors.background,
									width: 55,
									overflow: "hidden",
									height: 30,
									alignSelf: "center",
									borderRadius: 24,
									borderWidth: 1,
									borderColor: theme.colors.font,
									justifyContent: "center",
									marginRight: 5,
								}}>
								<SteamSvg fill={theme.colors.font} />
							</View>
						</Pressable>
					</Popup>
					<LoadingIcon />
				</View>
			) : selected === "Items" ? (
				<ItemList />
			) : selected === "User" && data.length > 1 ? (
				<HeroPlayerList id={data} />
			) : (
				<HeroList />
			)}
		</>
	);
};
