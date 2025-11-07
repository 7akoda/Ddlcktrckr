import * as React from "react";
import { Dimensions, View } from "react-native";
import Svg, { Defs, Path } from "react-native-svg";
import { useUnistyles } from "react-native-unistyles";

export const CooldownSvg = () => {
	const { theme } = useUnistyles();

	return (
		<Svg
			width="50px"
			height="50px"
			style={{ alignSelf: "center" }}
			viewBox="0 -8 40 40"
			fill={theme.colors.background}>
			<Path
				d="M22.7 13.5L20.7005 11.5L18.7 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C15.3019 3 18.1885 4.77814 19.7545 7.42909M12 7V12L15 14"
				stroke={theme.colors.font}
				strokeWidth={1.7}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};
