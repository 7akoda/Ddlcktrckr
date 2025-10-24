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

type SortableHeader = {
	back: boolean;
	sortable: true;
	sortFunc: (value: string) => void;
	typeFunc: (value: string) => void;
	sortText: string[];
	sortAmount: number;
	sort: string;
	itemList: boolean;
	itemType: string;
};

type NonSortableHeader = {
	back: boolean;
	sortable: false;
};

type HeaderProps = SortableHeader | NonSortableHeader;

export const Header = (props: HeaderProps) => {
	const { theme } = useUnistyles();

	return (
		<View
			style={{
				flexDirection: "row",
				width: "100%",
				backgroundColor: theme.colors.background,
				height: 40,
				paddingTop: 8,
				marginBottom: 8,
				zIndex: 3,
			}}>
			{props.back && (
				<ArrowLeft
					size={20}
					color={theme.colors.accent}
					style={{ alignSelf: "center", paddingLeft: 30 }}
					onPress={() => router.back()}
				/>
			)}
			{props.sortable && props.itemList && (
				<View
					style={{
						marginTop: 7,
						marginLeft: 22,
						flexDirection: "row",
						justifyContent: "space-evenly",
						width: 90,
					}}>
					<PulsingPressable
						pulsing={props.itemType == "Spirit" ? true : false}
						onPress={() => props.typeFunc("Spirit")}>
						<SpiritSvg fill={"#CE90FF"} />
					</PulsingPressable>
					<PulsingPressable
						pulsing={props.itemType == "Vitality" ? true : false}
						onPress={() => props.typeFunc("Vitality")}>
						<VitalitySvg fill={"#00FF99"} />
					</PulsingPressable>
					<PulsingPressable
						pulsing={props.itemType == "Weapon" ? true : false}
						onPress={() => props.typeFunc("Weapon")}>
						<WeaponSvg fill={"#FF9900"} />
					</PulsingPressable>
				</View>
			)}
			<View style={{ flex: 1 }}></View>
			{props.sortable &&
				Array.from({ length: props.sortAmount }, (_, i) =>
					props.sort == props.sortText[i] ? (
						<CustomText
							onPress={() => props.sortFunc(props.sortText[i])}
							key={i}
							style={{
								color: theme.colors.selected,
								textAlign: "center",
								paddingTop: 3,
								marginHorizontal: 5,
								fontSize: 7,
								alignSelf: "center",
								width: 35,
								height: 18,
								borderRadius: 4,
								borderColor: theme.colors.accent,
								borderWidth: 1,
							}}>
							{props.sortText[i]}
						</CustomText>
					) : (
						<CustomText
							onPress={() => props.sortFunc(props.sortText[i])}
							key={i}
							style={{
								color: theme.colors.font,
								textAlign: "center",
								paddingTop: 3,
								marginHorizontal: 5,
								fontSize: 7,
								alignSelf: "center",
								width: 35,
								height: 18,
								borderRadius: 4,
								borderColor: theme.colors.accent,
								borderWidth: 1,
							}}>
							{props.sortText[i]}
						</CustomText>
					)
				)}
			{props.sortable && props.sortAmount > 4 && (
				<ArrowDownWideNarrow
					size={20}
					color={theme.colors.accent}
					style={{ alignSelf: "center", paddingRight: 30 }}
				/>
			)}

			<Search
				size={20}
				color={theme.colors.accent}
				style={{ alignSelf: "center", paddingRight: 30 }}
			/>
			<Settings
				size={20}
				color={theme.colors.accent}
				style={{ alignSelf: "center", paddingRight: 30 }}
			/>
		</View>
	);
};
