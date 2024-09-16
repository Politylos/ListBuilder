import { Image, Text, View, ScrollView, Button, Pressable } from "react-native";
import { useState, useEffect } from 'react';
import { globalStyles } from "@/app/stylesheet";
import *  as LayoutFunctions from "@/app/functions/LayoutFunctions";
import {GetW40Index, ReadW40Index, DownloadAllIndex, GetAllUnitCosts, SelectUnitsfromType, PraseCat, GetUnitData, GetunitStats} from "@/app/functions/LoadData";
import {CreateFactionList, AddUnitToList, RemoveUnitFromList, loadLists,DeleteList, DeleteListReload,RemoveModel, AddModel,NewestLists} from "@/app/functions/ListFunctions";
import { useFocusEffect } from '@react-navigation/native';
import { jsonDict } from "@/app/functions/Structs";
import { Link, Stack } from "expo-router";
import GenericUserIcon from "@/assets/images/icons/default-user.svg";
import CogIcon from "@/assets/images/icons/cog.svg";
import ChevronRightIcon from "@/assets/images/icons/chevron-right.svg";
import DiceIcon from "@/assets/images/icons/dice.svg";
import ClipboardIcon from "@/assets/images/icons/clipboard-list.svg";
import { useHeaderHeight } from "@react-navigation/elements"

