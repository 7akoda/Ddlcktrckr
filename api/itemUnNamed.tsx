import { CustomText } from "@/components/CustomText";
import { LoadingIcon } from "@/components/LoadingIcon";
import { useItemData } from "@/hooks/useItemData";
import { cleanDecimals } from "./decimaldescriptionTransform";
import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { useUnistyles } from "react-native-unistyles";

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

	const getUnNamedStats = () => {
		console.log("unNamed shit: " + uniqueProps);

		const unNamedStats = uniqueProps.map((key, index: number) => {
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
