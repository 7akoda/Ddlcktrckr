import { CustomText } from "@/components/CustomText";
import { Image } from "react-native";
import { cleanDecimals } from "./decimaldescriptionTransform";
import { useUnistyles } from "react-native-unistyles";
export const GetScaleType = (scale: number, scaleType: string) => {
	const { theme } = useUnistyles();
	return (
		<>
			{scaleType === "ETechPower" ? (
				<CustomText
					style={{
						color: "#CE90FF",
						fontSize: 12,
						fontFamily: theme.fontFamily.regular,
					}}>
					{" "}
					<Image
						source={require("../images/25px-Spirit_scaling.png")}
						style={{ width: 12, height: 10 }}
					/>
					x{cleanDecimals(scale)}
				</CustomText>
			) : scaleType === "ELevelUpBoons" ? (
				<CustomText
					style={{
						color: "#00FF99",
						fontSize: 12,
						fontFamily: theme.fontFamily.regular,
					}}>
					{" "}
					<Image
						source={require("../images/20px-Boon_scaling.png")}
						style={{ width: 12, height: 10 }}
					/>
					x{cleanDecimals(scale)}
				</CustomText>
			) : null}
		</>
	);
};
