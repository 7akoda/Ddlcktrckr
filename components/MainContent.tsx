import { Button, Pressable, View } from "react-native";
import { CustomText } from "./CustomText";
import { HeroList } from "./HeroList";
import { Popup } from "./Popup";
import { ItemList } from "./ItemList";
import { useUnistyles } from "react-native-unistyles";
import { LoadingIcon } from "./LoadingIcon";
import { LoadingIconSmall } from "./LoadingIconSmall";
import { HeroPlayerList } from "./HeroPlayerList";

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
			{selected === "User" && data.length < 1 && settings ? (
				<>
					<HeroList handleLogin={handleLogin} />
					<Popup settings={settings} handlePress={handleNoAuth}>
						<View>
							<Pressable
								onPress={handleLogin}
								style={{
									backgroundColor: theme.colors.font,
									width: 165,
									height: 30,
									alignSelf: "center",
									borderRadius: 12,
									borderWidth: 1,
									borderColor: theme.colors.font,
									justifyContent: "center",
								}}>
								<CustomText
									style={{
										color: theme.colors.background,
										alignSelf: "center",
										textAlign: "center",
										fontSize: 18,
									}}>
									Sign in with Steam
								</CustomText>
							</Pressable>
						</View>
						<LoadingIconSmall />
					</Popup>
				</>
			) : selected === "Items" ? (
				<ItemList handleLogin={handleLogin} />
			) : selected === "User" && data.length > 1 ? (
				<HeroPlayerList id={data} handleLogin={handleLogin} />
			) : (
				<HeroList handleLogin={handleLogin} />
			)}
		</>
	);
};
