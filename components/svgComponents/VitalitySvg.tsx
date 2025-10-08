import * as React from "react";
import Svg, { Defs, Path } from "react-native-svg";
import { useUnistyles } from "react-native-unistyles";
type Props = {
	fill: string;
};

export const VitalitySvg = ({ fill }: Props) => {
	const { theme } = useUnistyles();

	return (
		<Svg
			id="Layer_1"
			viewBox="8 9 112 108"
			style={{
				zIndex: 2,
				width: 14,
				height: 14,
			}}>
			<Defs></Defs>
			<Path
				fill={fill}
				d="M57.7814 20.0248C55.2511 16.6262 51.9662 13.8614 48.1855 11.9483C44.4048 10.0351 40.2316 9.02587 35.9945 9C20.5247 9 8 22.2802 8 38.6586C8 68.2954 42.4102 87.6846 61.3834 116.752C62.8833 119.062 65.1167 119.062 66.6166 116.752C85.5898 87.6846 120 68.2954 120 38.6586C120 22.2364 107.475 9 92.0055 9C87.7684 9.02587 83.5952 10.0351 79.8145 11.9483C76.0338 13.8614 72.7489 16.6262 70.2186 20.0248C63.5183 28.7943 64.4817 28.7943 57.7814 20.0248Z"
			/>
		</Svg>
	);
};
