import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Shader1 } from "@/components/Shader";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { BottomNavBar } from "@/components/BottomNavBar";
import { BackgroundImage } from "@/components/BackgroundImage";
import { MainContent } from "@/components/MainContent";
import { IntroIcon } from "@/components/IntroIcon";
import { useUnistyles } from "react-native-unistyles";
import { useHeroData } from "@/hooks/useHeroData";
import { useFonts } from "@expo-google-fonts/eb-garamond/useFonts";
import { EBGaramond_400Regular } from "@expo-google-fonts/eb-garamond/400Regular";
import { EBGaramond_500Medium } from "@expo-google-fonts/eb-garamond/500Medium";
import { EBGaramond_600SemiBold } from "@expo-google-fonts/eb-garamond/600SemiBold";
import { EBGaramond_700Bold } from "@expo-google-fonts/eb-garamond/700Bold";
import { EBGaramond_800ExtraBold } from "@expo-google-fonts/eb-garamond/800ExtraBold";
import { EBGaramond_400Regular_Italic } from "@expo-google-fonts/eb-garamond/400Regular_Italic";
import { EBGaramond_500Medium_Italic } from "@expo-google-fonts/eb-garamond/500Medium_Italic";
import { EBGaramond_600SemiBold_Italic } from "@expo-google-fonts/eb-garamond/600SemiBold_Italic";
import { EBGaramond_700Bold_Italic } from "@expo-google-fonts/eb-garamond/700Bold_Italic";
import { EBGaramond_800ExtraBold_Italic } from "@expo-google-fonts/eb-garamond/800ExtraBold_Italic";
import { Smythe_400Regular } from "@expo-google-fonts/smythe/400Regular";

export default function Index() {
	const [data, setData] = useState<string>("");
	const [settings, setSettings] = useState(false);
	const [selected, setSelected] = useState("World");
	const [ready, setReady] = useState(false);
	const { theme } = useUnistyles();
	const { isLoading } = useHeroData();

	let [fontsLoaded] = useFonts({
		EBGaramond_400Regular,
		EBGaramond_500Medium,
		EBGaramond_600SemiBold,
		EBGaramond_700Bold,
		EBGaramond_800ExtraBold,
		EBGaramond_400Regular_Italic,
		EBGaramond_500Medium_Italic,
		EBGaramond_600SemiBold_Italic,
		EBGaramond_700Bold_Italic,
		EBGaramond_800ExtraBold_Italic,
		Smythe_400Regular,
	});

	if (data == null && selected === "User") {
		setSettings(true);
	}

	const res = async (): Promise<string | null> => {
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
		const id = await res();
		if (id) {
			setData(id);
			console.log(id);
		}
	};
	const handleNoAuth = () => {
		setSettings((prev) => !prev);
		setSelected("World");
	};

	useEffect(() => {
		setTimeout(() => {
			setReady(true);
		}, 7000);
	}, []);

	if (!fontsLoaded) return null;

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: theme.colors.background,
			}}>
			<Shader1 />
			<BackgroundImage />
			{!ready && <IntroIcon />}
			{ready && !isLoading && (
				<>
					<MainContent
						data={data}
						handleLogin={handleLogin}
						handleNoAuth={handleNoAuth}
						selected={selected}
						settings={settings}
					/>
					<BottomNavBar
						data={data}
						setSettings={setSettings}
						selected={selected}
						setSelected={setSelected}
					/>
				</>
			)}
		</SafeAreaView>
	);
}
