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
		selected: "#8A585B",
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
		primary: "#3F4140",
		background: "#1F2120",
		font: "#C2C5BB",
		accent: "#8A585B",
		selected: "#F5C542",
		bannerFont: "#C2C5BB",
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
