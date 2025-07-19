import {ScrollView} from "react-native";
import { HeroList } from "@/components/HeroList";
import { HeroPlayerProfile } from "@/components/HeroPlayerList";
import { HeroProfile } from "@/components/HeroProfile";
import { useState } from "react";

export default function Index() {
  
const kodaNum = "76561198053289095"
 const [hero, setHero] = useState(0)
  return (
    <> {hero === 0? (<HeroPlayerProfile  onInspect = {(id) => setHero(id)}
    id={kodaNum}/>) : <HeroProfile id={hero}/> }
      
     
     
      </>
  );
}
