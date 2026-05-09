import { View, Image } from "react-native";
import { CustomText } from "../CustomText";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import {
	cleanDetailDecimals,
	detailsBonusNumberizer,
	detailsValueNumberizer,
} from "@/api/decimaldescriptionTransform";
import Animated, {
	cancelAnimation,
	Easing,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSequence,
	withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

type Props = {
	match: any;
	upgrade: any;
};
const AnimatedCustomText = Animated.createAnimatedComponent(CustomText);

export const AbilityDetails = ({ match, upgrade }: Props) => {
	const { theme } = useUnistyles();
	const Cooldown = match.properties.AbilityCooldown;
	const duration = match.properties.AbilityDuration;
	const castRange = match.properties.AbilityCastRange;
	const abilityCharges = match.properties.AbilityCharges;
	const abilityChargesCooldown = match.properties.AbilityCooldownBetweenCharge;
	const textColor = useSharedValue(0);

	useEffect(() => {
		textColor.value = withSequence(
			withTiming(1, {
				duration: 150,
				easing: Easing.in(Easing.ease),
			}),
			withDelay(
				150,
				withTiming(0, {
					duration: 150,
					easing: Easing.in(Easing.ease),
				}),
			),
		);
		return () => {
			cancelAnimation(textColor);
		};
	}, [upgrade, textColor]);

	const animatedStyles = useAnimatedStyle(() => ({
		color: interpolateColor(
			textColor.value,
			[0, 1],
			[theme.colors.font, theme.colors.ability],
		),
	}));

	const cheapTrick = useAnimatedStyle(() => ({
		color: interpolateColor(
			textColor.value,
			[0, 1],
			[theme.colors.font, theme.colors.font],
		),
	}));

	let Radius =
		match.name === "Disengaging Sigil"
			? match.properties.SigilRadius
			: match.properties.Radius;

	const foundUpgrade = (detail: any) => {
		return upgrade?.find((u: any) => u.name === detail);
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
							<AnimatedCustomText
								style={
									foundUpgrade("AbilityCastRange") !== undefined
										? [styles.text, animatedStyles]
										: [cheapTrick, styles.text]
								}>
								{foundUpgrade("AbilityCastRange") !== undefined
									? detailsValueNumberizer(castRange.value) +
										detailsValueNumberizer(
											foundUpgrade("AbilityCastRange").bonus,
										) +
										castRange.postfix
									: castRange.value}
							</AnimatedCustomText>
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
							<AnimatedCustomText
								style={
									foundUpgrade("Radius") !== undefined
										? [styles.text, animatedStyles]
										: [cheapTrick, styles.text]
								}>
								{foundUpgrade("Radius") !== undefined
									? detailsValueNumberizer(Radius.value) +
										detailsValueNumberizer(foundUpgrade("Radius").bonus) +
										Radius.postfix
									: Radius.value}
							</AnimatedCustomText>
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
							<AnimatedCustomText
								style={
									foundUpgrade("AbilityCharges") !== undefined
										? [styles.text, animatedStyles]
										: [cheapTrick, styles.text]
								}>
								{foundUpgrade("AbilityCharges") !== undefined
									? detailsValueNumberizer(abilityCharges.value) +
										detailsValueNumberizer(foundUpgrade("AbilityCharges").bonus)
									: abilityCharges.value}
							</AnimatedCustomText>
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
							<AnimatedCustomText
								style={
									foundUpgrade("AbilityChargesCooldown") !== undefined
										? [styles.text, animatedStyles]
										: [cheapTrick, styles.text]
								}>
								{foundUpgrade("AbilityChargesCooldown") !== undefined
									? detailsValueNumberizer(abilityChargesCooldown.value) +
										detailsValueNumberizer(
											foundUpgrade("AbilityChargesCooldown").bonus +
												abilityChargesCooldown.postfix,
										)
									: abilityChargesCooldown.value +
										abilityChargesCooldown.postfix}
							</AnimatedCustomText>
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
							<AnimatedCustomText
								style={
									foundUpgrade("AbilityDuration") !== undefined
										? [styles.text, animatedStyles]
										: [cheapTrick, styles.text]
								}>
								{foundUpgrade("AbilityDuration") !== undefined
									? detailsValueNumberizer(
											cleanDetailDecimals(duration?.value),
										) +
										detailsValueNumberizer(
											foundUpgrade("AbilityDuration").bonus,
										) +
										duration.postfix
									: duration.value + duration.postfix}
							</AnimatedCustomText>
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
							<AnimatedCustomText
								style={
									foundUpgrade("AbilityCooldown") !== undefined
										? [styles.text, animatedStyles]
										: [styles.text, cheapTrick]
								}>
								{foundUpgrade("AbilityCooldown") !== undefined
									? detailsValueNumberizer(
											cleanDetailDecimals(Cooldown?.value),
										) -
										detailsBonusNumberizer(
											foundUpgrade("AbilityCooldown").bonus,
										) +
										Cooldown?.postfix
									: detailsValueNumberizer(
											cleanDetailDecimals(Cooldown?.value),
										) + Cooldown?.postfix}
							</AnimatedCustomText>
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
	},
	groupDetails: {
		width: 115,
		flexDirection: "column",
		height: 20,
		justifyContent: "center",
	},
}));
