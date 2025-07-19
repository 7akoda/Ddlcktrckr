import { createHeroQueryOptions, createPlayerHeroStatsQueryOptions } from "@/queryOptions/createHeroQueryOptions";
import { useQuery } from "@tanstack/react-query"
import { View, Image, Text, FlatList } from "react-native"
import type { PlayerHeroStats} from "@/types/playerHeroStats";
import { StyleSheet } from "react-native-unistyles";
import { useUnistyles } from "react-native-unistyles";
import * as Progress from 'react-native-progress';
import { useState } from "react";


type Props = {
    id: string
    onInspect: (id: number) => void;
}

export const HeroPlayerProfile = ({id, onInspect}: Props) => {
const [sort, setSort] = useState('winRate')
    
const { theme } = useUnistyles()
    const {
        data: playerStats,
        error: playerStatsError,
        isLoading: playerStatsLoading,
        isError: playerStatsIsError,
      } = useQuery(createPlayerHeroStatsQueryOptions(id));

      const {
        data: heroData,
        error: heroDataError,
        isLoading: heroDataLoading,
        isError: heroDataIsError,
      } = useQuery(createHeroQueryOptions())

      if (playerStatsLoading) {
        return <Text>Loading...</Text>;
      }
    
      if (playerStatsIsError) {
        console.error(playerStatsError);
        return <Text>Failed to load player stats.</Text>;
      }

      const totalMatches = playerStats.reduce(
        (sum: number, player: PlayerHeroStats) => sum + player.matches_played, 
        0
      );
      console.log(totalMatches)
      
      
      const heroes = playerStats.map((player: PlayerHeroStats) => {
        const data = heroData?.find((hero) => hero.id === player.hero_id)
        const name = data?.name
        const profilePicture = data?.images.icon_hero_card_webp
        const winRate = player ? ((player.wins / player.matches_played) * 100).toFixed(2) : null;
        const pickRate = ((player.matches_played/totalMatches) * 100).toFixed(2)
        return {...player, name, profilePicture, winRate, pickRate}
      })

    
     

      const sortedByMostPlayed = heroes.slice().sort((a: { matches_played: number; }, b: { matches_played: number; }) => b.matches_played - a.matches_played)

      const sortedByWinRate = heroes.slice().sort((a: { winRate: number; }, b: { winRate: number; }) => b.winRate - a.winRate)

      let sorted: any[] = []

      if(sort === 'winRate'){
        sorted = sortedByWinRate
    }
        else if(sort === 'popular') {
        sorted = sortedByMostPlayed
    }
  
      return (
      <View style={styles.primaryView}>
             {sort == 'winRate' ? 
             <Text suppressHighlighting style={styles.sortButton} onPress={()=> setSort('popular')}>sort by most played</Text> :
             <Text suppressHighlighting style={styles.sortButton} onPress={()=> setSort('winRate')}>sort by winrate</Text>}
             <FlatList data={sorted} renderItem={({item}) => 
             <View
             style={styles.heroListItem}
           >
           <Image
             source={{ uri: item.profilePicture }}
             style={{ width: 30, height: 30,  alignSelf: "center", borderRadius: 4, borderWidth:2, borderColor: theme.colors.accent}}
           />
           <Text onPress={ () => onInspect(item.hero_id)} style={styles.heroText}>{item.name}</Text>
           <View style={{ flex: 1 }} /> 
     
           {sort == 'winRate' ? (
             <View style={{ alignSelf: "center",}}>
            <Text style={styles.infoText}>W{item.wins} - L{item.matches_played - item.wins}</Text>
             <Progress.Bar progress={item.winRate/100} width={100} color={theme.colors.accent} />
             <Text style={styles.percentText}>{item.winRate}%</Text>
            </View>
           ) : (
             <View style={{ alignSelf:"center"}}>
                <Text style={styles.infoText}>Matches played: {item.matches_played}</Text>
             <Progress.Bar progress={item.matches_played/totalMatches} width={100} color={theme.colors.accent}/>
             <Text style={styles.percentText}>{item.pickRate}%</Text>
             </View>
           )}
     
           </View>
         
             }>
             
               </FlatList>
             </View>  
      )  
     }
     
     const styles = StyleSheet.create(theme => ({
         percentText:{
           alignSelf: 'center',
           color: theme.colors.font,
           fontSize:10,
           padding:2
         },
         infoText:{
            alignSelf: 'center',
            color: theme.colors.font,
            fontSize:8,
            padding:2
          },
         heroListItem:{
           alignSelf: 'center',
               flexDirection: "row",
               backgroundColor: theme.colors.primary,
               borderRadius: 4,
               width: 300,
               height: 40,           
               paddingHorizontal: 8,
               marginVertical: 1
         },
         heroText:{
           color: theme.colors.font,
           paddingLeft: 7,
           fontSize: 13,
           alignSelf: "center" 
         },
         sortButton:{
           color: theme.colors.accent,
           alignSelf: "center",
           margin: 10
         },
         primaryView:{
           backgroundColor: theme.colors.background,
           paddingBottom: 50
         },
     }))