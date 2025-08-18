import { useHeroDataById } from "@/hooks/useHeroDataById";
import { LoadingIcon } from "../LoadingIcon";
import { CustomText } from "../CustomText";
import { Dimensions, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";

type Props = {
	id: number;
};

export const HeroAbilitiesInspect = ({ id }: Props) => {
	const { theme } = useUnistyles();
	const { itemDataById, isIdError, isIdLoading, idError } = useHeroDataById(id);
	if (isIdLoading) return <LoadingIcon />;

	if (isIdError) return <CustomText>{String(idError)}</CustomText>;
	return (
		<View>
			<CustomText
				style={{
					alignSelf: "center",
					color: theme.colors.font,
					fontSize: 80,
				}}></CustomText>
		</View>
	);
};
