import { Image, Text, View, ScrollView, Button, Pressable } from "react-native";
import {GEtW40Index, ReadW40Index, DownloadAllIndex, GetAllUnitCosts, SelectUnitsfromType, PraseCat, GetUnitData, GetunitStats} from "@/app/functions/LoadData";
import {CreateFactionList, AddUnitToList, RemoveUnitFromList} from "@/app/functions/ListFunctions";
import { globalStyles } from "@/app/stylesheet";
import { jsonDict } from "@/app/functions/Structs";
import { Link, Stack } from "expo-router";
import GenericUserIcon from "@/assets/images/icons/default-user.svg";
import CogIcon from "@/assets/images/icons/cog.svg";
import ChevronRightIcon from "@/assets/images/icons/chevron-right.svg";
import DiceIcon from "@/assets/images/icons/dice.svg";
import ClipboardIcon from "@/assets/images/icons/clipboard-list.svg";
import { useHeaderHeight } from "@react-navigation/elements"

export async function Startup(){
  await GEtW40Index();
  await ReadW40Index();
  await DownloadAllIndex("w40k_10e.json");
  var unitcosts = await GetAllUnitCosts("ImperiumAdeptusMechanicus.cat");
  console.log(unitcosts)
  var battleunits = await SelectUnitsfromType("Battleline",unitcosts)
  console.log(battleunits);
  var Filedata = await PraseCat("ImperiumAdeptusMechanicus.cat");
  var unitData = await GetUnitData("Skitarii Vanguard",Filedata);
  var dataunit = await GetunitStats("Skitarii Vanguard",Filedata);
  var list = await CreateFactionList("ImperiumAdeptusMechanicus.cat", "AdMech", "Test",1000);
  list =  await AddUnitToList(list,dataunit)
  list =  await RemoveUnitFromList(list,0)
  list =  await AddUnitToList(list,dataunit)
  list =  await AddUnitToList(list,dataunit)
  list =  await AddUnitToList(list,dataunit)
  list =  await AddUnitToList(list,dataunit)
  list =  await RemoveUnitFromList(list,2)
  console.log(list)
  console.log("Done")
  console.log("bdddddidwwwdtch")
}

export default function Index() {
  Startup();
  const headerHeight = useHeaderHeight() + 20;

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
        
        <View style={globalStyles.dashboardCardList}>
          <View style={globalStyles.dashboardCardListFirstLine}>
            <Text style={globalStyles.dashboardCardListName}>Placeholder Name</Text>
            <Text style={globalStyles.dashboardCardListPoints}>1000 points</Text>
          </View>
          <View style={globalStyles.dashboardCardListSecondLine}>
            <View style={globalStyles.dashboardCardListFaction}>
              <Text style={globalStyles.dashboardCardListFactionName}>Faction Name</Text>
            </View>
          </View>
        </View>
        
        <View style={globalStyles.dashboardCardList}>
          <View style={globalStyles.dashboardCardListFirstLine}>
            <Text style={globalStyles.dashboardCardListName}>Placeholder Name</Text>
            <Text style={globalStyles.dashboardCardListPoints}>1000 points</Text>
          </View>
          <View style={globalStyles.dashboardCardListSecondLine}>
            <View style={globalStyles.dashboardCardListFaction}>
              <Text style={globalStyles.dashboardCardListFactionName}>Faction Name</Text>
            </View>
          </View>
        </View>
        
        <View style={globalStyles.dashboardCardList}>
          <View style={globalStyles.dashboardCardListFirstLine}>
            <Text style={globalStyles.dashboardCardListName}>Placeholder Name</Text>
            <Text style={globalStyles.dashboardCardListPoints}>1000 points</Text>
          </View>
          <View style={globalStyles.dashboardCardListSecondLine}>
            <View style={globalStyles.dashboardCardListFaction}>
              <Text style={globalStyles.dashboardCardListFactionName}>Faction Name</Text>
            </View>
          </View>
        </View>
        
        <View style={globalStyles.dashboardCardList}>
          <View style={globalStyles.dashboardCardListFirstLine}>
            <Text style={globalStyles.dashboardCardListName}>Placeholder Name</Text>
            <Text style={globalStyles.dashboardCardListPoints}>1000 points</Text>
          </View>
          <View style={globalStyles.dashboardCardListSecondLine}>
            <View style={globalStyles.dashboardCardListFaction}>
              <Text style={globalStyles.dashboardCardListFactionName}>Faction Name</Text>
            </View>
          </View>
        </View>
        
        <View style={globalStyles.dashboardCardList}>
          <View style={globalStyles.dashboardCardListFirstLine}>
            <Text style={globalStyles.dashboardCardListName}>Placeholder Name</Text>
            <Text style={globalStyles.dashboardCardListPoints}>1000 points</Text>
          </View>
          <View style={globalStyles.dashboardCardListSecondLine}>
            <View style={globalStyles.dashboardCardListFaction}>
              <Text style={globalStyles.dashboardCardListFactionName}>Faction Name</Text>
            </View>
          </View>
        </View>
        
      </View>
      
    </ScrollView>
    </View>
  );

}