export async function Startup(){
  /*await GetW40Index();
  await ReadW40Index();
  await DownloadAllIndex("w40k_10e.json");
  var unitcosts = await GetAllUnitCosts("ImperiumAdeptusMechanicus.cat");
  console.log(unitcosts)
  var battleunits = await SelectUnitsfromType("Battleline",unitcosts)
  console.log(battleunits);
  var Filedata = await PraseCat("ImperiumAdeptusMechanicus.cat");
  var unitData = await GetUnitData("Skitarii Vanguard",Filedata);
  var dataunit = await GetunitStats("Skitarii Vanguard",Filedata);
  var list = await CreateFactionList("ImperiumAdeptusMechanicus.cat", "AdMech", "rw4455grgefd42t",1000);
  list =  await AddUnitToList(list,dataunit)
  list =  await RemoveUnitFromList(list,0)
  list =  await AddUnitToList(list,dataunit)
  list =  await AddUnitToList(list,dataunit)
  list =  await AddUnitToList(list,dataunit)
  list =  await AddUnitToList(list,dataunit)
  list = await AddModel(list, 1, "3e45-6c2d-267f-b7cf",dataunit);
  list = await AddModel(list, 1, "3e45-6c2d-267f-b7cf",dataunit);
  list = await RemoveModel(list, 1, "3e45-6c2d-267f-b7cf",dataunit);
  list = await AddModel(list, 1, "54ca-f341-b75a-6c29",dataunit);
  
  //list =  await RemoveUnitFromList(list,2)
  console.log(list)
  console.log("Done")
  console.log("bdddddsdsdsddidwwwdtch")
  await DeleteList(list)*/
  let lists = await loadLists()
  console.log(lists)
  console.log("Hi")
  return lists;
}
function GetdisplayLists(){
  
}
export default function Index() {
  const [lists, setLists]  : any = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useFocusEffect(() => {
    async function fetchData() {
      try{
        const lists = await NewestLists();
        console.log("rerendering!!")
        console.log(lists)
        setLists(lists);
        setLoading(false);
      }
      catch(error){
        setError(false);
        setLoading(false);
      }
    }
    fetchData();
  }); 
  useEffect(() => {
    async function fetchData() {
      try{
        await GetW40Index();
        await ReadW40Index();
        await DownloadAllIndex("w40k_10e.json");
        const lists = await NewestLists();
        console.log("reutrn to me")
        console.log(lists)
        setLists(lists);
        setLoading(false);
      }
      catch(error){
        setError(false);
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  const headerHeight = useHeaderHeight() + 20;
  if (loading) {
    return (<View><Text>Loading....</Text></View>)
  }else if (error){
    return (<View><Text>NO WORK!!!!!</Text></View>)
  }else if (lists != null){
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack.Screen options={{
          title: 'Dashboard',
          headerTransparent: true,
          headerTitle: () => (
            <View style={{ flex: 1, flexDirection: "row", }}>
              <Text style={{ fontSize: 20, fontWeight: 300 }}>
                ListBuilder
              </Text>
            </View>
          ),
          headerTitleAlign: 'left',
          headerRight: () => (
            <View style={{ alignItems: "center", flexDirection: "row", gap: 20 }}>
              <GenericUserIcon width={42} height={42} />
              <CogIcon width={24} height={24} onPress={() => {
                console.log('Tapped cog');
              }}/>
            </View>
          ),
        }}
        />
        
      
      
      <ScrollView style={[globalStyles.dashboardScrollViewParent, {marginTop: headerHeight}]}>
        
        <View style={globalStyles.dashboardScrollViewSection}>
          <View style={globalStyles.scrollViewSectionTitle}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15}}>
              <DiceIcon height={24}/>
              <Text style={globalStyles.scrollViewSectionTitleHeading}>Current games</Text>
            </View>
            <Pressable style={({ pressed }) => [
              pressed ? globalStyles.scrollViewSectionTitleButtonPressed
                : globalStyles.scrollViewSectionTitleButton
            ]}>
              <Text style={globalStyles.scrollViewSectionTitleButtonText}>Start new</Text>
            </Pressable>
          </View>
          
          <ScrollView horizontal={true} style={globalStyles.dashboardGameCarousel}>
            <View style={globalStyles.dashboardCardGame}>
              <Text style={globalStyles.scrollViewSectionTitleHeading}>Game</Text>
            </View>
            <View style={globalStyles.dashboardCardGame}>
              <Text style={globalStyles.scrollViewSectionTitleHeading}>Game</Text>
            </View>
            <View style={globalStyles.dashboardCardGame}>
              <Text style={globalStyles.scrollViewSectionTitleHeading}>Game</Text>
            </View>
            <View style={globalStyles.dashboardCardGame}>
              <Text style={globalStyles.scrollViewSectionTitleHeading}>Game</Text>
            </View>
          </ScrollView>
          
        </View>
        
        <View style={globalStyles.dashboardScrollViewSection}>
          <Pressable style={globalStyles.scrollViewSectionTitle}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15}}>
              <ClipboardIcon height={24}/>
              <Text style={globalStyles.scrollViewSectionTitleHeading}>Lists</Text>
            </View>
            <ChevronRightIcon height={24}/>
          </Pressable>
          {
          
          Object.keys(lists).map((list : any) => {
          return LayoutFunctions.RenderListcard(lists[list].name, lists[list].Cost, lists[list].Faction);
          })
          }
          {
            LayoutFunctions.EmptyCard("Create List")
          }          
        </View>
          
      </ScrollView>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack.Screen options={{
          title: 'Dashboard',
          headerTransparent: true,
          headerTitle: () => (
            <View style={{ flex: 1, flexDirection: "row", }}>
              <Text style={{ fontSize: 20, fontWeight: 300 }}>
                ListBuilder
              </Text>
            </View>
          ),
          headerTitleAlign: 'left',
          headerRight: () => (
            <View style={{ alignItems: "center", flexDirection: "row", gap: 20 }}>
              <GenericUserIcon width={42} height={42} />
              <CogIcon width={24} height={24} onPress={() => {
                console.log('Tapped cog');
              }}/>
            </View>
          ),
        }}
        />
        
      
      
      <ScrollView style={[globalStyles.dashboardScrollViewParent, {marginTop: headerHeight}]}>
        
        <View style={globalStyles.dashboardScrollViewSection}>
          <View style={globalStyles.scrollViewSectionTitle}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15}}>
              <DiceIcon height={24}/>
              <Text style={globalStyles.scrollViewSectionTitleHeading}>Current games</Text>
            </View>
            <Pressable style={({ pressed }) => [
              pressed ? globalStyles.scrollViewSectionTitleButtonPressed
                : globalStyles.scrollViewSectionTitleButton
            ]}>
              <Text style={globalStyles.scrollViewSectionTitleButtonText}>Start new</Text>
            </Pressable>
          </View>
          
          <ScrollView horizontal={true} style={globalStyles.dashboardGameCarousel}>
            <View style={globalStyles.dashboardCardGame}>
              <Text style={globalStyles.scrollViewSectionTitleHeading}>Game</Text>
            </View>
            <View style={globalStyles.dashboardCardGame}>
              <Text style={globalStyles.scrollViewSectionTitleHeading}>Game</Text>
            </View>
            <View style={globalStyles.dashboardCardGame}>
              <Text style={globalStyles.scrollViewSectionTitleHeading}>Game</Text>
            </View>
            <View style={globalStyles.dashboardCardGame}>
              <Text style={globalStyles.scrollViewSectionTitleHeading}>Game</Text>
            </View>
          </ScrollView>
          
        </View>
        
        <View style={globalStyles.dashboardScrollViewSection}>
          <Pressable style={globalStyles.scrollViewSectionTitle}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15}}>
              <ClipboardIcon height={24}/>
              <Text style={globalStyles.scrollViewSectionTitleHeading}>Lists</Text>
            </View>
            <ChevronRightIcon height={24}/>
          </Pressable>
          {
            LayoutFunctions.EmptyCard("Create List")
          }
            
          
          
          
          
        </View>
          
      </ScrollView>
      </View>
    );
  }
  

}
