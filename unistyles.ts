import { StyleSheet } from "react-native-unistyles";

type AppThemes = typeof appThemes;
type AppBreakpoints = typeof breakpoints;

declare module "react-native-unistyles" {
	export interface UnistylesThemes extends AppThemes {}
	export interface UnistylesBreakpoints extends AppBreakpoints {}
}

const breakpoints = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	superLarge: 2000,
	tvLike: 4000,
};

const lightTheme = {
	fontFamily: {
		regular: "EBGaramond_400Regular",
		semiBold: "EBGaramond_600SemiBold",
		extraBold: "EBGaramond_800ExtraBold",
	},
	colors: {
		primary: "#dadcd6",
		background: "#b9bbb4",
		font: "#13100e",
		accent: "#754043",
		selected: "#754043",
		bannerFont: "#dadcd6",
		souls: "#98ffde",
	},
	gap: (v: number) => v * 8,
};

const darkTheme = {
	fontFamily: {
		regular: "EBGaramond_400Regular",
		semiBold: "EBGaramond_600SemiBold",
		extraBold: "EBGaramond_800ExtraBold",
	},
	colors: {
		primary: "#201E1F",
		background: "#201E1F",
		font: "#FFF0DD",
		accent: "#367C62",
		selected: "#367C62",
		bannerFont: "#413D3F",
		souls: "#98ffde",
	},
	gap: (v: number) => v * 8,
};

export const appThemes = {
	light: lightTheme,
	dark: darkTheme,
};

StyleSheet.configure({
	themes: appThemes,
	breakpoints,
	settings: {
		initialTheme: "dark",
	},
});
