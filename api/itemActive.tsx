import { useItemData } from "@/hooks/useItemData";
import { View, Image } from "react-native";
import { CustomText } from "@/components/CustomText";
import { LoadingIcon } from "@/components/LoadingIcon";
import React from "react";
import { useUnistyles } from "react-native-unistyles";
import { getValue } from "./getValue";
import { getPostfix, getPrefix } from "./getFix";
import { getScaleType } from "./getScaleType";
import { getStatusEffect } from "./getStatusEffect";

interface SingleArray {
	itemId: string | string[];
	activeArrays: false;
}
interface MultipleArrays {
	itemId: string | string[];
	activeArrays: true;
	arrayIndex: number;
}

export const ActiveData = (props: SingleArray | MultipleArrays) => {
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

	const activeSection = foundItem.tooltip_sections.find(
		(section: any) => section.section_type === "active",
	);
	let activeProps;
	if (activeSection) {
		if (activeSection.section_attributes.length > 1 && props.activeArrays) {
			activeProps = [
				[
					...(activeSection?.section_attributes?.[0]?.properties ?? []),
					...(activeSection?.section_attributes?.[0]?.important_properties ??
						[]),
				],
				[
					...(activeSection?.section_attributes?.[1]?.properties ?? []),
					...(activeSection?.section_attributes?.[1]?.important_properties ??
						[]),
				],
			];
			activeProps = activeProps.map((a) =>
				a.filter((key) => {
					const prop = foundItem.properties[key];
					const propIcon =
						activeSection?.section_attributes?.[0]
							?.important_properties_with_icon;
					return (
						propIcon ||
						(prop !== undefined &&
							prop.label &&
							parseFloat(prop.value) !== 0 &&
							prop.value !== "" &&
							prop.value !== undefined &&
							key !== "InterruptCooldown" &&
							key !== "AbilityCooldown")
					);
				}),
			);
		} else
			activeProps = [
				...(activeSection?.section_attributes?.[0]?.properties ?? []),
				...(activeSection?.section_attributes?.[0]?.important_properties ?? []),
			];
		activeProps = activeProps.filter((key) => {
			const prop = foundItem.properties[key];
			const propIcon =
				activeSection?.section_attributes?.[0]?.important_properties_with_icon;
			return (
				propIcon ||
				(prop !== undefined &&
					prop.label &&
					parseFloat(prop.value) !== 0 &&
					prop.value !== "" &&
					prop.value !== undefined &&
					key !== "InterruptCooldown" &&
					key !== "AbilityCooldown")
			);
		});
	}

	const uniqueProps = Array.from(new Set(activeProps));
	console.log(uniqueProps);

	const getActiveStats = (property: string[]) => {
		let activeStats;
		if (props.activeArrays) {
			activeStats = uniqueProps[props.arrayIndex].map(
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
		} else {
			activeStats = uniqueProps.map((key, index: number) => {
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
								{pfixData}
								{scaleData} {label}
							</CustomText>
						</React.Fragment>
					);
				}
			});
		}
		return activeStats;
	};

	return <View>{getActiveStats(uniqueProps)}</View>;
};
