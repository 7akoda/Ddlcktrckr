import { ItemProfile } from "@/components/ItemProfile";
import { Link, useLocalSearchParams } from "expo-router";
import { Button, Text, View, Image, SafeAreaView } from "react-native";

export default function itemId() {
	const { itemId } = useLocalSearchParams();
	console.log(itemId)
	return (
		<>
			<SafeAreaView style={{ flex: 1 }}>
				<ItemProfile itemId={itemId} />
			</SafeAreaView>
		</>
	);
}
