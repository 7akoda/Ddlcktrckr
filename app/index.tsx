import { SafeAreaView } from "react-native-safe-area-context";
import { HeroList } from "@/components/HeroList";
import { HeroPlayerList } from "@/components/HeroPlayerList";
import { HeroProfile } from "@/components/HeroProfile";
import { useEffect, useState } from "react";
import { EBGaramond_400Regular } from "@expo-google-fonts/eb-garamond/400Regular";
import { EBGaramond_600SemiBold } from "@expo-google-fonts/eb-garamond/600SemiBold";
import { EBGaramond_800ExtraBold } from "@expo-google-fonts/eb-garamond/800ExtraBold";
import { useFonts } from "@expo-google-fonts/eb-garamond/useFonts";
import { Shader1 } from "@/components/Shader";
import { useUnistyles } from "react-native-unistyles";
import { ItemList } from "@/components/ItemList";
import { View, TextInput, Image } from "react-native";

import React from "react";

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
							style={{ width: 1800, height: 900, opacity: 0.15 }}
							source={require("../images/background_Corner.jpeg")}></Image>
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
