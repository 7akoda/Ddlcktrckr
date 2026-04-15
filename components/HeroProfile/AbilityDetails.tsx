import { View, Image } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { CustomText } from "../CustomText";
import { StyleSheet } from "react-native-unistyles";
import {
	cleanDetailDecimals,
	detailsBonusNumberizer,
	detailsValueNumberizer,
} from "@/api/decimaldescriptionTransform";
type Props = {
	match: any;
	upgrade: any;
};
export const AbilityDetails = ({ match, upgrade }: Props) => {
	const { theme, rt } = useUnistyles();
	const Cooldown = match.properties.AbilityCooldown;
	const duration = match.properties.AbilityDuration;
	const castRange = match.properties.AbilityCastRange;
	const abilityCharges = match.properties.AbilityCharges;
	const abilityChargesCooldown = match.properties.AbilityCooldownBetweenCharge;

	let Radius =
		match.name == "Disengaging Sigil"
			? match.properties.SigilRadius
			: match.properties.Radius;

	const foundUpgrade = (detail: any) => {
		return upgrade?.find((u: any) => u.name == detail);
	};

	return (
		<View style={{ flexDirection: "row", marginTop: 3 }}>
			<View style={styles.groupDetails}>
				<View
					style={{
						flexDirection: "row",
						alignSelf: "center",
						height: 10,
					}}>
					{detailsValueNumberizer(castRange?.value) > 0 &&
					castRange?.value !== undefined ? (
						<View
							style={{
								flexDirection: "row",
								height: 10,
							}}>
							<Image
								style={{
									height: 10,
									width: 10,
									marginHorizontal: 4,
									opacity: 0.6,
								}}
								source={require("../../images/abilityDetails/20pxCastRange.png")}
							/>
							<CustomText
								style={
									foundUpgrade("AbilityCastRange") !== undefined
										? styles.textSelected
										: styles.text
								}>
								{foundUpgrade("AbilityCastRange") !== undefined
									? detailsValueNumberizer(castRange.value) +
									  detailsValueNumberizer(
											foundUpgrade("AbilityCastRange").bonus
									  ) +
									  castRange.postfix
									: castRange.value}
							</CustomText>
						</View>
					) : null}
					{detailsValueNumberizer(Radius?.value) > 0 &&
					Radius?.value !== undefined ? (
						<View style={{ flexDirection: "row" }}>
							<Image
								style={{
									height: 10,
									width: 10,
									marginHorizontal: 4,
									opacity: 0.5,
								}}
								source={require("../../images/abilityDetails/20pxRadius.png")}
							/>
							<CustomText
								style={
									foundUpgrade("Radius") !== undefined
										? styles.textSelected
										: styles.text
								}>
								{foundUpgrade("Radius") !== undefined
									? detailsValueNumberizer(Radius.value) +
									  detailsValueNumberizer(foundUpgrade("Radius").bonus) +
									  Radius.postfix
									: Radius.value}
							</CustomText>
						</View>
					) : null}
				</View>
			</View>
			<View style={styles.groupDetails}>
				<View
					style={{
						flexDirection: "row",
						height: 10,
						alignSelf: "center",
					}}>
					{detailsValueNumberizer(abilityCharges?.value) > 0 &&
					abilityCharges?.value !== undefined ? (
						<View
							style={{
								flexDirection: "row",
								height: 10,
							}}>
							<Image
								style={{
									height: 10,
									width: 10,
									marginHorizontal: 4,
									opacity: 0.35,
								}}
								source={require("../../images/abilityDetails/20pxCharges.png")}
							/>
							<CustomText
								style={
									foundUpgrade("AbilityCharges") !== undefined
										? styles.textSelected
										: styles.text
								}>
								{foundUpgrade("AbilityCharges") !== undefined
									? detailsValueNumberizer(abilityCharges.value) +
									  detailsValueNumberizer(foundUpgrade("AbilityCharges").bonus)
									: abilityCharges.value}
							</CustomText>
						</View>
					) : null}
					{detailsValueNumberizer(abilityChargesCooldown?.value) > 0 &&
					abilityChargesCooldown?.value !== undefined ? (
						<View style={{ flexDirection: "row" }}>
							<Image
								style={{
									height: 10,
									width: 10,
									marginHorizontal: 4,
									opacity: 0.5,
								}}
								source={require("../../images/abilityDetails/16pxCooldownCharges.png")}
							/>
							<CustomText
								style={
									foundUpgrade("AbilityChargesCooldown") !== undefined
										? styles.textSelected
										: styles.text
								}>
								{foundUpgrade("AbilityChargesCooldown") !== undefined
									? detailsValueNumberizer(abilityChargesCooldown.value) +
									  detailsValueNumberizer(
											foundUpgrade("AbilityChargesCooldown").bonus +
												abilityChargesCooldown.postfix
									  )
									: abilityChargesCooldown.value +
									  abilityChargesCooldown.postfix}
							</CustomText>
						</View>
					) : null}
				</View>
			</View>
			<View style={styles.groupDetails}>
				<View
					style={{
						flexDirection: "row",
						height: 10,
						alignSelf: "center",
					}}>
					{detailsValueNumberizer(duration?.value) > 0 &&
					duration?.value !== undefined ? (
						<View
							style={{
								flexDirection: "row",
								height: 10,
							}}>
							<Image
								style={{
									height: 10,
									width: 10,
									marginHorizontal: 4,
									opacity: 0.35,
								}}
								source={require("../../images/abilityDetails/20pxDuration.png")}
							/>
							<CustomText
								style={
									foundUpgrade("AbilityDuration") !== undefined
										? styles.textSelected
										: styles.text
								}>
								{foundUpgrade("AbilityDuration") !== undefined
									? detailsValueNumberizer(
											cleanDetailDecimals(duration?.value)
									  ) +
									  detailsValueNumberizer(
											foundUpgrade("AbilityDuration").bonus
									  ) +
									  duration.postfix
									: duration.value + duration.postfix}
							</CustomText>
						</View>
					) : null}
					{detailsValueNumberizer(Cooldown?.value) > 0 &&
					Cooldown?.value !== undefined ? (
						<View
							style={{
								flexDirection: "row",
								height: 10,
								justifyContent: "center",
							}}>
							<Image
								style={{
									height: 10,
									width: 10,
									marginHorizontal: 4,
									opacity: 0.4,
								}}
								source={require("../../images/abilityDetails/20pxCooldown.png")}
							/>
							<CustomText
								style={
									foundUpgrade("AbilityCooldown") !== undefined
										? styles.textSelected
										: styles.text
								}>
								{foundUpgrade("AbilityCooldown") !== undefined
									? detailsValueNumberizer(
											cleanDetailDecimals(Cooldown?.value)
									  ) -
									  detailsBonusNumberizer(
											foundUpgrade("AbilityCooldown").bonus
									  ) +
									  Cooldown?.postfix
									: detailsValueNumberizer(
											cleanDetailDecimals(Cooldown?.value)
									  ) + Cooldown?.postfix}
							</CustomText>
						</View>
					) : null}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create((theme) => ({
	text: {
		height: 11,
		fontFamily: theme.fontFamily.regular,
		color: theme.colors.font,
		fontSize: 8,
		alignSelf: "center",
		padding: 0.5,
	},
	textSelected: {
		height: 11,
		fontFamily: theme.fontFamily.regular,
		color: theme.colors.font,
		fontSize: 8,
		alignSelf: "center",
		borderBottomColor: theme.colors.accent,
		borderWidth: 0.5,
		borderColor: theme.colors.background,
	},
	groupDetails: {
		width: 115,
		flexDirection: "column",
		height: 20,
		justifyContent: "center",
	},
}));
