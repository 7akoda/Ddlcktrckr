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
									fontFamily: "none",
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
									fontFamily: "none",
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
								width: 100,
								height: 30,
								flexDirection: "row",
								borderRadius: 12,
								borderColor: theme.colors.font,
								borderWidth: 1,
								alignSelf: "center",
							}}>
							<CustomText
								style={{
									left: 4,
									fontSize: 15,
									fontFamily: "none",
									color: theme.colors.font,
									top: 4,
									marginHorizontal: 5,
								}}>
								Sign in
							</CustomText>
							<View style={{ flex: 1 }} />
							<View
								style={{
									width: 50,
									left: 5,
									top: 1,
									alignSelf: "center",
									justifyContent: "center",
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
