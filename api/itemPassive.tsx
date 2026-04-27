import { useItemData } from "@/hooks/useItemData";
import { View } from "react-native";
import { CustomText } from "@/components/CustomText";
import { LoadingIcon } from "@/components/LoadingIcon";
import React from "react";
import { useUnistyles } from "react-native-unistyles";
import { getStatusEffect } from "./getStatusEffect";
import { getScaleType } from "./getScaleType";
import { getValue } from "./getValue";
import { getPostfix, getPrefix } from "./getFix";

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
		(section: any) => section.section_type == "passive",
	);
	const passiveSectionFound = foundItem.tooltip_sections.find(
		(section: any) => section.section_type === "passive",
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
				}),
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
	const uniqueProps = Array.from(new Set(passiveProps));

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
					const pfixData = getPostfix(postfix, value, property);
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
								{pfixData === "HP/s" ? null : pfixData}
								{scaleData} {pfixData === "HP/s" ? pfixData + " " : null}
								{label}
							</CustomText>
						</React.Fragment>
					);
				}
			});
		} else {
			passiveStats = uniqueProps[props.arrayIndex].map(
				(key: any, index: number) => {
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
						const pfixData = getPostfix(postfix, value, property);
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
									{pfixData}
									{scaleData} {label}
								</CustomText>
							</React.Fragment>
						);
					}
				},
			);
		}
		return passiveStats;
	};
	return <View>{getpassiveStats(uniqueProps)}</View>;
};
