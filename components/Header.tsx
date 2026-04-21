import { router } from "expo-router";
import {
	Search,
	ArrowLeft,
	Settings,
	ArrowDownWideNarrow,
} from "lucide-react-native";
import { Pressable, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { CustomText } from "./CustomText";
import { SpiritSvg } from "./svgComponents/SpiritSvg";
import { VitalitySvg } from "./svgComponents/VitalitySvg";
import { WeaponSvg } from "./svgComponents/WeaponSvg";
import { PulsingPressable } from "./PulsingPressable";
import { BlurView } from "expo-blur";
import { Dispatch, SetStateAction, useState } from "react";

type SortableHeader = {
	back: boolean;
	sortable: true;
	sortFunc: (value: string) => void;
	sortText: string[];
	sort: string;
	itemType: false;
	setSettings: Dispatch<SetStateAction<boolean>>;
	variant: "sortable";
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
	setSettings: Dispatch<SetStateAction<boolean>>;
};

type NonSortableHeader = {
	variant: "nonSortable";
	back: boolean;
	sortable: false;
};

type HeaderProps = SortableHeader | NonSortableHeader | SortableItemHeader;

export const Header = (props: HeaderProps) => {
	const { theme } = useUnistyles();

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
							height: 30,
							width: 30,
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
							height: 30,
							width: 30,
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
							height: 30,
							width: 30,
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
				? props.sortText.map((text, i) =>
						props.sort == props.sortText[i] ? (
							<CustomText
								suppressHighlighting
								onPress={() => props.sortFunc(text)}
								key={i}
								style={{
									color: theme.colors.font,
									textAlign: "center",
									marginHorizontal: 5,
									fontSize: 9,
									alignSelf: "center",
									width: 35,
									height: 18,
									paddingTop: 1.8,
									borderRadius: 4,
									borderColor: theme.colors.selected,
									borderWidth: 1,
								}}>
								{props.sortText[i]}
							</CustomText>
						) : (
							<CustomText
								suppressHighlighting
								onPress={() => props.sortFunc(text)}
								key={i}
								style={{
									color: theme.colors.font,
									textAlign: "center",
									marginHorizontal: 5,
									fontSize: 9,
									alignSelf: "center",
									width: 35,
									height: 18,
									paddingTop: 1.8,
									borderRadius: 4,
									borderColor: theme.colors.primary,
									borderWidth: 1,
								}}>
								{props.sortText[i]}
							</CustomText>
						),
					)
				: null}
			{props.variant !== "nonSortable" ? (
				<>
					<Search
						size={20}
						color={theme.colors.accent}
						style={{
							alignSelf: "center",
							paddingRight: 30,
							paddingVertical: 5,
						}}
					/>

					<Settings
						size={20}
						color={theme.colors.accent}
						style={{
							alignSelf: "center",
							paddingRight: 30,
							paddingVertical: 5,
						}}
						onPress={() => props.setSettings((prev: boolean) => !prev)}
					/>
				</>
			) : null}
		</View>
	);
};
