import { useUnistyles } from "react-native-unistyles";
import { CustomText } from "./CustomText";
import { Pressable, View } from "react-native";
import { BlurView } from "expo-blur";
import { Book, BookOpen, Globe, SquareUserRound } from "lucide-react-native";
import { Dispatch, SetStateAction, useState } from "react";

type BottomNavBarType = {
	setSelected: Dispatch<SetStateAction<string>>;
	selected: string;
};

export const BottomNavBar = ({ setSelected, selected }: BottomNavBarType) => {
	const { theme, rt } = useUnistyles();
	return (
		<BlurView
			intensity={25}
			style={{
				bottom: 0,
				height: "9%",
				width: "100%",
				position: "absolute",
				borderTopWidth: 1,
				flexDirection: "row",
			}}>
			<Pressable
				onPress={() => setSelected("User")}
				style={{
					width: "24.7%",
					marginHorizontal: "4.3%",
					justifyContent: "center",
					borderTopColor: selected == "User" ? theme.colors.accent : "#000000",
					borderTopWidth: selected == "User" ? 1 : 0,
				}}>
				<SquareUserRound
					style={{ alignSelf: "center" }}
					strokeWidth={1}
					color={selected == "User" ? theme.colors.accent : theme.colors.font}
					size={34}
				/>
			</Pressable>
			<Pressable
				onPress={() => setSelected("World")}
				style={{
					width: "24.7%",
					marginHorizontal: "4.3%",

					justifyContent: "center",
					borderTopColor: selected == "World" ? theme.colors.accent : "#000000",
					borderTopWidth: selected == "World" ? 1 : 0,
				}}>
				<Globe
					style={{ alignSelf: "center" }}
					color={selected == "World" ? theme.colors.accent : theme.colors.font}
					strokeWidth={1}
					size={32}
				/>
			</Pressable>
			<Pressable
				onPress={() => setSelected("Items")}
				style={{
					width: "24.7%",
					marginHorizontal: "4.3%",

					justifyContent: "center",
					borderTopColor: selected == "Items" ? theme.colors.accent : "#000000",
					borderTopWidth: selected == "Items" ? 1 : 0,
				}}>
				{selected === "Items" ? (
					<BookOpen
						style={{ alignSelf: "center" }}
						color={
							selected == "Items" ? theme.colors.accent : theme.colors.font
						}
						strokeWidth={1}
						size={33}
					/>
				) : (
					<Book
						style={{ alignSelf: "center" }}
						color={
							selected == "Items" ? theme.colors.accent : theme.colors.font
						}
						strokeWidth={1}
						size={30}
					/>
				)}
			</Pressable>
		</BlurView>
	);
};
