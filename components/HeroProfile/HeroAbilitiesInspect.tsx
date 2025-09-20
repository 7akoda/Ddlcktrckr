import { useHeroDataById } from "@/hooks/useHeroDataById";
import { LoadingIcon } from "../LoadingIcon";
import { CustomText } from "../CustomText";
import { Dimensions, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { heroMoves } from "../../data/moves";
import { Image } from "react-native";
import { StyleSheet } from "react-native-unistyles";
type Props = {
	id: number;
	match: any;
	abilityInspect: number;
};

export const HeroAbilitiesInspect = ({ id, match, abilityInspect }: Props) => {
	const { theme } = useUnistyles();
	const { itemDataById, isIdError, isIdLoading, idError } = useHeroDataById(id);
	if (isIdLoading) return <LoadingIcon />;
	if (isIdError) return <CustomText>{String(idError)}</CustomText>;
	const formatDesc = (desc: string) => {
		return desc
			.replace(/<[^>]*>/g, "")
			.replace(/&nbsp;/g, " ")
			.replace(/&amp;/g, "&")
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&quot;/g, '"')
			.replace(/{g:citadel_binding:'Attack'}/g, "Attack ")
			.replace(/{g:citadel_binding:'AltCast'}/g, "Alt Cast ")
			.replace(/{g:citadel_binding:'MoveForward'}/g, "Move forward ")
			.replace(/{g:citadel_binding:'MoveDown'}/g, "Move down ")
			.replace(/{g:citadel_binding:'Mantle'}/g, " mantle ")
			.replace(/orAttack/, "or Attack")
			.replace(/{g:citadel_binding:'Ability1'}/g, " Ability 1 ")
			.replace(/{g:citadel_binding:'Ability2'}/g, "Ability 2 ")
			.replace(/{g:citadel_binding:'Ability3'}/g, "Ability 3 ")
			.replace(/{g:citadel_binding:'Ability4'}/g, "Ability 4 ")
			.replace(/\s+/g, " ")
			.trim();
	};

	const matchedHero = heroMoves.find((hero) => {
		return hero.id == id;
	});
	const numbers = [1, 2, 5];

	const signatures = [
		"signature1",
		"signature2",
		"signature3",
		"signature4",
	] as const;

	const upgrades = matchedHero?.[signatures[abilityInspect]]?.upgrades ?? [];

	return (
		<View
			style={{
				backgroundColor: theme.colors.background,
				width: 350,
				zIndex: 4,
				alignSelf: "center",
				borderRadius: 4,
				borderWidth: 2,
				borderColor: theme.colors.primary,
			}}>
			<CustomText
				style={{
					zIndex: 6,
					textAlign: "center",
					color: theme.colors.font,
					fontSize: 10,
					padding: 8,
					margin: 12,
					borderWidth: 2,
					borderRadius: 4,
					borderColor: theme.colors.accent,
				}}>
				{match.description.desc
					? formatDesc(match.description.desc)
					: "No description available"}
			</CustomText>
			<View
				style={{
					flexDirection: "row",
					marginBottom: 12,
				}}>
				{numbers.map((num) => {
					return (
						<View
							style={{
								width: 116.6,
								flexDirection: "row",
								justifyContent: "center",
							}}>
							<Image
								key={num}
								source={require("../../images/20px-Ability_point.png")}
								style={{
									alignSelf: "center",
									width: 15,
									height: 15,
									tintColor: theme.colors.accent,
								}}
							/>
							<CustomText
								style={{
									color: theme.colors.accent,
									fontSize: 14,
									paddingLeft: 4,
									alignSelf: "center",
								}}>
								{num}
							</CustomText>
						</View>
					);
				})}
			</View>
			<View
				style={{
					flexDirection: "row",
					alignSelf: "center",
				}}>
				<View style={{ flexDirection: "row", alignSelf: "center" }}>
					{upgrades.map((upgrade) => (
						<View
							key={upgrade}
							style={{
								flexDirection: "row",
								alignSelf: "center",
							}}>
							<CustomText style={styles.inspectAbility}>{upgrade}</CustomText>
						</View>
					))}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	inspectAbility: {
		zIndex: 6,
		textAlign: "center",
		color: theme.colors.font,
		fontSize: 10,
		width: 116.6,
		minHeight: 70,
		paddingRight: 6,
		paddingLeft: 6,
		paddingTop: 4,
		paddingBottom: 4,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: theme.colors.primary,
	},
}));
