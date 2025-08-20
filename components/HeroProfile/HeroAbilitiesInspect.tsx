import { useHeroDataById } from "@/hooks/useHeroDataById";
import { LoadingIcon } from "../LoadingIcon";
import { CustomText } from "../CustomText";
import { Dimensions, View } from "react-native";
import { useUnistyles } from "react-native-unistyles";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
type Props = {
	id: number;
	match: any;
};

export const HeroAbilitiesInspect = ({ id, match }: Props) => {
	const { theme } = useUnistyles();
	const { itemDataById, isIdError, isIdLoading, idError } = useHeroDataById(id);
	if (isIdLoading) return <LoadingIcon />;
	if (isIdError) return <CustomText>{String(idError)}</CustomText>;
	console.log(match);
	const stripHtml = (html: string) => {
		return html
			.replace(/<[^>]*>/g, "")
			.replace(/&nbsp;/g, " ")
			.replace(/&amp;/g, "&")
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&quot;/g, '"')
			.replace(/\s+/g, " ")
			.trim();
	};

	const player = useVideoPlayer(match.video.webm, (player) => {
		player.loop = true;
		player.play();
	});

	const { isPlaying } = useEvent(player, "playingChange", {
		isPlaying: player.playing,
	});

	return (
		<View
			style={{
				backgroundColor: theme.colors.background,
				width: 350,
				height: 300,
				zIndex: 4,
				alignSelf: "center",
				borderRadius: 4,
				borderWidth: 2,
				borderColor: theme.colors.primary,
			}}>
			<CustomText
				style={{
					zIndex: 6,
					textAlign: "center",
					color: theme.colors.font,
					fontSize: 8,
					padding: 8,
					margin: 12,
					borderWidth: 2,
					borderRadius: 4,
					borderColor: theme.colors.accent,
				}}>
				{stripHtml(match.description?.desc) || "No description available"}
			</CustomText>
			<VideoView
				player={player}
				allowsFullscreen
				allowsPictureInPicture
				style={{
					zIndex: 6,

					padding: 8,
					margin: 12,
					borderWidth: 2,
					borderRadius: 4,
					borderColor: theme.colors.accent,
				}}></VideoView>
		</View>
	);
};
