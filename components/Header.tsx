import {
	ExternalPathString,
	Link,
	RelativePathString,
	router,
} from "expo-router";
import {
	Search,
	ArrowLeft,
	Settings,
	ArrowDownWideNarrow,
} from "lucide-react-native";
import { Pressable, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";
import { useUnistyles } from "react-native-unistyles";

type SortableHeader = {
	back: boolean;
	sortable: true;
	sortList: () => void;
	sortText: string;
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
				zIndex: 2,
			}}>
			{props.back && (
				<ArrowLeft
					size={20}
					color={theme.colors.accent}
					style={{ alignSelf: "center", paddingLeft: 30 }}
					onPress={() => router.back()}
				/>
			)}
			<View style={{ flex: 1 }}></View>
			{props.sortable && (
				<Text
					style={{
						color: theme.colors.font,
						textAlign: "center",
						paddingTop: 4,
						fontSize: 8,
						alignSelf: "center",
						width: 40,
						height: 20,
						borderRadius: 4,
						borderColor: theme.colors.accent,
						borderWidth: 1,
					}}>
					{props.sortText}
				</Text>
			)}
			{props.sortable && (
				<ArrowDownWideNarrow
					size={20}
					color={theme.colors.accent}
					style={{ alignSelf: "center", paddingRight: 30 }}
					onPress={() => props.sortList()}
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
