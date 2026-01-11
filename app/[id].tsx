import { HeroProfile } from "@/components/HeroProfile";
import { Link, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Id() {
	const { id } = useLocalSearchParams();

	return (
		<>
			<SafeAreaView style={{ flex: 1 }}>
				<HeroProfile id={Number(id)} />
			</SafeAreaView>
		</>
	);
}
