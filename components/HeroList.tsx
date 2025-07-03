import { createHeroQueryOptions, createHeroStatsQueryOptions } from "@/queryOptions/createHeroQueryOptions"
import { useQuery } from "@tanstack/react-query"
import { View, Image, Text, Button, FlatList } from "react-native"
import * as Progress from 'react-native-progress';
import { useState } from "react";
import { StyleSheet } from "react-native-unistyles";
import { appThemes } from "@/unistyles";

export const HeroList = () => {
    const [sort, setSort] = useState('popular')

    const {
        data: heroStats,
        error: heroStatsError,
        isLoading: heroStatsLoading,
        isError: heroStatsIsError,
      } = useQuery(createHeroStatsQueryOptions());
    
      const {
        data: heroData,
        error: heroDataError,
        isLoading: heroDataLoading,
        isError: heroDataIsError,
      } = useQuery(createHeroQueryOptions());
    
      if (heroStatsLoading || heroDataLoading) {
        return <Text style={{ color: '#EADEDA' }}>Loading heroes...</Text>;
      }
    
      if (heroStatsIsError || heroDataIsError) {
        console.error('Hero stats error:', heroStatsError);
        console.error('Hero data error:', heroDataError);
        return <Text style={{ color: '#EADEDA' }}>Failed to load hero data.</Text>;
      }

        let sorted: any[] = []
        
        

    const heroes =  heroData!.map((hero) => {
        const stats = heroStats.find((stat: { hero_id: number; }) => stat.hero_id === hero.id);
        const winRate = stats ? ((stats.wins / stats.matches) * 100).toFixed(2) : null;
        const matches = stats?.matches ?? 0;
         return {...hero, winRate, matches}
    })
      const sortedWinrate = heroes.slice().sort((a, b) => b.winRate - a.winRate )
      const sortedPopular = heroes.slice().sort((a, b) => b.matches - a.matches )


      if(sort === 'winrate'){
        sorted = sortedWinrate
    }
        else if(sort === 'popular') {
        sorted = sortedPopular
    }
    

   const totalHeroPicks = sorted.reduce((sum, hero) => sum + hero.matches, 0);


   
    return (
        <View style={{}}>
        {sort === 'winrate' ? 
        <Button onPress={()=> setSort('popular')} title={"sort by popularity"}></Button> :
        <Button  onPress={()=> setSort('winrate')} title={"sort by winrate"}></Button>}
        <FlatList data={sorted} renderItem={({item}) => 
        <View
        style={styles.heroListItem}
      >
      <Image
        source={{ uri: item.images.minimap_image }}
        style={{ width: 20, height: 30,  alignSelf: "center" }}
      />
      <Text style={styles.heroText}>{item.name}</Text>
      <View style={{ flex: 1 }} /> 

      {sort == 'winrate' ? (
        <View style={{height: 10, alignSelf: "center"}}>
        <Progress.Bar progress={item.winRate/100} width={100} color="#94b0da" />
        <Text style={styles.percentText}>{item.winRate}%</Text>
       </View>
      ) : (
        <View style={{height: 10, alignSelf: "center"}}>
            <Progress.Bar progress={(item.matches/ (totalHeroPicks / 12))} width={100} color="#94b0da"  />
        <Text style={styles.percentText}>{((item.matches / (totalHeroPicks /12)) * 100).toFixed(2)}%</Text>
        </View>
      )}

      </View>
    
        }>
        
          </FlatList>
        </View>  
 )  
}

const styles = StyleSheet.create({
    percentText:{
      alignSelf: 'center',
      color: appThemes.light.colors.font,
      fontSize:10
    },
    heroListItem:{
      alignSelf: 'center',
          flexDirection: "row",
          backgroundColor: appThemes.light.colors.primary,
          borderRadius: 4,
          width: 300,
          height: 40,           
          paddingHorizontal: 8,
          marginVertical: 1
    },
    heroText:{
      color: appThemes.light.colors.font, paddingLeft: 7, fontSize: 13, alignSelf: "center" 
    }
})