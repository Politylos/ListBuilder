import { Text, View } from "react-native";
import {GEtW40Index, ReadW40Index, DownloadAllIndex, GetAllUnitCosts, SelectUnitsfromType, PraseCat, GetUnitData, GetunitStats} from "@/app/functions/LoadData";
import {CreateFactionList, AddUnitToList} from "@/app/functions/ListFunctions";

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
  var unit :  = await GetunitStats("Skitarii Vanguard",Filedata);
  var list = await CreateFactionList("ImperiumAdeptusMechanicus.cat", "AdMech", "Test",1000);
  var list = AddUnitToList(list,unit)

  console.log("Done")
}

export default function Index() {
  Startup();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
