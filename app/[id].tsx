import { HeroProfile } from "@/components/HeroProfile";
import { Shader1 } from "@/components/Shader";
import { useLocalSearchParams } from "expo-router";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUnistyles } from "react-native-unistyles";
import { CustomText } from "@/components/CustomText";
import { LoadingIcon } from "@/components/LoadingIcon";
import { useHeroDataById } from "@/hooks/useHeroDataById";
import { BackgroundImage } from "@/components/BackgroundImage";

export default function Id() {
	const { id } = useLocalSearchParams();
	const { theme } = useUnistyles();

	const { heroDataById, isIdError, isIdLoading, idError } = useHeroDataById(
		String(id),
	);

	if (isIdLoading) return <LoadingIcon />;

	if (isIdError) return <CustomText>{String(idError)}</CustomText>;
	console.log(id);

	return (
		<>
			<SafeAreaView
				style={{ flex: 1, backgroundColor: theme.colors.background }}>
				<Shader1 />
				<BackgroundImage />

				<Image
					style={{
						width: "115%",
						height: "114%",
						position: "absolute",
					}}
					source={{ uri: heroDataById.images.background_image_webp }}
				/>
				<HeroProfile id={Number(id)} />
			</SafeAreaView>
		</>
	);
}
