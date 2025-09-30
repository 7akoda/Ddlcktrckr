import { Text } from "react-native";
import {
	DropdownMenuRoot,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuItemTitle,
} from "./DropDownMenu";

export function Menu() {
	return (
		<DropdownMenuRoot>
			<DropdownMenuTrigger>
				<Text>Open Dropdown Menu</Text>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuItem key="fernando rojo">
					<DropdownMenuItemTitle>Fernando Rojo</DropdownMenuItemTitle>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenuRoot>
	);
}
