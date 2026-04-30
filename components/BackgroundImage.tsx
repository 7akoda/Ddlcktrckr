import { View, Image } from "react-native";
import { useUnistyles } from "react-native-unistyles";
export const BackgroundImage = () => {
	const { rt } = useUnistyles();
	return (
		<View style={{ position: "absolute" }}>
			{rt.themeName === "dark" ? (
				<>
					<Image
						style={{ width: 1390, height: 900, opacity: 0.2 }}
						source={require("../images/Background_Buildings.png")}></Image>
				</>
			) : rt.themeName === "light" ? (
				<Image
					style={{
						width: 1390,
						height: 900,
						opacity: 0.2,
					}}
					source={require("../images/Background_Buildings_Light.png")}></Image>
			) : null}
		</View>
	);
};
