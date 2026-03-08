import { HeroProfile } from "@/components/HeroProfile";
import { Shader1 } from "@/components/Shader";
import { Link, useLocalSearchParams } from "expo-router";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUnistyles } from "react-native-unistyles";

export default function Id() {
	const { id } = useLocalSearchParams();
	const { rt } = useUnistyles();

	return (
		<>
			<SafeAreaView style={{ flex: 1 }}>
				<Shader1 />
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
								opacity: 0.3,
							}}
							source={require("../images/Background_Buildings.png")}></Image>
					) : null}
				</View>
				<HeroProfile id={Number(id)} />
			</SafeAreaView>
		</>
	);
}
