import { CustomText } from "@/components/CustomText";
import { LoadingIcon } from "@/components/LoadingIcon";
import { useItemData } from "@/hooks/useItemData";
import React from "react";
import { View } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { GetStatusEffect } from "./getStatusEffect";
import { getValue } from "./getValue";
import { getPostfix, getPrefix } from "./getFix";
import { GetScaleType } from "./getScaleType";

type Props = {
	itemId: string | string[];
};

export const UnNamedData = ({ itemId }: Props) => {
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

	const foundItem = itemData?.find((item: any) => item.name === itemId);

	const unNamedSection = foundItem.tooltip_sections.find((section: any) => {
		return (
			(section.section_type !== "innate" &&
				section.section_type !== "passive" &&
				section.section_type !== "active") ||
			section.section_type === undefined
		);
	});
	let unNamedProps;
	if (unNamedSection) {
		unNamedProps = [
			...(unNamedSection.section_attributes?.[0]?.properties ?? []),
			...(unNamedSection.section_attributes?.[0]?.important_properties ?? []),
		];

		unNamedProps = unNamedProps.filter((key) => {
			const prop = foundItem.properties[key];
			return (
				prop !== undefined &&
				parseFloat(prop.value) !== 0 &&
				prop.value !== "" &&
				prop.label &&
				key !== "InterruptCooldown" &&
				key !== "AbilityCooldown"
			);
		});
	}

	const uniqueProps = Array.from(new Set(unNamedProps));

	const getUnNamedStats = () => {
		const unNamedStats = uniqueProps.map((key, index: number) => {
			if (
				key === "StatusEffectEMP" ||
				key === "StatusEffectDisarmed" ||
				key === "StatusEffectStun" ||
				key === "StatusEffectInvisible"
			) {
				return GetStatusEffect(key);
			} else {
				const prop = foundItem.properties[key];
				const value = String(prop.value);
				const postfix = prop.postfix === undefined ? "" : String(prop.postfix);
				const scale = prop?.scale_function?.stat_scale;
				const scaleType = prop?.scale_function?.specific_stat_scale_type;
				const label = String(prop.label);
				const prefix = prop.prefix === undefined ? "" : prop.prefix;

				const valueData = getValue(value, postfix);
				const pfixData = getPostfix(postfix, value, prop);
				const prfixData = getPrefix(prefix, value);
				const scaleData = GetScaleType(scale, scaleType);
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

		return unNamedStats;
	};
	return <View>{getUnNamedStats()}</View>;
};
