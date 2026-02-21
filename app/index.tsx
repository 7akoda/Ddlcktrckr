import { SafeAreaView } from "react-native-safe-area-context";
import { HeroList } from "@/components/HeroList";
import { HeroPlayerList } from "@/components/HeroPlayerList";
import { HeroProfile } from "@/components/HeroProfile";
import { useState } from "react";
import { Link } from "expo-router";
import { useFonts } from "@expo-google-fonts/eb-garamond";
import {
	EBGaramond_400Regular,
	EBGaramond_600SemiBold,
	EBGaramond_800ExtraBold,
} from "@expo-google-fonts/eb-garamond";
import { useUnistyles } from "react-native-unistyles";
import { ItemList } from "@/components/ItemList";

export default function Index() {
	const { theme } = useUnistyles();
	const kodaNum = "76561198053289095";
	const [hero, setHero] = useState(0);
	let [fontsLoaded] = useFonts({
		EBGaramond_400Regular,
		EBGaramond_600SemiBold,
		EBGaramond_800ExtraBold,
	});

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
			{/* <HeroList /> */}
			<ItemList />
		</SafeAreaView>
	);
}
