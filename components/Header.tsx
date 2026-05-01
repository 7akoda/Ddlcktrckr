import { router } from "expo-router";
import { ArrowLeft, Moon, Settings, Sun } from "lucide-react-native";

import { View } from "react-native";
import { UnistylesRuntime, useUnistyles } from "react-native-unistyles";
import { CustomText } from "./CustomText";
import { SpiritSvg } from "./svgComponents/SpiritSvg";
import { VitalitySvg } from "./svgComponents/VitalitySvg";
import { WeaponSvg } from "./svgComponents/WeaponSvg";
import { PulsingPressable } from "./PulsingPressable";
import { Dispatch, SetStateAction } from "react";

type SortableHeader = {
	back: boolean;
	sortable: true;
	sortFunc: (value: string) => void;
	sortText: string[];
	sort: string;
	itemType: false;
	variant: "sortable";
	handleThemeChangeDark: () => void;
	handleThemeChangeLight: () => void;
};

type SortableItemHeader = {
	variant: "sortableItem";
	back: boolean;
	sortable: true;
	sortFunc: (value: string) => void;
	typeFunc: (value: string) => void;
	sortText: string[];
	sort: string;
	itemList: boolean;
	itemType: string;
	handleThemeChangeDark: () => void;
	handleThemeChangeLight: () => void;
};

type NonSortableHeader = {
	variant: "nonSortable";
	back: boolean;
	sortable: false;
};

type HeaderProps = SortableHeader | NonSortableHeader | SortableItemHeader;

export const Header = (props: HeaderProps) => {
	const { theme, rt } = useUnistyles();

	return (
		<View
			style={{
				paddingHorizontal: 5,
				flexDirection: "row",
				height: 40,
				zIndex: 3,
				justifyContent: "center",
			}}>
			{props.back && (
				<ArrowLeft
					size={20}
					color={theme.colors.accent}
					style={{ alignSelf: "center", paddingLeft: 30, paddingVertical: 5 }}
					onPress={() => router.back()}
				/>
			)}
			{props.variant == "sortableItem" ? (
				<View
					style={{
						alignSelf: "center",
						flexDirection: "row",
						justifyContent: "space-evenly",
					}}>
					<PulsingPressable
						style={{
							height: 40,
							width: 40,
							alignSelf: "center",
							alignItems: "center",
							justifyContent: "center",
						}}
						pulsing={props.itemType == "Spirit" ? true : false}
						onPress={() => props.typeFunc("Spirit")}>
						<SpiritSvg fill={"#CE90FF"} />
					</PulsingPressable>
					<PulsingPressable
						style={{
							height: 40,
							width: 40,
							alignSelf: "center",
							alignItems: "center",
							justifyContent: "center",
						}}
						pulsing={props.itemType == "Vitality" ? true : false}
						onPress={() => props.typeFunc("Vitality")}>
						<VitalitySvg fill={"#00FF99"} />
					</PulsingPressable>
					<PulsingPressable
						style={{
							height: 40,
							width: 40,
							alignSelf: "center",
							alignItems: "center",
							justifyContent: "center",
						}}
						pulsing={props.itemType == "Weapon" ? true : false}
						onPress={() => props.typeFunc("Weapon")}>
						<WeaponSvg fill={"#FF9900"} />
					</PulsingPressable>
				</View>
			) : null}
			<View style={{ flex: 1 }}></View>
			{props.variant !== "nonSortable"
				? props.sortText.map((text, i) => (
						<CustomText
							suppressHighlighting
							onPress={() => props.sortFunc(text)}
							key={i}
							style={{
								color: theme.colors.font,
								textAlign: "center",
								marginHorizontal: 5,
								fontSize: 9.5,
								alignSelf: "center",
								lineHeight: 20,
								width: 40,
								height: 23,
								borderRadius: 4,
								borderColor:
									props.sort === text
										? theme.colors.selected
										: theme.colors.primary,
								borderWidth: 1,
							}}>
							{text}
						</CustomText>
					))
				: null}

			{props.variant !== "nonSortable" ? (
				<>
					{rt.themeName === "light" ? (
						<Moon
							size={24}
							color={theme.colors.accent}
							style={{
								alignSelf: "center",
								paddingRight: 30,
								paddingVertical: 5,
							}}
							onPress={props.handleThemeChangeDark}
						/>
					) : (
						<Sun
							size={24}
							color={theme.colors.accent}
							style={{
								alignSelf: "center",
								paddingRight: 30,
								paddingVertical: 5,
							}}
							onPress={props.handleThemeChangeLight}
						/>
					)}
				</>
			) : null}
		</View>
	);
};
