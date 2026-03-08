import { SafeAreaView } from "react-native-safe-area-context";
import { HeroList } from "@/components/HeroList";
import { HeroPlayerList } from "@/components/HeroPlayerList";
import { HeroProfile } from "@/components/HeroProfile";
import { useState } from "react";
import { Link } from "expo-router";
import { useFonts } from "@expo-google-fonts/eb-garamond";
import { Shader1 } from "@/components/Shader";
import {
	EBGaramond_400Regular,
	EBGaramond_600SemiBold,
	EBGaramond_800ExtraBold,
} from "@expo-google-fonts/eb-garamond";
import { useUnistyles } from "react-native-unistyles";
import { ItemList } from "@/components/ItemList";
import { View, Image } from "react-native";

export default function Index() {
	const { theme, rt } = useUnistyles();
	const kodaNum = "76561198053289095";
	const [hero, setHero] = useState(0);
	let [fontsLoaded] = useFonts({
		EBGaramond_400Regular,
		EBGaramond_600SemiBold,
		EBGaramond_800ExtraBold,
	});

	return (
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
							opacity: 0.2,
						}}
						source={require("../images/Background_Buildings_Light.png")}></Image>
				) : null}
			</View>

			<HeroList />
			{/* <ItemList /> */}
		</SafeAreaView>
	);
}
