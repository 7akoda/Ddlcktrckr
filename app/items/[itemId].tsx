import { BackgroundImage } from "@/components/BackgroundImage";
import { ItemProfile } from "@/components/ItemProfile";
import { Shader1 } from "@/components/Shader";
import { useLocalSearchParams } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import { useUnistyles } from "react-native-unistyles";

export default function ItemId() {
	const { itemId } = useLocalSearchParams();
	const { theme } = useUnistyles();
	return (
		<>
			<SafeAreaView
				style={{ flex: 1, backgroundColor: theme.colors.background }}>
				<Shader1 />
				<BackgroundImage />

				{itemId && <ItemProfile itemId={itemId} />}
			</SafeAreaView>
		</>
	);
}
