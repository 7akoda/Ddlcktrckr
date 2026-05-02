import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Shader1 } from "@/components/Shader";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import React from "react";
import { BottomNavBar } from "@/components/BottomNavBar";
import { BackgroundImage } from "@/components/BackgroundImage";
import { MainContent } from "@/components/MainContent";
import { IntroIcon } from "@/components/IntroIcon";
import { LoadingIcon } from "@/components/LoadingIcon";

export default function Index() {
	const [data, setData] = useState<string>("");
	const [settings, setSettings] = useState(false);
	const [selected, setSelected] = useState("World");
	const [ready, setReady] = useState(false);

	if (data == null && selected == "User") {
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

	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}>
			<Shader1 />
			<BackgroundImage />
			{ready == false ? (
				<>
					<IntroIcon />
				</>
			) : (
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
