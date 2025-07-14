import {ScrollView} from "react-native";


import { HeroList } from "@/components/HeroList";
import { HeroPlayerProfile } from "@/components/HeroPlayerProfile";

export default function Index() {
  
const kodaNum = "76561198053289095"
 
  return (
    <>
      <HeroPlayerProfile id={kodaNum}/>
      </>
  );
}




