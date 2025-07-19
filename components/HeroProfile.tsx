import { createHeroDataByIdQueryOptions } from "@/queryOptions/createHeroQueryOptions"
import { useQuery } from "@tanstack/react-query"
import { View, Image, Text, FlatList } from "react-native"

type Props = {
id: number
}


export const HeroProfile = ({id}: Props) => {

    const {
        data : heroDataById,
        error: heroDataByIdError,
        isLoading: heroDataByIdIsLoading,
        isError: heroDataByIdIsError
    } = useQuery(createHeroDataByIdQueryOptions(id))

    if (heroDataByIdIsLoading) {
        return <Text>Loading...</Text>;
      }
    
      if (heroDataByIdIsError) {
        console.error(heroDataByIdError);
        return <Text>Failed to load player stats.</Text>;
      }


    return(
<View>
    <Text>{heroDataById.name}</Text>
</View>
    )
}