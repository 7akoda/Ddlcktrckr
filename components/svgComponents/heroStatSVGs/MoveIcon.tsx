import Svg, { Path } from "react-native-svg";
import { useUnistyles } from "react-native-unistyles";

export const MoveIcon = () => {
	const { theme } = useUnistyles();
	return (
		<Svg
			width={20}
			height={20}
			viewBox="0 0 130 130"
			style={{ alignSelf: "center" }}>
			<Path
				d="M81.5143 72.4711L117.08 34.3552L68.8057 2L57.0343 31.8506L11 87.2257L34.7257 103.141L43.3657 96.9254L58.4286 118.989L83.2514 124.977L108.646 125L114.269 116.666L95.96 103.665L81.5143 72.4711Z"
				fill={theme.colors.font}
			/>
		</Svg>
	);
};
