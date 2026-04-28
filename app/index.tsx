import { SafeAreaView } from "react-native-safe-area-context";
import { HeroList } from "@/components/HeroList";
import { HeroPlayerList } from "@/components/HeroPlayerList";
import { useEffect, useState } from "react";
import { EBGaramond_400Regular } from "@expo-google-fonts/eb-garamond/400Regular";
import { EBGaramond_600SemiBold } from "@expo-google-fonts/eb-garamond/600SemiBold";
import { EBGaramond_800ExtraBold } from "@expo-google-fonts/eb-garamond/800ExtraBold";
import { useFonts } from "@expo-google-fonts/eb-garamond/useFonts";
import { Shader1 } from "@/components/Shader";
import { useUnistyles } from "react-native-unistyles";
import { ItemList } from "@/components/ItemList";
import { View, TextInput, Image, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import React from "react";
import { BottomNavBar } from "@/components/BottomNavBar";

export default function Index() {
	const { theme, rt } = useUnistyles();
	const [data, setData] = useState<string | null>(null);

	let [fontsLoaded] = useFonts({
		EBGaramond_400Regular,
		EBGaramond_600SemiBold,
		EBGaramond_800ExtraBold,
	});

	const RES = async (): Promise<string | null> => {
		try {
			const result = await WebBrowser.openAuthSessionAsync(
				"http://192.168.1.90:3000/auth/steam",
			);
			if (result.type === "success") {
				const parsed = Linking.parse(result.url);
				const id = parsed.queryParams?.steamid;

				if (typeof id === "string") {
					return id;
				}
				return null;
			}
			return null;
		} catch (err) {
			console.error("Auth session failed:", err);
			return null;
		}
	};

	const handleLogin = async () => {
		const id = await RES();
		if (id) {
			setData(id);
			console.log(id);
		}
	};
	const [selected, setSelected] = useState("World");

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
							opacity: 0.4,
						}}
						source={require("../images/Background_Buildings_Light.png")}></Image>
				) : null}
			</View>
			{selected === "User" ? (
				<HeroPlayerList id={data} steamAuth={handleLogin} />
			) : selected === "Items" ? (
				<ItemList steamAuth={handleLogin} />
			) : (
				<HeroList steamAuth={handleLogin} />
			)}

			<BottomNavBar selected={selected} setSelected={setSelected} />
		</SafeAreaView>
	);
}
