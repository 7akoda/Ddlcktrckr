import { router } from "expo-router";
import { ChevronLeft, Moon, Sun } from "lucide-react-native";
import { View } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { CustomText } from "./CustomText";
import { SpiritSvg } from "./svgComponents/SpiritSvg";
import { VitalitySvg } from "./svgComponents/VitalitySvg";
import { WeaponSvg } from "./svgComponents/WeaponSvg";
import { PulsingPressable } from "./PulsingPressable";
import { HeroProfileBar } from "./HeroProfile/HeroProfileBar";

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
						pulsing={props.itemType === "Spirit" ? true : false}
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
						pulsing={props.itemType === "Vitality" ? true : false}
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
						pulsing={props.itemType === "Weapon" ? true : false}
						onPress={() => props.typeFunc("Weapon")}>
						<WeaponSvg fill={"#FF9900"} />
					</PulsingPressable>
				</View>
			) : null}
			<View style={{ flex: 1 }}></View>
			{props.variant !== "nonSortable" && props.variant !== "heroBar"
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
								width: 50,
								height: 23,
								borderRadius: 16,
								borderCurve: "continuous",
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
