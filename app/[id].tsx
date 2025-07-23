import { HeroProfile } from "@/components/HeroProfile";
import { Link, useLocalSearchParams } from "expo-router";
import { Button, Text, View, Image, SafeAreaView} from "react-native";

export default function HeroProfilePage() {
  const { id } = useLocalSearchParams();

  return (
    <>
     <SafeAreaView style={{ flex: 1 }}>
    <HeroProfile id ={Number(id)}/>
    </SafeAreaView>
    </>
  );
}
