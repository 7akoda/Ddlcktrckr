import { View } from "react-native";
import { LoadingIcon } from "../LoadingIcon";
import { CustomText } from "../CustomText";
import { useHeroDataById } from "@/hooks/useHeroDataById";
import { SvgUri } from "react-native-svg";

type Props = {
	id: number;
};

export const HeroProfileBar = ({ id }: Props) => {
	const { heroDataById, isIdError, isIdLoading, idError } = useHeroDataById(
		String(id),
	);

	if (isIdLoading) return <LoadingIcon />;

	if (isIdError) return <CustomText>{String(idError)}</CustomText>;
	return (
		<>
			<View
				style={{
					flexDirection: "row",
					width: "100%",
					paddingTop: 10,
				}}>
				<SvgUri
					uri={String(heroDataById.images.name_image)}
					width="100%"
					height="40"
					color={"theme.colors.accent"}
				/>
			</View>
		</>
	);
};
