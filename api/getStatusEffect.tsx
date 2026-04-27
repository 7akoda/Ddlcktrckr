import { CustomText } from "@/components/CustomText";
import { useUnistyles } from "react-native-unistyles";
export const getStatusEffect = (key: string) => {
	const { theme } = useUnistyles();
	return key == "StatusEffectEMP" ? (
		<CustomText
			key={key}
			style={{
				color: theme.colors.font,
				fontSize: 12,
				fontFamily: theme.fontFamily.regular,
			}}>
			Silenced Status Effect
		</CustomText>
	) : key == "StatusEffectDisarmed" ? (
		<CustomText
			key={key}
			style={{
				color: theme.colors.font,
				fontSize: 12,
				fontFamily: theme.fontFamily.regular,
			}}>
			Disarmed Status Effect
		</CustomText>
	) : key == "StatusEffectStun" ? (
		<CustomText
			key={key}
			style={{
				color: theme.colors.font,
				fontSize: 12,
				fontFamily: theme.fontFamily.regular,
			}}>
			Stun Status Effect
		</CustomText>
	) : key == "StatusEffectInvisible" ? (
		<CustomText
			key={key}
			style={{
				color: theme.colors.font,
				fontSize: 12,
				fontFamily: theme.fontFamily.regular,
			}}>
			Invisible Status Effect
		</CustomText>
	) : null;
};
