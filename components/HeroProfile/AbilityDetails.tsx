import { View, Image } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { CustomText } from "../CustomText";
import { StyleSheet } from "react-native-unistyles";
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

	const cleanDetailDecimals = (value: string) => {
		value = String(value);
		value = value.replace(/(\.\d*?[1-9])0+$|\.0+$/, "$1");
		return value;
	};

	const valueNumberizer = (value: string) => {
		let newvalue;
		value = String(value);
		newvalue = value.replace(/[^0-9.]/g, "");
		newvalue = newvalue.replace(/[\+\-]/g, "");
		return Number(newvalue);
	};

	return (
		<View style={{ flexDirection: "row", marginTop: 3 }}>
			<View
				style={{
					width: 115,
					flexDirection: "column",
					height: 20,
					justifyContent: "center",
				}}>
				<View
					style={{
						flexDirection: "row",
						alignSelf: "center",
						height: 10,
					}}>
					{castRange?.value !== "0" &&
					castRange?.value !== undefined &&
					castRange?.value !== null ? (
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
									? valueNumberizer(castRange.value) +
									  valueNumberizer(foundUpgrade("AbilityCastRange").bonus) +
									  castRange.postfix
									: castRange.value}
							</CustomText>
						</View>
					) : null}
					{Radius?.value !== "0" &&
					Radius?.value !== undefined &&
					Radius?.value !== null ? (
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
									? valueNumberizer(Radius.value) +
									  valueNumberizer(foundUpgrade("Radius").bonus) +
									  Radius.postfix
									: Radius.value}
							</CustomText>
						</View>
					) : null}
				</View>
			</View>
			<View
				style={{
					width: 115,
					flexDirection: "column",
					height: 20,
					justifyContent: "center",
				}}>
				<View
					style={{
						flexDirection: "row",
						height: 10,
						alignSelf: "center",
					}}>
					{abilityCharges?.value !== "0" &&
					abilityCharges?.value !== undefined &&
					abilityCharges?.value !== null ? (
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
									? valueNumberizer(abilityCharges.value) +
									  valueNumberizer(foundUpgrade("AbilityCharges").bonus)
									: abilityCharges.value}
							</CustomText>
						</View>
					) : null}
					{abilityChargesCooldown?.value !== "0" &&
					abilityChargesCooldown?.value !== "-1.0" &&
					abilityChargesCooldown?.value !== undefined &&
					abilityChargesCooldown?.value !== null ? (
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
									? valueNumberizer(abilityChargesCooldown.value) +
									  valueNumberizer(
											foundUpgrade("AbilityChargesCooldown").bonus
									  )
									: abilityChargesCooldown.value}
							</CustomText>
						</View>
					) : null}
				</View>
			</View>
			<View
				style={{
					width: 115,
					flexDirection: "column",
					height: 20,
					justifyContent: "center",
				}}>
				<View
					style={{
						flexDirection: "row",
						height: 10,
						alignSelf: "center",
					}}>
					{duration?.value !== "0" &&
					duration?.value !== undefined &&
					duration?.value !== null ? (
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
									? valueNumberizer(cleanDetailDecimals(duration?.value)) +
									  valueNumberizer(foundUpgrade("AbilityDuration").bonus)
									: duration.value}
							</CustomText>
						</View>
					) : null}
					{Cooldown?.value !== "0" &&
					Cooldown?.value !== undefined &&
					Cooldown?.value !== null ? (
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
									? valueNumberizer(cleanDetailDecimals(Cooldown?.value)) -
									  valueNumberizer(foundUpgrade("AbilityCooldown").bonus) +
									  Cooldown?.postfix
									: valueNumberizer(cleanDetailDecimals(Cooldown?.value)) +
									  Cooldown?.postfix}
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
}));
