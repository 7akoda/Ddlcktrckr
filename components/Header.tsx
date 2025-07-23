import {
	Search,
	ArrowLeft,
	Settings,
	ArrowDownWideNarrow,
} from "lucide-react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useUnistyles } from "react-native-unistyles";

interface Props {
	back: boolean;
	sortList: () => void;
}

export const Header = ({ back, sortList }: Props) => {
	const { theme } = useUnistyles();

	return (
		<View
			style={{
				flexDirection: "row",
				width: "100%",
				backgroundColor: theme.colors.background,
				height: 40,
			}}>
			{back ? (
				<ArrowLeft
					size={20}
					color={theme.colors.accent}
					style={{ alignSelf: "center", paddingLeft: 30 }}
				/>
			) : null}
			<View style={{ flex: 1 }} />
			<ArrowDownWideNarrow
				size={20}
				color={theme.colors.accent}
				style={{ alignSelf: "center", paddingRight: 30 }}
				onPress={() => sortList()}
			/>
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
