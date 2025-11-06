import { ItemProfile } from "@/components/ItemProfile";
import { Link, useLocalSearchParams } from "expo-router";
import { Button, Text, View, Image, SafeAreaView } from "react-native";

export default function itemId() {
	const { itemId } = useLocalSearchParams();
	//LEARN WHY THIS IS NOT BEING CALLED FROM ITEMLIST AND INSTEAD [id] is
	return (
		<>
			<SafeAreaView style={{ flex: 1 }}>
				<ItemProfile itemId={itemId} />
			</SafeAreaView>
		</>
	);
}
