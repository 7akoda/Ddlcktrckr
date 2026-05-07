import { router } from "expo-router";
import { ChevronLeft, Moon, Sun } from "lucide-react-native";
import { View } from "react-native";
import { useUnistyles } from "react-native-unistyles";

import { SpiritSvg } from "./svgComponents/SpiritSvg";
import { VitalitySvg } from "./svgComponents/VitalitySvg";
import { WeaponSvg } from "./svgComponents/WeaponSvg";
import { PulsingPressable } from "./PulsingPressable";
import { HeroProfileBar } from "./HeroProfile/HeroProfileBar";
import { HeaderButton } from "./HeaderButton";

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

type HeroHeader = {
	back: boolean;
	sortable: false;
	variant: "heroBar";
	id: number;
};

type HeaderProps =
	| SortableHeader
	| NonSortableHeader
	| SortableItemHeader
	| HeroHeader;

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
				<ChevronLeft
					size={40}
					color="#FFFFFF"
					style={{ alignSelf: "center", paddingLeft: 30, paddingVertical: 5 }}
					onPress={() => router.back()}
				/>
			)}

			{props.variant === "heroBar" && <HeroProfileBar id={props.id} />}
			{props.variant === "sortableItem" ? (
				<View
					style={{
						alignSelf: "center",
						flexDirection: "row",
					}}>
					<View style={{ width: 28, height: 28 }} />
					<PulsingPressable
						style={{
							height: 35,
							width: 35,
							alignItems: "center",
							justifyContent: "center",
						}}
						pulsing={props.itemType === "Spirit" ? true : false}
						type="Spirit"
						typeFunc={props.typeFunc}>
						<SpiritSvg fill={"#CE90FF"} />
					</PulsingPressable>
					<PulsingPressable
						style={{
							height: 35,
							width: 35,
							alignItems: "center",
							justifyContent: "center",
						}}
						pulsing={props.itemType === "Vitality" ? true : false}
						type="Vitality"
						typeFunc={props.typeFunc}>
						<VitalitySvg fill={"#00FF99"} />
					</PulsingPressable>
					<PulsingPressable
						style={{
							height: 35,
							width: 35,
							alignItems: "center",
							justifyContent: "center",
						}}
						type="Weapon"
						typeFunc={props.typeFunc}
						pulsing={props.itemType === "Weapon" ? true : false}>
						<WeaponSvg fill={"#FF9900"} />
					</PulsingPressable>
				</View>
			) : null}
			<View style={{ flex: 1 }} />
			{props.variant !== "nonSortable" && props.variant !== "heroBar"
				? props.sortText.map((text, i) => (
						<HeaderButton
							text={text}
							sort={props.sort}
							sortFunc={() => props.sortFunc(text)}
							key={i}
						/>
					))
				: null}

			{props.variant !== "nonSortable" && props.variant !== "heroBar" ? (
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
