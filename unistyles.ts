import { StyleSheet } from "react-native-unistyles";
type AppThemes = typeof appThemes;

declare module "react-native-unistyles" {
	export interface UnistylesThemes extends AppThemes {}
}

const lightTheme = {
	fontFamily: {
		regular: "EBGaramond_400Regular",
		semiBold: "EBGaramond_600SemiBold",
		extraBold: "EBGaramond_800ExtraBold",
		serif: "EBGaramond_400Regular_Italic",
		extraBoldSerif: "EBGaramond_800ExtraBold_Italic",
	},
	colors: {
		primary: "#b9bbb4",
		background: "#b9bbb4",
		font: "#000000",
		accent: "#255544",
		selected: "#255544",
		secondary: "#dadcd6",
		souls: "#98ffde",
		ability: "#AA3678",
	},
	gap: (v: number) => v * 8,
};

const darkTheme = {
	fontFamily: {
		regular: "EBGaramond_400Regular",
		semiBold: "EBGaramond_600SemiBold",
		extraBold: "EBGaramond_800ExtraBold",
		serif: "EBGaramond_400Regular_Italic",
		extraBoldSerif: "EBGaramond_800ExtraBold_Italic",
	},
	colors: {
		primary: "#201E1F",
		background: "#201E1F",
		font: "#FFFFFF",
		accent: "#367C62",
		selected: "#367C62",
		secondary: "#302D2F",
		souls: "#98ffde",
		ability: "#F2DD6E",
	},
	gap: (v: number) => v * 8,
};

export const appThemes = {
	light: lightTheme,
	dark: darkTheme,
};

StyleSheet.configure({
	themes: appThemes,
	settings: {
		initialTheme: "dark",
	},
});
