import { useHeroDataById } from "@/hooks/useHeroDataById";
import { CustomText } from "../CustomText";
import { LoadingIcon } from "../LoadingIcon";
import { View, Image } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import Svg, { SvgUri } from "react-native-svg";
import { HealthIcon } from "../svgComponents/heroStatSVGs/HealthIcon";
import { HealthRegenIcon } from "../svgComponents/heroStatSVGs/HealthRegenIcon";
import { StaminaIcon } from "../svgComponents/heroStatSVGs/StaminaIcon";
import { MoveIcon } from "../svgComponents/heroStatSVGs/MoveIcon";
import { SprintIcon } from "../svgComponents/heroStatSVGs/SprintIcon";
import { LightMeleeIcon } from "../svgComponents/heroStatSVGs/LightMeleeIcon";
import { HeavyMeleeIcon } from "../svgComponents/heroStatSVGs/HeavyMeleeIcon";

type statType = {
	id: number;
};
export const HeroStatsBar = ({ id }: statType) => {
	const { heroDataById, isIdError, isIdLoading, idError } = useHeroDataById(
		String(id),
	);
	const { theme } = useUnistyles();
	if (isIdLoading) return <LoadingIcon />;

	if (isIdError) return <CustomText>{String(idError)}</CustomText>;

	return (
		<View
			style={{
				marginTop: 24,
				flexDirection: "row",
				justifyContent: "space-evenly",
				marginBottom: 12,
			}}>
			<View style={{ flexDirection: "row", marginHorizontal: 2 }}>
				<View style={{ width: 40 }}>
					<HealthIcon />
					<CustomText
						style={{
							color: "#FFFFFF",
							fontSize: 9,
							alignSelf: "center",
						}}>
						{heroDataById.starting_stats.max_health.value}
					</CustomText>
				</View>
				<View style={{ width: 40 }}>
					<HealthRegenIcon />
					<CustomText
						style={{
							color: "#FFFFFF",
							fontSize: 9,
							alignSelf: "center",
						}}>
						{heroDataById.starting_stats.base_health_regen.value}
					</CustomText>
				</View>
			</View>
			<View style={{ flexDirection: "row", marginHorizontal: 2 }}>
				<View style={{ width: 40 }}>
					<StaminaIcon />
					<CustomText
						style={{
							color: "#FFFFFF",
							fontSize: 9,
							alignSelf: "center",
						}}>
						{heroDataById.starting_stats.stamina.value}
					</CustomText>
				</View>
				<View style={{ width: 40 }}>
					<MoveIcon />
					<CustomText
						style={{
							color: "#FFFFFF",

							fontSize: 9,
							alignSelf: "center",
						}}>
						{heroDataById.starting_stats.max_move_speed.value}
					</CustomText>
				</View>
				<View style={{ width: 40 }}>
					<SprintIcon />
					<CustomText
						style={{
							color: "#FFFFFF",
							fontSize: 9,
							alignSelf: "center",
						}}>
						{(
							heroDataById.starting_stats.sprint_speed.value +
							heroDataById.starting_stats.max_move_speed.value
						).toFixed(1)}
					</CustomText>
				</View>
			</View>
			<View style={{ flexDirection: "row", marginHorizontal: 2 }}>
				<View style={{ width: 40 }}>
					<LightMeleeIcon />
					<CustomText
						style={{
							color: "#FFFFFF",
							fontSize: 9,
							alignSelf: "center",
						}}>
						{heroDataById.starting_stats.light_melee_damage.value}
					</CustomText>
				</View>
				<View style={{ width: 40 }}>
					<HeavyMeleeIcon />
					<CustomText
						style={{
							color: "#FFFFFF",
							fontSize: 9,
							alignSelf: "center",
						}}>
						{heroDataById.starting_stats.heavy_melee_damage.value}
					</CustomText>
				</View>
			</View>
		</View>
	);
};
