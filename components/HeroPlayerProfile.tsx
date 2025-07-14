import { createPlayerHeroStatsQueryOptions } from "@/queryOptions/createHeroQueryOptions";
import { useQuery } from "@tanstack/react-query"
import { View, Image, Text, FlatList } from "react-native"
type Props = {
    id: string
}

export const HeroPlayerProfile = ({id}: Props) => {

    const {
        data: playerStats,
        error: playerStatsError,
        isLoading: playerStatsLoading,
        isError: playerStatsIsError,
      } = useQuery(createPlayerHeroStatsQueryOptions(id));

      if (playerStatsLoading) {
        return <Text>Loading...</Text>;
      }
    
      if (playerStatsIsError) {
        console.error(playerStatsError);
        return <Text>Failed to load player stats.</Text>;
      }

    console.log(JSON.stringify(playerStats))
      return (
        <FlatList data={playerStats} renderItem={({item}) =>
        <Text>{item.hero_id}</Text> } />
      )}