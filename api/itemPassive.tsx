import { useItemData } from "@/hooks/useItemData";
import { cleanDecimals } from "./decimaldescriptionTransform";
import { View, Image } from "react-native";
import { CustomText } from "@/components/CustomText";
import { LoadingIcon } from "@/components/LoadingIcon";
import React, { useEffect } from "react";
import { useUnistyles } from "react-native-unistyles";

interface MultipleArrays {
	passiveArrays: true;
	arrayIndex: number;
	itemId: string | string[];
}
interface SingleArray {
	passiveArrays: false;
	itemId: string | string[];
}

export const PassiveData = (props: SingleArray | MultipleArrays) => {
	const { theme } = useUnistyles();

	const { itemData, isError, isLoading, error } = useItemData();

	if (isLoading) {
		return <LoadingIcon />;
	}

	if (isError) {
		console.error("Item Data error:", error);
		return (
			<CustomText style={{ color: "#EADEDA" }}>
				Failed to load Item data.
			</CustomText>
		);
	}

	const foundItem = itemData?.find((item: any) => item.name === props.itemId);
	const passiveSection = foundItem.tooltip_sections.filter(
		(section: any) => section.section_type == "passive"
	);
	const passiveSectionFound = foundItem.tooltip_sections.find(
		(section: any) => section.section_type === "passive"
	);
	let passiveProps;
	if (passiveSection) {
		if (props.passiveArrays && passiveSection.length > 1) {
			passiveProps = [
				[
					...(passiveSection[0]?.section_attributes?.[0]?.properties ?? []),
					...(passiveSection[0]?.section_attributes?.[0]
						?.important_properties ?? []),
					...(passiveSection[0]?.section_attributes?.[0]?.elevated_properties ??
						[]),
				],
				[
					...(passiveSection[1]?.section_attributes?.[0]?.properties ?? []),
					...(passiveSection[1]?.section_attributes?.[0]
						?.important_properties ?? []),
					...(passiveSection[1]?.section_attributes?.[0]?.elevated_properties ??
						[]),
				],
			];
			passiveProps = passiveProps.map((p) =>
				p.filter((key) => {
					const prop = foundItem.properties[key];
					const propIcon =
						passiveSection?.section_attributes?.[0]
							?.important_properties_with_icon;
					return (
						propIcon ||
						(prop !== undefined &&
							prop.label &&
							parseFloat(prop.value) !== 0 &&
							prop.value !== "" &&
							prop.value !== undefined &&
							key !== "InterruptCooldown" &&
							key !== "AbilityCooldown" &&
							key !== "AbilityChargeUpTime")
					);
				})
			);
		} else {
			passiveProps = [
				...(passiveSectionFound?.section_attributes?.[0]?.properties ?? []),
				...(passiveSectionFound?.section_attributes?.[0]
					?.important_properties ?? []),
				...(passiveSectionFound?.section_attributes?.[0]?.elevated_properties ??
					[]),
			];
			passiveProps = passiveProps.filter((key) => {
				const prop = foundItem.properties[key];
				const propIcon =
					passiveSection?.section_attributes?.[0]
						?.important_properties_with_icon;
				return (
					propIcon ||
					(prop !== undefined &&
						prop.label &&
						parseFloat(prop.value) !== 0 &&
						prop.value !== "" &&
						prop.value !== undefined &&
						key !== "InterruptCooldown" &&
						key !== "AbilityCooldown" &&
						key !== "AbilityChargeUpTime")
				);
			});
		}
	}
	console.log(passiveProps);
	const uniqueProps = Array.from(new Set(passiveProps));
	const getStatusEffect = (key: string) => {
		return key == "StatusEffectEMP" ? (
			<CustomText
				key={key}
				style={{
					color: theme.colors.font,
					fontSize: 12,
					fontFamily: theme.fontFamily.regular,
				}}>
				Silenced Status Effect
			</CustomText>
		) : key == "StatusEffectDisarmed" ? (
			<CustomText
				key={key}
				style={{
					color: theme.colors.font,
					fontSize: 12,
					fontFamily: theme.fontFamily.regular,
				}}>
				Disarmed Status Effect
			</CustomText>
		) : key == "StatusEffectStun" ? (
			<CustomText
				key={key}
				style={{
					color: theme.colors.font,
					fontSize: 12,
					fontFamily: theme.fontFamily.regular,
				}}>
				Stun Status Effect
			</CustomText>
		) : key == "StatusEffectInvisible" ? (
			<CustomText
				key={key}
				style={{
					color: theme.colors.font,
					fontSize: 12,
					fontFamily: theme.fontFamily.regular,
				}}>
				Invisible Status Effect
			</CustomText>
		) : null;
	};

	const getPostfix = (postfix: string, value: string, prop: any) => {
		return (postfix == "m" &&
			prop.css_class === "move_speed" &&
			value[value.length - 1] == "m") ||
			(postfix[0] == " " && prop.css_class === "move_speed")
			? "/s"
			: postfix == value[value.length - 1] ||
			  postfix[postfix.length - 1] == value[value.length - 1]
			? ""
			: postfix[0] == " "
			? postfix.slice(1)
			: postfix;
	};

	const getValue = (value: string, postfix: string) => {
		return value[value.length - 1] == postfix[0] &&
			postfix !== value[value.length - 1]
			? value.slice(0, value.length - 1)
			: value;
	};

	const getPrefix = (prefix: string, value: string) => {
		return prefix == value[0]
			? ""
			: value[0] == "-"
			? ""
			: prefix === "{s:sign}"
			? "+"
			: prefix;
	};

	const getScaleType = (scale: number, scaleType: string) => {
		return (
			<>
				{scaleType == "ETechPower" ? (
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
						{cleanDecimals(scale)}
					</CustomText>
				) : scaleType == "ELevelUpBoons" ? (
					<CustomText
						style={{
							color: "##00FF99",
							fontSize: 12,
							fontFamily: theme.fontFamily.regular,
						}}>
						{" "}
						<Image
							source={require("../images/20px-Boon_scaling.png")}
							style={{ width: 12, height: 10 }}
						/>
						{cleanDecimals(scale)}
					</CustomText>
				) : null}
			</>
		);
	};

	const getpassiveStats = (property: string[]) => {
		let passiveStats;
		if (!props.passiveArrays) {
			passiveStats = uniqueProps.map((key, index: number) => {
				if (
					key == "StatusEffectEMP" ||
					key == "StatusEffectDisarmed" ||
					key == "StatusEffectStun" ||
					key == "StatusEffectInvisible"
				) {
					return getStatusEffect(key);
				} else {
					const prop = foundItem.properties[key];
					const value = String(prop.value);
					const postfix = prop.postfix == undefined ? "" : String(prop.postfix);
					const scale = prop?.scale_function?.stat_scale;
					const scaleType = prop?.scale_function?.specific_stat_scale_type;
					const label = String(prop.label);
					const prefix = prop.prefix == undefined ? "" : prop.prefix;
					const valueData = getValue(value, postfix);
					const pfixData = getPostfix(postfix, value, prop);
					const prfixData = getPrefix(prefix, value);
					const scaleData = getScaleType(scale, scaleType);

					return (
						<React.Fragment key={key}>
							<CustomText
								style={{
									color: theme.colors.font,
									fontSize: 12,
									fontFamily: theme.fontFamily.regular,
								}}>
								{prfixData}
								{valueData}
								{pfixData} {scaleData}
								{label}
							</CustomText>
						</React.Fragment>
					);
				}
			});
		} else {
			passiveStats = uniqueProps[props.arrayIndex].map(
				(key: any, index: number) => {
					console.log(key);
					if (
						key == "StatusEffectEMP" ||
						key == "StatusEffectDisarmed" ||
						key == "StatusEffectStun" ||
						key == "StatusEffectInvisible"
					) {
						return getStatusEffect(key);
					} else {
						const prop = foundItem.properties[key];
						const value = String(prop.value);
						const postfix =
							prop.postfix == undefined ? "" : String(prop.postfix);
						const scale = prop?.scale_function?.stat_scale;
						const scaleType = prop?.scale_function?.specific_stat_scale_type;
						const label = String(prop.label);
						const prefix = prop.prefix == undefined ? "" : prop.prefix;
						const valueData = getValue(value, postfix);
						const pfixData = getPostfix(postfix, value, prop);
						const prfixData = getPrefix(prefix, value);
						const scaleData = getScaleType(scale, scaleType);

						return (
							<React.Fragment key={key}>
								<CustomText
									style={{
										color: theme.colors.font,
										fontSize: 12,
										fontFamily: theme.fontFamily.regular,
									}}>
									{prfixData}
									{valueData}
									{pfixData} {scaleData}
									{label}
								</CustomText>
							</React.Fragment>
						);
					}
				}
			);
		}
		return passiveStats;
	};
	return <View>{getpassiveStats(uniqueProps)}</View>;
};
