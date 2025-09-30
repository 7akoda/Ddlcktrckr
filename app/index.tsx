import { Button, SafeAreaView, ScrollView, View, Text } from "react-native";
import { HeroList } from "@/components/HeroList";
import { HeroPlayerList } from "@/components/HeroPlayerList";
import { HeroProfile } from "@/components/HeroProfile";
import { useState } from "react";
import { Link } from "expo-router";
import { useFonts } from "@expo-google-fonts/rye";
import { Rye_400Regular } from "@expo-google-fonts/rye";
import { useUnistyles } from "react-native-unistyles";
import { ItemList } from "@/components/ItemList";
import { ItemListTest } from "@/components/ItemListTest";

export default function Index() {
	const { theme } = useUnistyles();
	const kodaNum = "76561198053289095";
	const [hero, setHero] = useState(0);
	let [fontsLoaded] = useFonts({
		Rye_400Regular,
	});
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
			{/* <HeroPlayerList id={kodaNum} /> */}
			<ItemListTest />
		</SafeAreaView>
	);
}
