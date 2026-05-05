import { View } from "react-native";
import { LoadingIcon } from "../LoadingIcon";
import { CustomText } from "../CustomText";
import { useHeroDataById } from "@/hooks/useHeroDataById";
import { SvgUri } from "react-native-svg";
import { getSpacing } from "@/api/getProfileBarSpacing";
import { useUnistyles } from "react-native-unistyles";

type Props = {
	id: number;
};

export const HeroProfileBar = ({ id }: Props) => {
	const { heroDataById, isIdError, isIdLoading, idError } = useHeroDataById(
		String(id),
	);
	const { theme } = useUnistyles();

	if (isIdLoading) return <LoadingIcon />;

	if (isIdError) return <CustomText>{String(idError)}</CustomText>;

	let space = getSpacing(id);

	return (
		<>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "flex-start",
					overflow: "visible",
				}}>
				<SvgUri
					uri={String(heroDataById.images.name_image)}
					width="50%"
					height="100%"
					preserveAspectRatio="xMidYMid meet"
					style={space}
				/>
			</View>
		</>
	);
};
